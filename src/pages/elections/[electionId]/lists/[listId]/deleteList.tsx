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
import { ListRepository } from '@/data/list/repository/list.repository';
import { showToast } from '../../../../../components/toast/custom.toast';
import { useRouter } from 'next/router';
import { List } from '@/data/list/model/list.model';
import { FirebaseManager } from '@/data/firebase-cfg';

interface DeleteListProps {
    list: List
}

function DeleteListAlertDialog(props: DeleteListProps) {

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const onClose = () => setIsOpen(false);

    // Props
    const { list } = props;

    // Utils
    const cancelRef = useRef();
    const toast = useToast();
    const router = useRouter();

    // Get service instance
    const listRepository = ListRepository.getInstance()
	const firebaseManager = FirebaseManager.getInstance()

    async function onConfirm() {

        try {
            // Delete request
            await listRepository.delete(list.id, list.electionId);

            // Delete image if exists
            if(list.imageUrl){
                firebaseManager.storage.refFromURL(list.imageUrl).delete()
            }

            // Close detail
            onClose();

            // Go to lists page
            router.back()

            // Show success toast
            showToast('Éxito', 'La lista de candidatos fue eliminada correctamente.',
                true, toast);

        } catch (error) {
            showToast('Ocurrió un error', error, false, toast);
            onClose();
        }
    }

    return (
        <>
            <Button style={{ marginRight: '12px', marginBottom: '12px' }} colorScheme="red" onClick={() => setIsOpen(true)}>
                Eliminar lista de candidatos
      </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                motionPreset="slideInBottom"
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Eliminar lista de candidatos
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        ¿Estas seguro que deseas eliminar esta lista de candidatos? No se
                        podrá recuperar la información es esta lista ni los candidatos registrados.
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

export default DeleteListAlertDialog;
