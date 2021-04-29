import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription, CloseButton } from '@chakra-ui/core';

export default function ErrorMessage({ message, onClose }) {
    return (
        <Box my={4}>
            <Alert status="error" borderRadius={4}>
                <AlertIcon />
                <AlertDescription mr="25px">{message}</AlertDescription>
                <CloseButton onClick={onClose} position="absolute" right="8px" top="8px" />
            </Alert>
        </Box>
    );
}