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

function DeleteEventAlertDialog(props) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const onClose = () => setIsOpen(false);
  const { event } = props;
  const cancelRef = useRef();
  const toast = useToast();
  async function onConfirm() {
    try {
      const response = await EventService.delete(event.id);
      showToast(
        'Evento eliminado exitosamente',
        'La información fue eliminada de manera exitosa',
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
