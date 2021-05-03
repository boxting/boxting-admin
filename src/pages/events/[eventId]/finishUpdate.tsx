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
import { Event } from '@/data/event/model/event.model';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

interface FinishEventUpdateProps {
    event: Event
}

function FinishEventUpdateAlertDialog(props: FinishEventUpdateProps) {

    // State variables
    const [isOpen, setIsOpen] = useState<boolean>();
    const onClose = () => setIsOpen(false);

    // Props
    const { event } = props;

    // Utils
    const cancelRef = useRef();
    const toast = useToast();
    const router = useRouter()

    // Get service instance
    const eventRepository = EventRepository.getInstance()

    async function onConfirm() {
     
        try {
            // Delete request
            await eventRepository.initContract(event.id.toString());

            // Close detail
            onClose();

            // Show success toast
            showToast('Éxito', 'La edición del evento fue completada correctamente.',
                true, toast);

            router.reload();
        } catch (error) {
            showToast('Ocurrió un error', error, false, toast);
            onClose();
        }
    }

    return (
        <>
            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px', marginTop: '10px'}}
                text="Finalizar edición de evento"
                typeBtn={ButtonType.alert}
                leftIcon={<CloseIcon boxSize={4} />}
                onEnter={() => setIsOpen(true)}
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
                        Finalizar edición de evento
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        ¿Estás seguro que deseas finalizar la edición del evento? No se
                        podrá volver a modificar el evento ni su contenido.
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

export default FinishEventUpdateAlertDialog;
