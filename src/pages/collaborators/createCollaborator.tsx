import React, { useRef, useState, ChangeEvent } from 'react';
import {
    Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, useToast,
    ModalBody, FormControl, FormLabel, Input, HStack, Box, FormErrorMessage,
} from '@chakra-ui/core';
import { showToast } from '@/components/toast/custom.toast';
import { AddSmallIcon } from '@/components/icons';
import * as UserMapper from '@/data/user/api/mapper/user.mapper'
import { User } from '@/data/user/model/user.model';
import { UserRepository } from '@/data/user/repository/users.repository';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { CreateCollaboratorRequestDto } from '@/data/user/api/dto/request/create.collaborator.request.dto';

interface CreateCollaboratorProps {
    eventId: string,
    onAddCollaborator: (newCollaborator: User) => void,
    disabled: boolean
}

const CreateCollaboratorModal = (props: CreateCollaboratorProps) => {

    // Props
    const { eventId, onAddCollaborator, disabled } = props

    // Utils
    const toast = useToast();

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mail, setMail] = useState('');
    const [name, setName] = useState('');

    // Error state vars
    const [nameError, setNameError] = useState<string | undefined>(undefined)
    const [usernameError, setUsernameError] = useState<string | undefined>(undefined)
    const [mailError, setMailError] = useState<string | undefined>(undefined)
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined)
    const [conPasswordError, setConPasswordError] = useState<string | undefined>(undefined)

    // Constants
    const MIN_LENGTH_NAME = 5;
    const MIN_LENGTH_USERNAME = 5;
    const MIN_LENGTH_PASSWORD = 6;

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
        setNameError(undefined)
        setUsernameError(undefined)
        setMailError(undefined)
        setPasswordError(undefined)
        setConPasswordError(undefined)
    }
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)
    const handleMailChange = (event: ChangeEvent<HTMLInputElement>) => setMail(event.target.value)

    // Validators
    function validateMail() {
        let value = mail.trim()
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (value.length == 0) {
            setMailError('Debes completar el campo correo.')
        } else if (!re.test(mail)) {
            setMailError(`Debes ingresar un correo válido.`)
        } else {
            setMailError(undefined)
        }
    }

    function validateName() {
        let value = name.trim()
        if (value.length == 0) {
            setNameError('Debes completar el campo nombre.')
        } else if (value.length < MIN_LENGTH_NAME) {
            setNameError(`La longitud del campo nombre debe ser mayor a ${MIN_LENGTH_NAME}.`)
        } else {
            setNameError(undefined)
        }
    }

    function validateUsername() {
        let value = username.trim()
        if (value.length == 0) {
            setUsernameError('Debes completar el campo nombre de usuario.')
        } else if (value.length < MIN_LENGTH_USERNAME) {
            setUsernameError(`La longitud del campo nombre de usuario debe ser mayor a ${MIN_LENGTH_USERNAME}.`)
        } else {
            setUsernameError(undefined)
        }
    }

    function validatePassword() {
        let value = password.trim()
        if (value.length == 0) {
            setPasswordError('Debes completar el campo contraseña.')
        } else if (value.length < MIN_LENGTH_PASSWORD) {
            setPasswordError(`La longitud del campo contraseña debe ser mayor a ${MIN_LENGTH_PASSWORD}.`)
        } else {
            setPasswordError(undefined)
        }
    }

    function validateConPassword() {
        let value = confirmPassword.trim()
        if (value.length == 0) {
            setConPasswordError('Debes completar el campo confirmar contraseña.')
        } else if (value != password.trim()) {
            setConPasswordError(`Las contraseñas ingresadas no coinciden.`)
        } else {
            setConPasswordError(undefined)
        }
    }

    const onConfirm = async () => {

        // Validate if any field is empty
        if (name.trim() == '' || username.trim() == '' || password == '' ||
            confirmPassword == '' || mail.trim() == '') {
            validateConPassword()
            validateMail()
            validateName()
            validatePassword()
            validateUsername()
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
                onEnter={() => setIsOpen(true)}
                leftIcon={<AddSmallIcon boxSize={4} />}
                isDisabled={disabled}
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
                            <FormControl isInvalid={nameError != undefined} isRequired>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder="Nombre del colaborador"
                                    onBlur={validateName}
                                />
                                <FormErrorMessage>{nameError}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={2} isInvalid={mailError != undefined} isRequired>
                                <FormLabel>Correo</FormLabel>
                                <Input
                                    value={mail}
                                    onChange={handleMailChange}
                                    placeholder="Correo"
                                    onBlur={validateMail}
                                />
                                <FormErrorMessage>{mailError}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={2} isInvalid={usernameError != undefined} isRequired>
                                <FormLabel>Nombre de usuario</FormLabel>
                                <Input
                                    value={username}
                                    onChange={handleUsernameChange}
                                    placeholder="Nombre de usuario"
                                    onBlur={validateUsername}
                                />
                                <FormErrorMessage>{usernameError}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={2} isInvalid={passwordError != undefined} isRequired>
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Contraseña"
                                    type='password'
                                    onBlur={validatePassword}
                                />
                                <FormErrorMessage>{passwordError}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={2} isInvalid={conPasswordError != undefined} isRequired>
                                <FormLabel>Confirmar contraseña</FormLabel>
                                <Input
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Confirmar contraseña"
                                    type='password'
                                    onBlur={validateConPassword}
                                />
                                <FormErrorMessage>{conPasswordError}</FormErrorMessage>
                            </FormControl>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3}
                            disabled={
                                conPasswordError != undefined || passwordError != undefined ||
                                nameError != undefined || mailError != undefined || usernameError != undefined
                            }>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateCollaboratorModal;
