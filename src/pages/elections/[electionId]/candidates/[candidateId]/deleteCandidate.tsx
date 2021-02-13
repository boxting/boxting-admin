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
import { CandidateRepository } from '@/data/candidate/repository/candidate.repository';
import { showToast } from '../../../../../components/toast/custom.toast';
import { useRouter } from 'next/router';
import { Candidate } from '@/data/candidate/model/candidate.model';
import { FirebaseManager } from '@/data/firebase-cfg';

interface DeleteCandidateProps {
    candidate: Candidate
}

function DeleteCandidateAlertDialog(props: DeleteCandidateProps) {

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const onClose = () => setIsOpen(false);

    // Props
    const { candidate } = props;

    // Utils
    const cancelRef = useRef();
    const toast = useToast();
    const router = useRouter();

    // Get service instance
    const candidateRepository = CandidateRepository.getInstance()
    const firebaseManager = FirebaseManager.getInstance()

    async function onConfirm() {

        try {
            // Delete request
            await candidateRepository.deleteByElection(candidate.id, candidate.electionId);

            // Delete image if exists
            if(candidate.imageUrl){
                firebaseManager.storage.refFromURL(candidate.imageUrl).delete().catch(()=>{})
            }

            // Close detail
            onClose();

            // Go to candidates page
            router.back()

            // Show success toast
            showToast('Éxito', 'El candidato fue eliminado correctamente.',
                true, toast);

        } catch (error) {
            showToast('Ocurrió un error', error, false, toast);
            onClose();
        }
    }

    return (
        <>
            <Button style={{ marginRight: '12px', marginBottom: '12px' }} colorScheme="red" onClick={() => setIsOpen(true)}>
                Eliminar candidato
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
                        Eliminar candidato
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        ¿Estas seguro que deseas eliminar este candidato? No se
                        podrá recuperar la información del candidato.
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

export default DeleteCandidateAlertDialog;
