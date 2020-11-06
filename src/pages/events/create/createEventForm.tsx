import BoxtingButton from '@/components/buttons/boxting_button';
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Spinner,
  useToast,
} from '@chakra-ui/core';
import { ButtonType } from '@/components/buttons/utils';
import React, { useState } from 'react';
import axios from 'axios';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { showToast } from '@/components/toast/custom.toast';
import 'moment/locale/es-mx';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const EventCreateForm = () => {
  const [appState, setAppState] = useState({
    loading: false,
    success: null,
  });

  const router = useRouter();
  const toast = useToast();

  var yesterday = moment().subtract(1, 'day');
  var valid = function (current) {
    return current.isAfter(yesterday);
  };

  const [name, setName] = useState('');
  const handleNameChange = (event) => setName(event.target.value);

  let startDate = null;
  let endDate = null;

  const [information, setInformation] = useState('');
  const handleInformationChange = (event) => setInformation(event.target.value);

  function onChangeStartDate(date) {
    const d = moment(date).utc().format('YYYY-MM-DD hh:mm:ss');
    startDate = `${d} GMT-05:00`;
  }
  function onChangeEndDate(date) {
    const d = moment(date).utc().format('YYYY-MM-DD hh:mm:ss');
    endDate = `${d} GMT-05:00`;
  }

  function createNewEvent() {
    console.log(startDate, endDate, name, information);
    const apiUrl = 'https://blockchain-voting.herokuapp.com/event/token/create';
    setAppState({ loading: true, success: null });
    const token = Cookies.get('token');
    axios
      .post(
        apiUrl,
        {
          name: name,
          information: information,
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        const responseSuccess =
          response != null ? response.data.success : false;
        if (!responseSuccess) throw Error('Create new event fails');
        setAppState({ loading: false, success: responseSuccess });
        showToast(
          `Se ha creado el nuevo evento de votación correctamente.`,
          `Ahora puedes acceder a el desde el panel de votación`,
          true,
          toast,
        );
        router.back();
      })
      .catch((e) => {
        console.log(e.message);
        showToast(
          `Ocurrió un error!`,
          `El evento de votación no pudo ser creado de manera satisfactoria.`,
          false,
          toast,
        );
        setAppState({ loading: false, success: false });
      });
  }

  return (
    <Box>
      <FormControl>
        <FormLabel>Nombre</FormLabel>
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder="Nombre del evento"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Descripción</FormLabel>
        <Input
          value={information}
          onChange={handleInformationChange}
          placeholder="Información"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Fecha inicio</FormLabel>
        <Datetime
          locale="es-mx"
          isValidDate={valid}
          onChange={onChangeStartDate}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Fecha de fin</FormLabel>
        <Datetime
          locale="es-mx"
          isValidDate={valid}
          onChange={onChangeEndDate}
        />
      </FormControl>
      <FormControl mt={4}>
        <BoxtingButton
          isLoading={appState.loading}
          typeBtn={ButtonType.primary}
          text="Guardar"
          onEnter={() => {
            createNewEvent();
          }}
        />
      </FormControl>
    </Box>
  );
};

export default EventCreateForm;
