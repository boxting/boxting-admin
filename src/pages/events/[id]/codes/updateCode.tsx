import React, { useRef, useState } from 'react';
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
import { CodeService } from '@/data/access_code/repository/codes.service';
import { AiFillEdit } from 'react-icons/ai'

function UpdateCodeModal(props) {

    const [isOpen, setIsOpen] = useState<boolean>();
    const onClose = () => setIsOpen(false);
    let { code, onUpdate, index } = props;

    const [newCode, setNewCode] = useState<string>((code == undefined) ? '' : code.code);
    const handleChange = event => setNewCode(event.target.value);

    const initialRef = useRef();
    const toast = useToast();

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

            await CodeService.updateCode(newCode, code.id, code.eventId)

            showToast(
                'Código modificado!',
                'El código se ha modificado correctamente',
                true,
                toast,
            );

            code.code = newCode
            onUpdate(code, index)
            setIsOpen(false)
        } catch (error) {
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
