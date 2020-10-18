import { Flex, Text } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';

const HomePage: NextPage = () => (
  <Flex align="center" justify="center" minH="100vh">
    <Text>Home Page</Text>
    <Text>Welcome to your favourite and most secure voting solution</Text>
  </Flex>
);

export default dashboardWrapper(HomePage);
