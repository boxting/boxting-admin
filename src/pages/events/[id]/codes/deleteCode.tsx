import React, { useRef, useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useToast,
} from '@chakra-ui/core';
import { showToast } from '../../../../components/toast/custom.toast';
import { CodeRepository } from '@/data/access_code/repository/codes.repository';
import { DeleteIcon } from '@chakra-ui/icons';
import { AccessCode } from '@/data/access_code/model/access.code.model';

interface DelteCodeProps {
    code: AccessCode,
    index: number,
    onDelete: (index: number) => void
}

function DeleteCodeAlertDialog(props: DelteCodeProps) {

    // props
    let { code, onDelete, index } = props;

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();

    // Utils
    const cancelRef = useRef();
    const toast = useToast();

    // Repository
    const codeRepository = CodeRepository.getInstance()

    // Functions
    const onClose = () => setIsOpen(false);

    async function onConfirm() {
        try {
            // Make request
            await codeRepository.delete(code.id, code.eventId)

            // Show success toast
            showToast('Código eliminado!', 'El código se ha eliminado correctamente',
                true, toast);

            // Call delete function
            onDelete(index)
        } catch (error) {
            // Show error toast
            showToast('Ocurrió un error', error, false, toast);
        }
    }

    function checkUsed() {
        if (code.used) {
            showToast('Ocurrió un error', "El código no se puede eliminar porque ya ha sido utilizado", false, toast);
        } else {
            setIsOpen(true)
        }
    }

    return (
        <>
            <Button colorScheme="red" marginBottom='12px' onClick={() => checkUsed()}>
                <DeleteIcon />
            </Button>
            
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef}
                onClose={onClose} motionPreset="slideInBottom" isCentered>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Eliminar código
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        ¿Estas seguro que deseas eliminar este código de acceso? No podrá ser
                        utilizado por ningún usuario luego de eliminarlo.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3}>
                            Confirmar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default DeleteCodeAlertDialog;
