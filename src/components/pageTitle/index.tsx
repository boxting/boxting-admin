import React from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/core';
import { InfoCircleIcon, LeftSmallIcon } from '@/components/icons';

interface PageTitleProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    onBackClick?: () => void;
    enableBackIcon?: boolean;
    disableInfoIcon?: boolean;
    enableImage?: boolean;
    pb?: number;
}

const PageTitle: React.FC<PageTitleProps> = ({
    title,
    description,
    imageUrl,
    onBackClick,
    enableBackIcon = false,
    disableInfoIcon = false,
    enableImage = false,
    pb = 10,
}: PageTitleProps) => {
    return (
        <Box pb={pb}>
            <Flex alignItems="center">
                {enableBackIcon && (
                    <Box
                        onClick={onBackClick}
                        _hover={{ cursor: 'pointer' }}
                        ml={[-2, -2, -2, -8]}
                        pr={2}
                    >
                        <LeftSmallIcon boxSize={6} color="#18191F" />
                    </Box>
                )}
                {enableImage && (
                    <Box transform="translateY(1px)" pr={2}>
                        <Image
                            src={imageUrl}
                            maxHeight='50px'
                            fallbackSrc='/images/logo/boxting_logo.png'
                        />
                    </Box>
                )}
                <Heading as="h1" textStyle="h1">
                    {title}
                </Heading>
                {!disableInfoIcon && (
                    <Box transform="translateY(1px)" pl={4}>
                        <InfoCircleIcon boxSize={5} color="#18191F" />
                    </Box>
                )}
            </Flex>
            {description && (
                <Text pt={6} width={['100%', '90%', '70%', '60%']} as="p" textStyle="p">
                    {description}
                </Text>
            )}
        </Box>
    );
};

export default PageTitle;
