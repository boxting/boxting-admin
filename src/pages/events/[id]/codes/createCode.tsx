import React, { useRef, useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  useToast,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Box,
} from '@chakra-ui/core';
import { showToast } from '../../../../components/toast/custom.toast';
import { CodeService } from '@/data/services/codes.service';
import { isRestTypeNode } from 'typescript';
import { AddSmallIcon, MinusSmallIcon } from '@/components/icons';

function CreateCodeModal(props) {

  const [isOpen, setIsOpen] = useState<boolean>();
  const onClose = () => setIsOpen(false);
  const { eventId, onAddCodes } = props
  const initialRef = useRef();
  const toast = useToast();

  const [insertedCodes, setinsertedCodes] = useState(['']);

  const handleChangeInput = (index, event) => {
    const values = [...insertedCodes];
    values[index] = event.target.value;
    setinsertedCodes(values);
  }

  const handleAddFields = () => {
    setinsertedCodes([...insertedCodes, ''])
  }

  const handleRemoveFields = (index) => {
    const values = [...insertedCodes];
    values.splice(index, 1);
    setinsertedCodes(values);
  }

  async function onConfirm() {
    let count = insertedCodes.findIndex((value) => { return value.trim().length == 0})
    
    if(count != -1){
      console.log(count)
      showToast('Ocurrió un error', "No pueden haber códigos vacíos", false, toast);
    }

    try {
      const response = await CodeService.createCodes(insertedCodes, eventId)
      showToast(
        'Códigos creados!',
        'Los códigos ingresados se han registrado correctamente',
        true,
        toast,
      );

      console.log(response.data)
      onAddCodes(response.data)
      setinsertedCodes([''])
      setIsOpen(false)
    } catch (error) {
      showToast('Ocurrió un error', error, false, toast);
    }
  }

  return (
    <>
      <Button colorScheme="purple" onClick={() => setIsOpen(true)} mb={3}>
        Crear códigos de acceso
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />

        <ModalContent>

          <ModalHeader fontSize="lg" fontWeight="bold">
            Crear código(s)
          </ModalHeader>

          <ModalBody>
            <form>
              {insertedCodes.map((code, index) => (
                <Box key={index} mb={2}>
                  <FormControl>
                    <FormLabel>Nuevo código</FormLabel>
                    <Input ref={initialRef} placeholder="Código" value={code}
                    onChange={event => handleChangeInput(index, event)}/>
                  </FormControl>

                  {(insertedCodes.length == 1) ? '' : <Button onClick={() => handleRemoveFields(index)} colorScheme="red" mr={1.5} mt={1.5}>
                    <MinusSmallIcon/>
                  </Button>}

                  <Button onClick={() => handleAddFields()} ml={1.5} mt={1.5}>
                    <AddSmallIcon/>
                  </Button>
                </Box>
              ))}
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Guardar
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateCodeModal;
