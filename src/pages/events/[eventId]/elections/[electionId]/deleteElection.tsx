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
import { ElectionRepository } from '@/data/election/repository/elections.repository';
import { showToast } from '../../../../../components/toast/custom.toast';
import { useRouter } from 'next/router';
import { Election } from '@/data/election/model/election.model';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { DeleteIcon } from '@chakra-ui/icons';

interface DeleteElectionProps {
    election: Election,
    disabled: boolean
}

function DeleteElectionAlertDialog(props: DeleteElectionProps) {

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const onClose = () => setIsOpen(false);

    // Props
    const { election, disabled } = props;

    // Utils
    const cancelRef = useRef();
    const toast = useToast();
    const router = useRouter();

    // Get service instance
    const electionRepository = ElectionRepository.getInstance()

    async function onConfirm() {

        try {
            // Delete request
            await electionRepository.delete(election.id, election.eventId);

            // Close detail
            onClose();

            // Go to elections page
            router.push(
                {
                    pathname: `/elections/`,
                    query: { eventId: election.eventId.toString() },
                },
                `/elections/`,
            )

            // Show success toast
            showToast('Éxito', 'La actividad de elección fue eliminada correctamente.',
                true, toast);

        } catch (error) {
            showToast('Ocurrió un error', error, false, toast);
            onClose();
        }
    }

    return (
        <>
            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Eliminar"
                typeBtn={ButtonType.alert}
                leftIcon={<DeleteIcon boxSize={4} />}
                onEnter={() => setIsOpen(true)}
                isDisabled={disabled}
            />

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
                        Eliminar actividad de elección
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        ¿Estas seguro que deseas eliminar esta actividad de elección? No se
                        podrá recuperar la información de esta actividad.
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

export default DeleteElectionAlertDialog;
