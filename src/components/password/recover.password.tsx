import React, { useState, ChangeEvent } from 'react';
import {
    Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, useToast,
    ModalBody, FormControl, FormLabel, Input, Box, FormErrorMessage, MenuItem,
} from '@chakra-ui/core';
import { showToast } from '@/components/toast/custom.toast';
import { LoginRepository } from '@/data/login/repository/login.repository';
import { ForgotPasswordRequestDto } from '@/data/login/api/dto/request/forgot.password.request.dto';
import { ValidateTokenRequestDto } from '@/data/login/api/dto/request/validate.token.request.dto';
import { ChangePasswordRequestDto } from '@/data/login/api/dto/request/change.password.request.dto';

enum StepEnum {
    MAIL = 1,
    TOKEN = 2,
    NEWPASS = 3
}

const RecoverPasswordModal = () => {

    // Utils
    const toast = useToast();

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const [currentStep, setCurrentStep] = useState<StepEnum>(StepEnum.MAIL);
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mail, setMail] = useState('');

    // Error state vars
    const [tokenError, setTokenError] = useState<string | undefined>(undefined)
    const [mailError, setMailError] = useState<string | undefined>(undefined)
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined)
    const [conPasswordError, setConPasswordError] = useState<string | undefined>(undefined)

    // Repository
    const loginRepository = LoginRepository.getInstance()

    // Constants
    const MIN_LENGTH_PASSWORD = 6

    // Functions
    const onClose = () => {
        setIsOpen(false)
        setCurrentStep(StepEnum.MAIL)
        setToken('')
        setPassword('')
        setConfirmPassword('')
        setMail('')
        setTokenError(undefined)
        setMailError(undefined)
        setPasswordError(undefined)
        setConPasswordError(undefined)
    }

    const handleTokenChange = (event: ChangeEvent<HTMLInputElement>) => setToken(event.target.value)
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

    function validateToken() {
        let value = token.trim()
        if (value.length == 0) {
            setTokenError('Debes completar el campo token.')
        } else {
            setTokenError(undefined)
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

    const onGetToken = async () => {

        if (mail.trim() == '') {
            validateMail()
            return
        }

        let request: ForgotPasswordRequestDto = {
            mail: mail
        }

        try {
            // Send request
            await loginRepository.forgotPassword(request)

            // Show successfull message
            showToast(
                'Correo enviado!',
                'Se ha enviado el token de verificación correctamente.',
                true, toast
            );

            setCurrentStep(StepEnum.TOKEN)

        } catch (error) {
            // Show error message
            showToast('Ocurrió un error', error, false, toast);
        }
    }


    const onValidateToken = async () => {

        if (token.trim() == '') {
            validateToken()
            return
        }

        let request: ValidateTokenRequestDto = {
            mail: mail,
            token: token
        }

        try {
            // Send request
            await loginRepository.validatePasswordToken(request)

            // Show successfull message
            showToast(
                'Token válido!',
                'El token de verificación se ha validado correctamente.',
                true, toast
            );

            setCurrentStep(StepEnum.NEWPASS)

        } catch (error) {
            // Show error message
            showToast('Ocurrió un error', error, false, toast);
        }
    }

    const onChangePassword = async () => {

        if (password == '' || confirmPassword == '') {
            validatePassword()
            validateConPassword()
            return
        }

        let request: ChangePasswordRequestDto = {
            mail: mail,
            token: token,
            newPassword: password
        }

        try {
            // Send request
            await loginRepository.setNewPassword(request)

            // Show successfull message
            showToast(
                'Contreaseña guardada!',
                'La nueva contraseña se ha guardado correctamente',
                true, toast
            );

            // Close modal
            onClose()
        } catch (error) {
            // Show error message
            showToast('Ocurrió un error', error, false, toast);
        }
    }

    return (
        <>
            <span onClick={() => setIsOpen(true)}>
                ¿Olvidaste tu contraseña?
            </span>

            <Modal isOpen={isOpen} onClose={onClose}
                motionPreset="slideInBottom" isCentered>

                <ModalOverlay />
                <ModalContent>
                    {(currentStep == StepEnum.MAIL) ?
                        <>
                            <ModalHeader fontSize="lg" fontWeight="bold">
                                Recuperar contraseña
                            </ModalHeader>
                            <ModalBody>
                                <Box>
                                    Ingresa tu correo y te enviaremos un <span style={{ fontWeight: 'bold' }}>código de verificación </span>
                                    para que puedas cambiar tu contraseña.

                                    <FormControl mt={4} isInvalid={mailError != undefined} isRequired>
                                        <Input
                                            value={mail}
                                            onChange={handleMailChange}
                                            placeholder="Correo"
                                            onBlur={validateMail}
                                        />
                                        <FormErrorMessage>{mailError}</FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </ModalBody>

                            <ModalFooter>
                                <Button onClick={onClose}>
                                    Cancelar
                            </Button>
                                <Button colorScheme="red" onClick={onGetToken} ml={3}
                                    disabled={mailError != undefined}>
                                    Obtener token
                            </Button>
                            </ModalFooter>
                        </>

                        : (currentStep == StepEnum.TOKEN) ?
                            <>
                                <ModalHeader fontSize="lg" fontWeight="bold">
                                    Recuperar contraseña
                                </ModalHeader>
                                <ModalBody>
                                    <Box>
                                        Ingresa el código de verificación que <span style={{ fontWeight: 'bold' }}>recibiste en tu correo </span>
                                        para que puedas crear una nueva contraseña.

                                        <FormControl mt={4} isInvalid={tokenError != undefined} isRequired>
                                            <Input
                                                value={token}
                                                onChange={handleTokenChange}
                                                placeholder="Token de verificación"
                                                onBlur={validateToken}
                                            />
                                            <FormErrorMessage>{tokenError}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                </ModalBody>

                                <ModalFooter>
                                    <Button onClick={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button colorScheme="red" onClick={onValidateToken} ml={3}
                                        disabled={tokenError != undefined}>
                                        Verificar
                                    </Button>
                                </ModalFooter>
                            </>
                            : <>
                                <ModalHeader fontSize="lg" fontWeight="bold">
                                    Recuperar contraseña
                                </ModalHeader>
                                <ModalBody>
                                    <Box>
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
                                    <Button colorScheme="red" onClick={onChangePassword} ml={3}
                                        disabled={
                                            conPasswordError != undefined || passwordError != undefined
                                        }>
                                        Guardar
                                </Button>
                                </ModalFooter>
                            </>
                    }
                </ModalContent>

            </Modal>
        </>
    );
}

export default RecoverPasswordModal;
