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
import { showToast } from '@/components/toast/custom.toast';
import { DeleteIcon } from '@chakra-ui/icons';
import { EventRepository } from '@/data/event/repository/events.repository';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';

interface UnsubscribeCollaboratorProps {
    eventId: string,
    userId: string,
    username: string,
    onUnsubscribeCollaborator: () => void
}

function UnsubscribeCollaboratorAlertDialog(props: UnsubscribeCollaboratorProps) {

    // props
    let { eventId, userId, username, onUnsubscribeCollaborator } = props;

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();

    // Utils
    const cancelRef = useRef();
    const toast = useToast();

    // Repository
    const eventRepository = EventRepository.getInstance()

    // Functions
    const onClose = () => setIsOpen(false);

    async function onConfirm() {
        try {
            // Make request
            await eventRepository.unsubscribeUser(eventId, userId)

            // Show success toast
            showToast('Código eliminado!', 'El colaborador fue eliminado del evento.',
                true, toast);

            // Call delete function
            onUnsubscribeCollaborator()

            // Close toast
            setIsOpen(false)
        } catch (error) {
            // Show error toast
            showToast('Ocurrió un error', error, false, toast);
        }
    }


    return (
        <>
            <BoxtingButton
                style={{ margin: '0px' }}
                text="Eliminar"
                typeBtn={ButtonType.outline}
                leftIcon={<DeleteIcon boxSize={4} />}
                onEnter={() => { setIsOpen(true) }}
            />

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef}
                onClose={onClose} motionPreset="slideInBottom" isCentered>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Eliminar colaborador
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        ¿Estas seguro que deseas eliminar a {username} como colaborador del evento?
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

export default UnsubscribeCollaboratorAlertDialog;
