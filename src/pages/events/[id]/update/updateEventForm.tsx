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

import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const EventUpdateForm = (props) => {
  const [appState, setAppState] = useState({
    loading: false,
    success: null,
  });

  const { event } = props;

  const router = useRouter();
  const toast = useToast();

  const [name, setName] = useState(event.name);
  const handleNameChange = (event) => setName(event.target.value);

  let startDate = event.startDate;
  let endDate = event.endDate;

  var yesterday = moment().subtract(1, 'day');
  var valid = function (current) {
    return current.isAfter(yesterday);
  };

  const [information, setInformation] = useState(event.information);
  const handleInformationChange = (event) => setInformation(event.target.value);

  function onChangeStartDate(date) {
    const d = moment(date).utc().format('YYYY-MM-DD hh:mm:ss');
    startDate = `${d} GMT-05:00`;
  }
  function onChangeEndDate(date) {
    const d = moment(date).utc().format('YYYY-MM-DD hh:mm:ss');
    endDate = `${d} GMT-05:00`;
  }

  function updateNewEvent() {
    const apiUrl = `https://blockchain-voting.herokuapp.com/event/token/update/${event.id}`;
    setAppState({ loading: true, success: null });
    const token = Cookies.get('token');
    axios
      .put(
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
          `Se ha actualizado el nuevo evento de votación correctamente.`,
          `Ahora puedes acceder a el desde el panel de votación`,
          true,
          toast,
        );
        router.back();
      })
      .catch((e) => {
        showToast(
          `Ocurrió un error!`,
          `El evento de votación no pudo ser actualizado de manera satisfactoria.`,
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
          initialValue={moment(event.startDate).format('DD-MM-YYYY HH:MM:SS')}
          onChange={onChangeStartDate}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Fecha de fin</FormLabel>
        <Datetime
          initialValue={moment(event.endDate).format('DD-MM-YYYY HH:MM:SS')}
          locale="es-mx"
          isValidDate={valid}
          onChange={onChangeEndDate}
        />
      </FormControl>
      <FormControl mt={4}>
        <BoxtingButton
          isLoading={appState.loading}
          typeBtn={ButtonType.primary}
          text="Modificar"
          onEnter={() => {
            updateNewEvent();
          }}
        />
      </FormControl>
    </Box>
  );
};

export default EventUpdateForm;
