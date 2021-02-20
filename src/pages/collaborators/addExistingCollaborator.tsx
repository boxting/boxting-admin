import React, { useState, ChangeEvent } from 'react';
import {
    Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, useToast,
    ModalBody, FormControl, FormLabel, Input, Box,
} from '@chakra-ui/core';
import { showToast } from '@/components/toast/custom.toast';
import { AddSmallIcon } from '@/components/icons';
import * as UserMapper from '@/data/user/api/mapper/user.mapper'
import { User } from '@/data/user/model/user.model';
import { UserRepository } from '@/data/user/repository/users.repository';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { CreateCollaboratorRequestDto } from '@/data/user/api/dto/request/create.collaborator.request.dto';

interface AddExistingCollaboratorProps {
    eventId: string,
    onAddCollaborator: (newCollaborator: User) => void
}

const AddExistingCollaboratorModal = (props: AddExistingCollaboratorProps) => {

    // Props
    const { eventId, onAddCollaborator } = props

    // Utils
    const toast = useToast();

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const [username, setUsername] = useState('');

    // Repository
    const userRepository = UserRepository.getInstance()

    // Functions
    const onClose = () => {
        setIsOpen(false)
        setUsername('')
    }
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)

    const validateOpening = () => {
        if (eventId != undefined && eventId.trim() != '') {
            setIsOpen(true)
        } else {
            showToast('Ocurrió un error', 'Debes seleccionar un evento para agregar colaboradores.', false, toast);
        }
    }

    const onConfirm = async () => {

        // Validate if any field is empty
        if (username.trim() == '') {
            showToast('Ocurrió un error', 'Debes ingresar un nombre de usuario para agregar al colaborador.', false, toast);
            return
        }

        try {
            // Send request
            const response = await userRepository.addCollaboratorByUsername(eventId, username)

            // Get user collaborator
            const collaborator = await UserMapper.createToUserMapper(response);

            // Show successfull message
            showToast(
                'Colaborador agregado!',
                'Colaborador agregado correctamente al evento.',
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
                text="Agregar existente"
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
                                    <FormLabel>Nombre de usuario</FormLabel>
                                    <Input
                                        value={username}
                                        onChange={handleUsernameChange}
                                        placeholder="Nombre de usuario"
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

export default AddExistingCollaboratorModal;
