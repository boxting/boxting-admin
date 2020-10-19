import React from 'react';
import { Text } from '@chakra-ui/core';

interface LabelProps {
  children: React.ReactElement | Element | string;
  // htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ children }: LabelProps) => (
  <Text mb={2} color="text" textStyle="text" fontWeight="semibold">
    {children}
  </Text>
);

export default Label;
