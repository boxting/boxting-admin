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
import { EventRepository } from '@/data/event/repository/events.repository';
import { showToast } from '../../../components/toast/custom.toast';
import { useRouter } from 'next/router';
import moment from 'moment';

function DeleteEventAlertDialog(props) {

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const onClose = () => setIsOpen(false);

    // Props
    const { event } = props;

    // Utils
    const cancelRef = useRef();
    const toast = useToast();
    const router = useRouter();

    // Get service instance
    const eventRepository = EventRepository.getInstance()

    async function onConfirm() {
        // TODO: Validate not delete started events
        // No puede eliminar el evento de votación porque ya ha iniciado
        const startDateMoment = moment(event.startDate, 'DD/MM/YYYY HH:mm:SS');
        const endDateMoment = moment(event.endDate, 'DD/MM/YYYY HH:mm:SS');

        // Validate if event has not started
        if (moment.utc().isBetween(startDateMoment, endDateMoment)) {
            showToast(
                'Ocurrió un error',
                'No se puede eliminar un evento que ya ha iniciado',
                false,
                toast,
            );
            onClose();
            return;
        }

        try {
            // Delete request
            await eventRepository.delete(event.id);

            // Close detail
            onClose();

            // Go to events page
            router.push('/events');

            // Show success toast
            showToast('Éxito', 'El evento de votación fue eliminado correctamente.',
                true, toast);

        } catch (error) {
            showToast('Ocurrió un error', error, false, toast);
            onClose();
        }
    }

    return (
        <>
            <Button style={{ marginRight: '12px', marginBottom: '12px' }} colorScheme="red" onClick={() => setIsOpen(true)}>
                Eliminar evento
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
                        Eliminar evento
          </AlertDialogHeader>

                    <AlertDialogBody>
                        ¿Estas seguro que deseas eliminar este evento de votación? No se
                        podrá recuperar la información de este evento.
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

export default DeleteEventAlertDialog;
