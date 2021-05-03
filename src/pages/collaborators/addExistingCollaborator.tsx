import React, { useState, ChangeEvent } from 'react';
import {
    Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, useToast,
    ModalBody, FormControl, FormLabel, Input, Box, FormErrorMessage,
} from '@chakra-ui/core';
import { showToast } from '@/components/toast/custom.toast';
import { AddSmallIcon } from '@/components/icons';
import * as UserMapper from '@/data/user/api/mapper/user.mapper'
import { User } from '@/data/user/model/user.model';
import { UserRepository } from '@/data/user/repository/users.repository';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';

interface AddExistingCollaboratorProps {
    eventId: string,
    onAddCollaborator: (newCollaborator: User) => void
    disabled: boolean
}

const AddExistingCollaboratorModal = (props: AddExistingCollaboratorProps) => {

    // Props
    const { eventId, onAddCollaborator, disabled } = props

    // Utils
    const toast = useToast();

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const [username, setUsername] = useState('');

    // Error state vars
    const [usernameError, setUsernameError] = useState<string | undefined>(undefined)

    // Constants
    const MIN_LENGTH_USERNAME = 5;

    // Repository
    const userRepository = UserRepository.getInstance()

    // Functions
    const onClose = () => {
        setIsOpen(false)
        setUsername('')
        setUsernameError(undefined)
    }
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)

    // Validators
    function validateUsername() {
        let value = username.trim()
        if (value.length == 0) {
            setUsernameError('Debes ingresar un nombre de usuario.')
        } else if (value.length < MIN_LENGTH_USERNAME) {
            setUsernameError(`La longitud del campo nombre de usuario debe ser mayor a ${MIN_LENGTH_USERNAME}.`)
        } else {
            setUsernameError(undefined)
        }
    }

    const onConfirm = async () => {

        // Validate if any field is empty
        if (username.trim() == '') {
            setUsernameError('Debes ingresar un nombre de usuario.')
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
                onEnter={() => setIsOpen(true)}
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
                            <FormControl isInvalid={usernameError != undefined} isRequired>
                                <FormLabel>Nombre de usuario</FormLabel>
                                <Input
                                    value={username}
                                    onChange={handleUsernameChange}
                                    placeholder="Nombre de usuario"
                                    onBlur={validateUsername}
                                />
                                <FormErrorMessage>{usernameError}</FormErrorMessage>
                            </FormControl>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3} disabled={usernameError != undefined}>
                            Agregar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddExistingCollaboratorModal;
