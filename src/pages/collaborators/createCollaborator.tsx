import React, { useRef, useState, ChangeEvent } from 'react';
import {
    Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, useToast,
    ModalBody, FormControl, FormLabel, Input, HStack, Box,
} from '@chakra-ui/core';
import { showToast } from '@/components/toast/custom.toast';
import { AddSmallIcon, MinusSmallIcon } from '@/components/icons';
import * as UserMapper from '@/data/user/api/mapper/user.mapper'
import { User } from '@/data/user/model/user.model';
import { UserRepository } from '@/data/user/repository/users.repository';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { CreateCollaboratorRequestDto } from '@/data/user/api/dto/request/create.collaborator.request.dto';

interface CreateCollaboratorProps {
    eventId: string,
    onAddCollaborator: (newCollaborator: User) => void
}

const CreateCollaboratorModal = (props: CreateCollaboratorProps) => {

    // Props
    const { eventId, onAddCollaborator } = props

    // Utils
    const toast = useToast();

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mail, setMail] = useState('');
    const [name, setName] = useState('');

    // Repository
    const userRepository = UserRepository.getInstance()

    // Functions
    const onClose = () => {
        setIsOpen(false)
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setMail('')
        setName('')
    }
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)
    const handleMailChange = (event: ChangeEvent<HTMLInputElement>) => setMail(event.target.value)

    const validateOpening = () => {
        if (eventId != undefined && eventId.trim() != '') {
            setIsOpen(true)
        } else {
            showToast('Ocurrió un error', 'Debes seleccionar un evento para agregar colaboradores.', false, toast);
        }
    }

    const onConfirm = async () => {

        // Validate if any field is empty
        if (name.trim() == '' || username.trim() == '' || password == '' ||
            confirmPassword == '' || mail.trim() == '') {
            showToast('Ocurrió un error', 'Debes completar todos los campos para crear un nuevo colaborador.', false, toast);
            return
        }

        // Validate if passwords match
        if (password != confirmPassword) {
            showToast('Ocurrió un error', 'Las contraseñas ingresadas no coinciden.', false, toast);
            return
        }

        // Create request dto
        const request: CreateCollaboratorRequestDto = {
            mail: mail,
            organizer: {
                name: name
            },
            password: password,
            username: username
        }

        try {
            // Send request
            const response = await userRepository.createCollaborator(eventId, request)

            // Get user collaborator
            const collaborator = await UserMapper.createToUserMapper(response);

            // Show successfull message
            showToast(
                'Colaborador creado!',
                'Nuevo colaborador de evento creado correctamente',
                true, toast
            );

            // Add collaborator to original list
            onAddCollaborator(collaborator)

            // Close modal
            onClose()
        } catch (error) {
            // Show error message
            showToast('Ocurrió un error', error, false, toast);
        }
    }

    return (
        <>
            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Crear nuevo"
                typeBtn={ButtonType.primary}
                leftIcon={<AddSmallIcon boxSize={4} />}
                onEnter={validateOpening}
            />

            <Modal isOpen={isOpen} onClose={onClose}
                motionPreset="slideInBottom" isCentered>

                <ModalOverlay />

                <ModalContent>
                    <ModalHeader fontSize="lg" fontWeight="bold">
                        Crear colaborador
                    </ModalHeader>
                    <ModalBody>
                        <Box>
                            <FormControl>
                                <FormControl>
                                    <FormLabel>Nombre</FormLabel>
                                    <Input
                                        value={name}
                                        onChange={handleNameChange}
                                        placeholder="Nombre del colaborador"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Correo</FormLabel>
                                    <Input
                                        value={mail}
                                        onChange={handleMailChange}
                                        placeholder="Correo"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Nombre de usuario</FormLabel>
                                    <Input
                                        value={username}
                                        onChange={handleUsernameChange}
                                        placeholder="Nombre de usuario"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Contraseña</FormLabel>
                                    <Input
                                        value={password}
                                        onChange={handlePasswordChange}
                                        placeholder="Contraseña"
                                        type='password'
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Confirmar contraseña</FormLabel>
                                    <Input
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        placeholder="Confirmar contraseña"
                                        type='password'
                                    />
                                </FormControl>
                            </FormControl>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateCollaboratorModal;
