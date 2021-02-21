import React, { useRef, useState, ChangeEvent } from 'react';
import {
    Button, Modal, ModalContent, ModalOverlay, ModalHeader, ModalFooter, useToast,
    ModalBody, FormControl, FormLabel, Input, HStack,
} from '@chakra-ui/core';
import { showToast } from '../../../../components/toast/custom.toast';
import { CodeRepository } from '@/data/access_code/repository/codes.repository';
import { AddSmallIcon, MinusSmallIcon } from '@/components/icons';
import { AccessCode } from '@/data/access_code/model/access.code.model';
import { CreateCodesRequestDto } from '@/data/access_code/api/dto/request/create.request.dto';
import * as AccessCodeMapper from '@/data/access_code/api/mapper/code.mapper'
import { AddIcon } from '@chakra-ui/icons';
import { ButtonType } from '@/components/buttons/utils';
import BoxtingButton from '@/components/buttons/boxting_button';
import { Box } from '@material-ui/core';

interface CreateCodesProps {
    eventId: string,
    onAddCodes: (newCodes: AccessCode[]) => void
}

function CreateCodeModal(props: CreateCodesProps) {

    // Props
    const { eventId, onAddCodes } = props

    // Utils
    const initialRef = useRef();
    const toast = useToast();

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const [insertedCodes, setinsertedCodes] = useState<string[]>(['']);

    // Repository
    const codeRepository = CodeRepository.getInstance()

    // Functions
    const onClose = () => {
        setIsOpen(false)
        setinsertedCodes([''])
    }

    const handleChangeInput = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const values = [...insertedCodes];
        values[index] = event.target.value;
        setinsertedCodes(values);
    }

    const handleAddFields = () => {
        setinsertedCodes([...insertedCodes, ''])
    }

    const handleRemoveFields = (index: number) => {
        const values = [...insertedCodes];
        values.splice(index, 1);
        setinsertedCodes(values);
    }

    async function onConfirm() {
        // Find if there is an empty code
        let emptyCodeIndex = insertedCodes.findIndex((value) => { return value.trim().length == 0 })

        // If empty code found, show error message
        if (emptyCodeIndex != -1) {
            showToast('Ocurrió un error', "No pueden haber códigos vacíos", false, toast);
            return
        }

        try {
            // Create request Dto
            const request: CreateCodesRequestDto = {
                codes: insertedCodes,
                eventId: Number(eventId)
            }

            // Send request
            const response = await codeRepository.create(request)

            // Show successfull message
            showToast('Códigos creados!', 'Código de acceso creado correctamente',
                true, toast,
            );

            // Map response to AccessCodes array
            const createdCodes = await AccessCodeMapper.createToCodesList(response)

            // Add codes to original list
            onAddCodes(createdCodes)

            // Set state variables
            setinsertedCodes([''])
            setIsOpen(false)

        } catch (error) {
            // Show error message
            showToast('Ocurrió un error', error, false, toast);
        }
    }

    return (
        <>
            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Crear códigos de acceso"
                typeBtn={ButtonType.primary}
                leftIcon={<AddIcon boxSize={4} />}
                onEnter={() => setIsOpen(true)}
            />

            <Modal isOpen={isOpen} onClose={onClose}
                motionPreset="slideInBottom" isCentered>

                <ModalOverlay />

                <ModalContent>
                    <ModalHeader fontSize="lg" fontWeight="bold">
                        Crear código(s)
                    </ModalHeader>
                    <ModalBody>
                        <Box>
                            {insertedCodes.map((code, index) => (
                                <HStack key={index} style={{ marginBottom: '20px' }}>
                                    <FormControl>
                                        <FormLabel>Nuevo código</FormLabel>
                                        <Input ref={initialRef} placeholder="Código" value={code}
                                            onChange={event => handleChangeInput(index, event)} />
                                    </FormControl>

                                    {(insertedCodes.length == 1) ?
                                        '' :
                                        <Button alignSelf='flex-end' onClick={() => handleRemoveFields(index)}
                                            colorScheme="red" mr={1.5} mt={1.5}>
                                            <MinusSmallIcon />
                                        </Button>}
                                </HStack>
                            ))}
                            <Button onClick={() => handleAddFields()} ml={1.5} mt={1.5}>
                                <AddSmallIcon />
                            </Button>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateCodeModal;
