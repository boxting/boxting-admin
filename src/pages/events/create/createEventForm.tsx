import BoxtingButton from '@/components/buttons/boxting_button';
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Spinner,
  useToast,
  Textarea,
} from '@chakra-ui/core';
import { ButtonType } from '@/components/buttons/utils';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { showToast } from '@/components/toast/custom.toast';

import moment from 'moment';
import { ErrorMapper } from '@/data/error/error.mapper';
import DatePicker from '@/components/datepicker/DatePicker';

const today = new Date()

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

  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(today)

  const [information, setInformation] = useState('');
  const handleInformationChange = (event) => setInformation(event.target.value);

  useEffect(() => {
    if (endDate < startDate) {
      setEndDate(startDate)
    }
  }, [startDate])

  function onChangeStartDate(date) {
    setStartDate(date)
  }
  function onChangeEndDate(date) {
    setEndDate(date)
  }

  function showError(msg) {
    showToast(
      `Error!`,
      msg,
      false,
      toast,
    );
  }

  function validateLength(value: string, minLen: number, maxLen: number, fieldName: string) {

    let errors = false

    if (value.length > maxLen) {
      showError(`La longitud del campo ${fieldName} debe ser menor a la máxima establecida: ${maxLen}.`)
      errors = true;
    } if (value.length < minLen) {
      showError(`La longitud del campo ${fieldName} debe ser mayor a la mínima establecida: ${minLen}.`)
      errors = true;
    }

    return errors
  }

  function createNewEvent() {
    console.log(startDate, endDate, name, information);
    if (
      startDate == null ||
      endDate == null ||
      name.length == 0 ||
      information.length == 0
    ) {
      showError('Debes completar todos los campos para crear el evento de votación')
      return;
    }

    if (validateLength(name, 5, 100, "nombre") || validateLength(information, 10, 500, "información")) {
      return;
    }

    const apiUrl = 'https://blockchain-voting.herokuapp.com/event/token/create';
    setAppState({ loading: true, success: null });
    const token = Cookies.get('token');
    axios
      .post(
        apiUrl,
        {
          name: name,
          information: information,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log(response)
        const responseSuccess =
          response != null ? response.data.success : false;
        if (!responseSuccess) throw Error('Create new event fails');
        setAppState({ loading: false, success: responseSuccess });
        showToast(
          `Éxito`,
          `El evento de votación fue creado correctamente`,
          true,
          toast,
        );
        router.back();
      })
      .catch((error) => {
        console.log(error.response.data.error);
        let msg = ErrorMapper[error.response.data.error.errorCode] || ErrorMapper[500];
        showToast(
          `Ocurrió un error!`,
          msg,
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
        <Textarea
          value={information}
          onChange={handleInformationChange}
          placeholder="Información"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Fecha inicio</FormLabel>
        <DatePicker
          selectedDate={startDate}
          onChange={onChangeStartDate}
          minDate={today}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Fecha de fin</FormLabel>
        <DatePicker
          selectedDate={endDate}
          onChange={onChangeEndDate}
          minDate={startDate}
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
