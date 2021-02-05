import React, { useState } from 'react';
import {
    Box,
    Button,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
    Spinner,
    useToast,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/dist/client/router';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import Label from '@/components/label';
import { LoginService } from '@/data/services/login.service';
import ErrorMessage from '@/components/alerts/error';
import { showToast } from '@/components/toast/custom.toast';

interface LoginInfo {
    username: string;
    password: string;
}

interface LoginFormProps {
    onSignIn: (token: string, refreshToken: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignIn }: LoginFormProps) => {
    const { register, handleSubmit, errors } = useForm(); // watch,
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = React.useState(false);
    const [error, setError] = React.useState(``);

    const router = useRouter();

    const handleClick = () => setShow(!show);

    const closeError = () => setError(``);
    const toast = useToast();

    const loginService = LoginService.getInstance()

    const onSubmit = async (data: LoginInfo) => {
        try {
            setLoading(true);
            const res = await loginService.login(data.username, data.password);
            showToast(
                `Se ha iniciado sesión correctamente`,
                `Redireccionando a panel de control`,
                true,
                toast,
            );

            if (res.data.token && res.data.refreshToken) {
                onSignIn(res.data.token, res.data.refreshToken);
                setLoading(false);
                router.push(`/events`);
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
            setError(error);
        }
    };

    return (
        <Box as="form">
            {error && (
                <Box mb={80}>
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
                        <Text fontSize="xs" color="text" as="u">
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
