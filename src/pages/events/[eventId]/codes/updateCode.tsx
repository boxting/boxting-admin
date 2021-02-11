import React, { useRef, useState, ChangeEvent } from 'react';
import {
    Button,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    useToast,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Icon,
} from '@chakra-ui/core';
import { showToast } from '../../../../components/toast/custom.toast';
import { CodeRepository } from '@/data/access_code/repository/codes.repository';
import { AiFillEdit } from 'react-icons/ai'
import { AccessCode } from '@/data/access_code/model/access.code.model';
import { UpdateCodeRequestDto } from '@/data/access_code/api/dto/request/update.request.dto';

interface UpdateCodeProps {
    code: AccessCode,
    index: number,
    onUpdate: (item: AccessCode, index: number) => void
}

function UpdateCodeModal(props: UpdateCodeProps) {

    // Props
    let { code, onUpdate, index } = props;

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const [newCode, setNewCode] = useState<string>((code == undefined) ? '' : code.code);

    // Utils
    const initialRef = useRef();
    const toast = useToast();

    // Repository
    const codeRepository = CodeRepository.getInstance()

    // Functions
    const onClose = () => setIsOpen(false);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setNewCode(event.target.value);

    async function onConfirm() {
        if (newCode.trim().length == 0) {
            showToast('Ocurrió un error', "El código no puede ser vacío", false, toast);
            return
        }

        if (code.code == newCode) {
            showToast('Ocurrió un error', "El código nuevo no puede ser igual al anterior", false, toast);
            return
        }

        try {
            // Create request dto
            const request: UpdateCodeRequestDto = {
                codeId: code.id.toString(),
                eventId: code.eventId,
                newCode: newCode
            }

            // Make request
            await codeRepository.update(request)

            // Show success toast
            showToast(
                'Código modificado!',
                'El código se ha modificado correctamente',
                true,
                toast,
            );
            
            // Assign new code to old code
            code.code = newCode
            // Call update function
            onUpdate(code, index)
            // Close modal
            setIsOpen(false)
        } catch (error) {
            // Show error toast
            showToast('Ocurrió un error', error, false, toast);
        }
    }

    async function checkUsed() {
        if (code.used) {
            showToast('Ocurrió un error', "El código no se puede modificar porque ya ha sido utilizado", false, toast);
        } else {
            setIsOpen(true)
        }
    }

    return (
        <>
            <Button marginRight='12px' marginBottom='12px' colorScheme="blue" onClick={() => checkUsed()}>
                <Icon as={AiFillEdit} />
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="slideInBottom"
                isCentered
            >
                <ModalOverlay />

                <ModalContent>

                    <ModalHeader fontSize="lg" fontWeight="bold">
                        Modificar código
          </ModalHeader>

                    <ModalBody>
                        <FormControl>
                            <FormLabel>Código de acceso</FormLabel>
                            <Input ref={initialRef} placeholder="Código" value={newCode} onChange={handleChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>
                            Cancelar
            </Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3}>
                            Modificar
            </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateCodeModal;
