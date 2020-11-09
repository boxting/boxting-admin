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

import { useRouter } from 'next/router';
import { showToast } from '@/components/toast/custom.toast';

import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { EventService } from '../../../../data/services/events.service';

const EventUpdateForm = (props) => {
  const [appState, setAppState] = useState({
    loading: false,
    success: null,
  });

  const { event } = props;

  const router = useRouter();
  const toast = useToast();

  const [name, setName] = useState(event == undefined ? '' : event.name);
  const handleNameChange = (event) => setName(event.target.value);

  let startDate = event == undefined ? '' : event.startDate;
  let endDate = event == undefined ? '' : event.endDate;

  var yesterday = moment().subtract(1, 'day');
  var valid = function (current) {
    return current.isAfter(yesterday);
  };

  const [information, setInformation] = useState(
    event == undefined ? '' : event.information,
  );
  const handleInformationChange = (event) => setInformation(event.target.value);

  function onChangeStartDate(date) {
    const d = moment(date).format('YYYY-MM-DD hh:mm:ss');
    startDate = `${d} GMT-05:00`;
  }
  function onChangeEndDate(date) {
    const d = moment(date).format('YYYY-MM-DD hh:mm:ss');
    endDate = `${d} GMT-05:00`;
  }

  async function updateNewEvent() {
    if (
      startDate == null ||
      endDate == null ||
      name.length == 0 ||
      information.length == 0
    ) {
      showToast(
        `Ocurrió un error!`,
        `Debes completar todos los campos para actualizar el evento de votación.`,
        false,
        toast,
      );
      return;
    }

    const startDateMoment = moment(event.startDate, 'DD/MM/YYYY HH:MM:SS');
    const endDateMoment = moment(event.endDate, 'DD/MM/YYYY HH:MM:SS');

    console.log(startDateMoment, endDateMoment);
    if (moment().isBetween(startDateMoment, endDateMoment)) {
      showToast(
        'Ocurrió un error',
        'No se puede modificar un evento que ya ha iniciado',
        false,
        toast,
      );
      return;
    }

    try {
      setAppState({ loading: true, success: null });

      await EventService.updateEvent(
        event.id,
        name,
        information,
        startDate,
        endDate,
      );
      showToast(
        `Éxito`,
        `El evento de votación fue modificado con correctamente.`,
        true,
        toast,
      );
      setAppState({ loading: false, success: true });
      router.back();
    } catch (error) {
      showToast(`Ocurrió un error!`, error, false, toast);
      setAppState({ loading: false, success: false });
    }
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
          isValidDate={valid}
          initialValue={moment
            .utc(startDate)
            .local()
            .format('DD/MM/YYYY HH:mm:SS')}
          onChange={onChangeStartDate}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Fecha de fin</FormLabel>
        <Datetime
          initialValue={moment
            .utc(endDate)
            .local()
            .format('DD/MM/YYYY HH:mm:SS')}
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
