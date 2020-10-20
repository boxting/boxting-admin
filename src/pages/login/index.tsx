import { NextPage } from 'next';
import React from 'react';
import Cookies from 'js-cookie';
// eslint-disable-next-line object-curly-newline
import { Flex } from '@chakra-ui/core';

import LoginForm from './login_form';

const onUserLogin = (authToken): void => {
  console.log('dawd' + authToken);
  Cookies.set(`token`, authToken);
};
const LoginPage: NextPage = () => (
  <Flex align="center" justify="center" minH="100vh">
    <LoginForm onSignIn={onUserLogin} />
  </Flex>
);

export default LoginPage;
