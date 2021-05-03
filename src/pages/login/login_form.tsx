import React, { useState } from 'react';
import {
    Box,
    Button,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
    useToast,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/dist/client/router';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import Label from '@/components/label';
import { LoginRepository } from '@/data/login/repository/login.repository';
import ErrorMessage from '@/components/alerts/error';
import { showToast } from '@/components/toast/custom.toast';
import { LoginRequestDto } from '@/data/login/api/dto/request/login.request.dto';

interface LoginFormProps {
    onSignIn: (token: string, refreshToken: string, role: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignIn }: LoginFormProps) => {
    // Forms
    const { register, handleSubmit, errors } = useForm();

    // State variables
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    // Utils
    const router = useRouter();
    const toast = useToast();

    // Get service instance
    const loginRepository = LoginRepository.getInstance()

    // Arrow functions
    const handleClick = () => setShow(!show);
    const closeError = () => setError('');

    const onSubmit = async (data: LoginRequestDto) => {
        try {
            // Start loading state
            setLoading(true);

            // Send login request
            const loginResponse = await loginRepository.login(data);

            // Show success toast
            showToast(
                `Se ha iniciado sesión correctamente`,
                `Redireccionando a panel de control`,
                true,
                toast,
            );
                console.log(loginResponse.data)
            // Store received tokens on cookies
            onSignIn(loginResponse.data.token, loginResponse.data.refreshToken, loginResponse.data.role.name);

            // Stop loading state
            setLoading(false);

            // Redirect to events page
            router.push('/events');
        } catch (error) {
            console.log(error)
            setLoading(false);
            setError(error);
        }
    };

    return (
        <Box>
            {error && (
                <Box mb={20}>
                    <ErrorMessage message={error} onClose={closeError} />
                </Box>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Flex
                        height={70}
                        width="100%"
                        alignItems="center"
                        justifyContent="center"
                        mt={5}
                        mb={10}
                    >
                        <img
                            src="images/logo/boxting_logo.png"
                            alt="Logo"
                            height="300px"
                            width="300px"
                        />
                    </Flex>
                </Box>

                <Box>
                    <Label>Usuario</Label>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Ingresa tu usuario"
                        ref={register({
                            required: true,
                            // pattern: /^([a-zA-Z]{3,})+\s+([a-zA-Z\s]{3,})+$/i,
                        })}
                        sx={{
                            borderColor: errors.username && `red`,
                        }}
                        _placeholder={{ color: `placeholder` }}
                        variant="filled"
                        focusBorderColor="primary"
                        backgroundColor="lightBackground.800"
                        color="lightText.800"
                        _hover={{
                            backgroundColor: `lightBackground.800`,
                            color: `text`,
                        }}
                    />
                    {errors.username && (
                        <Text fontSize="1" color="red!important">
                            Debes completar tu usuario para iniciar sesión
                        </Text>
                    )}
                </Box>
                <Box mt={8}>
                    <Label>Contraseña</Label>
                    <InputGroup size="md" variant="filled">
                        <Input
                            id="password"
                            name="password"
                            pr="4.5rem"
                            type={show ? `text` : `password`}
                            placeholder="Ingresa tu contraseña"
                            ref={register({ required: true })}
                            sx={{
                                borderColor: errors.password && `red`,
                            }}
                            _placeholder={{ color: `placeholder` }}
                            variant="filled"
                            focusBorderColor="primary"
                            backgroundColor="lightBackground.800"
                            color="lightText.800"
                            _hover={{
                                backgroundColor: `lightBackground.800`,
                                color: `text`,
                            }}
                        />
                        <InputRightElement width="5.1rem">
                            <Button
                                h="1.75rem"
                                size="xs"
                                onClick={handleClick}
                                backgroundColor="lightBackground.200"
                                _hover={{
                                    backgroundColor: `lightBackground.100`,
                                }}
                                color="placeholder"
                                _focus={{ borderColor: `primary` }}
                            >
                                {show ? `Ocultar` : `Mostrar`}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                        <Text fontSize="1" textColor="red!important">
                            Debes completar la contraseña para iniciar sesión
                        </Text>
                    )}
                </Box>
                <Box mt={8}>
                    <Flex justifyContent="space-between" align="center">
                        <Text fontSize="xs" color="text" as="u" mr="60px">
                            ¿Olvidaste tu contraseña?
                        </Text>
                        <BoxtingButton
                            isLoading={loading}
                            text="Iniciar sesión"
                            typeBtn={ButtonType.primary}
                            submit
                        />
                    </Flex>
                </Box>
            </form>
        </Box>
    );
};

export default LoginForm;
