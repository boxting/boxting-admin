import { NextPage } from 'next';
import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Box, Flex, Text, Center } from '@chakra-ui/core';

const LoginPage: NextPage = () => (
  <Flex align="center" justify="center" minH="100vh">
    <Box>
      <Center>
        <Text>Login</Text>
      </Center>
      <Text>Welcome to your favourite and most secure voting solution</Text>
    </Box>
  </Flex>
);

export default LoginPage;
