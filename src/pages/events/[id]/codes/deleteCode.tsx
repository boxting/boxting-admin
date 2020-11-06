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
import { CodeService } from '@/data/services/codes.service';
import { isRestTypeNode } from 'typescript';

function DeleteCodeAlertDialog(props) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const onClose = () => setIsOpen(false);
  let { code, onDelete } = props;
  const cancelRef = useRef();
  const toast = useToast();

  async function onConfirm() {
    try {
      const response = await CodeService.deleteCode(code.eventId, code.id)
      showToast(
        'Código eliminado!',
        'El código se ha eliminado correctamente',
        true,
        toast,
      );
      onDelete(code)
    } catch (error) {
      showToast('Ocurrió un error', error, false, toast);
    }
  }

  async function checkUsed(){
    if(code.used){
      showToast('Ocurrió un error', "El código no se puede eliminar porque ya ha sido utilizado", false, toast);
    }else{
      setIsOpen(true)
    }
  }

  return (
    <>
      <Button colorScheme="red" onClick={() => checkUsed()}>
        Eliminar
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
            Eliminar código
          </AlertDialogHeader>

          <AlertDialogBody>
            Estas seguro que deseas eliminar este código de acceso? No podrá ser
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
