import { NextPage } from 'next';
import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Box, Flex } from '@chakra-ui/core';

import LoginForm from './login_form';

const onUserLogin = (): void => {
  // const router = useRouter();
  // setTimeout(() => {
  //   // run login mutation
  //   router.push(`/home`); // TODO: Refactor this
  // }, 1000);
};
const LoginPage: NextPage = () => (
  <Flex align="center" justify="center" minH="100vh">
    <Box>
      <LoginForm onSignIn={onUserLogin} />
    </Box>
  </Flex>
);

export default LoginPage;
