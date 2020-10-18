import React from 'react';
import { Box } from '@chakra-ui/core';
import { motion } from 'framer-motion';

// const COLLAPSED_WIDTH = "80px";

const HamburguerContainer = motion.custom(Box);
const Line = motion.custom(Box);

interface HamburguerButtonProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const HamburguerButton: React.FC<HamburguerButtonProps> = ({
  isOpen,
  setOpen,
}: HamburguerButtonProps) => (
  <HamburguerContainer
    borderRadius={32}
    height="40px"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    cursor="pointer"
    onClick={() => setOpen(!isOpen)}
  >
    <Line
      width="15px"
      backgroundColor="#000"
      height="2px"
      m="2px 10px"
      borderRadius={8}
    />
    <Line
      width="11px"
      backgroundColor="#000"
      height="2px"
      m="2px 10px"
      borderRadius={8}
    />
  </HamburguerContainer>
);

export default HamburguerButton;
