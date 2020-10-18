import { NextPage } from 'next';
import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Box, Flex, Text, Center, Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';

const onSubmit = (): void => {
  const router = useRouter();
  setTimeout(() => {
    // run login mutation
    router.push(`/home`); // TODO: Refactor this
  }, 1000);
};
const LoginPage: NextPage = () => (
  <Flex align="center" justify="center" minH="100vh">
    <Box>
      <Center>
        <Text>Login</Text>
      </Center>
      <Text>Welcome to your favourite and most secure voting solution</Text>
      <Button onClick={onSubmit}>Login</Button>
    </Box>
  </Flex>
);

export default LoginPage;
