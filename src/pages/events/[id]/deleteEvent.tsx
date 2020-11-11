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
import { EventService } from '@/data/services/events.service';
import { showToast } from '../../../components/toast/custom.toast';
import { useRouter } from 'next/router';
import moment from 'moment';

function DeleteEventAlertDialog(props) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const onClose = () => setIsOpen(false);
  const { event } = props;
  const cancelRef = useRef();
  const toast = useToast();
  const router = useRouter();
  async function onConfirm() {
    // TODO: Validate not delete started events
    // No puede eliminar el evento de votación porque ya ha iniciado
    const startDateMoment = moment(event.startDate, 'DD/MM/YYYY HH:mm:SS');
    const endDateMoment = moment(event.endDate, 'DD/MM/YYYY HH:mm:SS');

    console.log(startDateMoment, endDateMoment, moment.utc());
    if (moment.utc().isBetween(startDateMoment, endDateMoment)) {
      showToast(
        'Ocurrió un error',
        'No se puede eliminar un evento que ya ha iniciado',
        false,
        toast,
      );
      return;
    }
    try {
      await EventService.delete(event.id);
      onClose();
      router.push('/events');
      showToast(
        'Éxito',
        'El evento de votación fue eliminado correctamente.',
        true,
        toast,
      );
    } catch (error) {
      showToast('Ocurrió un error', error, false, toast);
    }
  }

  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
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
            Estas seguro que deseas eliminar este evento de votación? No se
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
