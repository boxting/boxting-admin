import { NextPage } from 'next';
import React from 'react';
import { Flex } from '@chakra-ui/core';

import LoginForm from './login_form';
import CookiesManager from '@/data/utils/cookies.manager';
import { CryptoManager } from '@/data/utils/crypto.manager';

const onUserLogin = async (authToken: string, refreshToken: string, role: string) => {
	CookiesManager.getInstance()._setToken(authToken, refreshToken);
	let encRole = CryptoManager.getInstance().encrypt(role)
	CookiesManager.getInstance()._setRole(encRole);
};

const LoginPage: NextPage = () => (
	<Flex align="center" justify="center" minH="100vh">
		<LoginForm onSignIn={onUserLogin} />
	</Flex>
);

export default LoginPage;
