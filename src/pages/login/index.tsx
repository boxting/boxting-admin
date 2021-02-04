import { NextPage } from 'next';
import React from 'react';
import Cookies from 'js-cookie';
import { Flex } from '@chakra-ui/core';

import LoginForm from './login_form';
import CookiesManager from '@/data/utils/cookies.manager';

const onUserLogin = (authToken): void => {
  CookiesManager.getInstance()._setToken(authToken, '')
}

const LoginPage: NextPage = () => (
  <Flex align="center" justify="center" minH="100vh">
    <LoginForm onSignIn={onUserLogin} />
  </Flex>
);

export default LoginPage;
