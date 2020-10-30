import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { ButtonType } from '@/components/buttons/utils';
import BoxtingButton from '@/components/buttons/boxting_button';
import { AddSmallIcon } from '@/components/icons';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';

import ReactDOM from 'react-dom';
import { NextPage } from 'next';
import DatePicker from 'antd/lib/date-picker';

const CreateEventPage: NextPage = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());

  function onChange(date: string, dateString: string): void {
    console.log(date, dateString);
  }

  return (
    <Box>
      <PageTitle
        title="Crear votación"
        description="En esta sección se deberá poder ver, crear, editar y eliminar las diferentes listas y datos que sirven de base para los demás módulos de la plataforma."
        onBackClick={() => router.push(`/events/`)}
        enableBackIcon
      />
      <FormControl>
        <FormLabel>Nombre</FormLabel>
        <Input placeholder="Nombre" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Descripción</FormLabel>
        <Input placeholder="Descripción" />
      </FormControl>
      <FormControl mt={4}>
        <BoxtingButton
          typeBtn={ButtonType.primary}
          text="Guardar"
          onEnter={() => console.log('hello')}
        />
      </FormControl>
    </Box>
  );
};

export default dashboardWrapper(CreateEventPage);
export const getServerSideProps = withAuthServerSideProps();
