import React from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/core';

import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { ArrowRightIcon } from '@/components/icons';

interface CardProps {
  textHead: string;
  textBody: string;
  onEnter?: () => void;
  disabled?: boolean;
  src?: string;
}

const Card: React.FC<CardProps> = ({
  onEnter,
  textHead,
  textBody,
  disabled,
  src,
}: CardProps) => (
  <Box
    overflow="hidden"
    position="relative"
    maxWidth="18rem"
    borderRadius={10}
    boxShadow="0px 4px 10px rgba(170, 170, 170, 0.2)"
    _hover={{}}
    transition="0.2s"
  >
    <Flex
      position="relative"
      direction="column"
      justifyContent="space-between"
      height="100%"
      px={5}
      py={6}
    >
      <Box>
        {src && (
          <Flex justifyContent="center">
            <Image
              width="100%"
              src={src}
              fallbackSrc="https://via.placeholder.com/150"
            />
          </Flex>
        )}
      </Box>
      <Box>
        <Flex direction="column">
          <Box pt={6}>
            <Heading as="h2" textStyle="h2">
              {textHead}
            </Heading>
          </Box>
          <Box py={3}>
            <Text as="p" textStyle="p" fontWeight={400} fontSize="md">
              {textBody}
            </Text>
          </Box>
        </Flex>
        <Flex mt={5}>
          <BoxtingButton
            text="Ingresar"
            typeBtn={ButtonType.outline}
            rightIcon={<ArrowRightIcon boxSize={4} />}
            onEnter={!disabled && onEnter}
          />
        </Flex>
      </Box>
    </Flex>
    {disabled && (
      <Box
        top={0}
        left={0}
        position="absolute"
        backgroundColor="#FEFEFE"
        opacity={0.8}
        height="100%"
        width="100%"
      />
    )}
  </Box>
);

export default Card;
