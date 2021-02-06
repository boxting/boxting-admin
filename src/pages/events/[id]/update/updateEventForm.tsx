import BoxtingButton from '@/components/buttons/boxting_button';
import {
    FormControl,
    FormLabel,
    Box,
    Input,
    Text,
    useToast,
    Textarea,
} from '@chakra-ui/core';
import { ButtonType } from '@/components/buttons/utils';
import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { showToast } from '@/components/toast/custom.toast';

import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { EventRepository } from '../../../../data/event/repository/events.repository';
import DatePicker from '@/components/datepicker/DatePicker';

const today = new Date()

const EventUpdateForm = (props) => {
    const [appState, setAppState] = useState({
        loading: false,
        success: null,
    });

    const { event } = props;

    const router = useRouter();
    const toast = useToast();

    const [name, setName] = useState(event == null ? '' : event.name);
    const handleNameChange = (event) => setName(event.target.value);

    const [startDate, setStartDate] = useState(event == null ? today : new Date(event.startDate));
    const [endDate, setEndDate] = useState(event == null ? today : new Date(event.endDate));

    var yesterday = moment().subtract(1, 'day');
    var valid = function (current) {
        return current.isAfter(yesterday);
    };

    const [information, setInformation] = useState(
        event == undefined ? '' : event.information,
    );
    const handleInformationChange = (event) => setInformation(event.target.value);

    function onChangeStartDate(date) {
        const d = moment(date).format('YYYY-MM-DD HH:mm:ss');
        setStartDate(`${d} GMT-05:00`);
    }
    function onChangeEndDate(date) {
        const d = moment(date).format('YYYY-MM-DD HH:mm:ss');
        setEndDate(`${d} GMT-05:00`);
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

    async function updateNewEvent() {
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

        const startDateMoment = moment(event.startDate, 'DD/MM/YYYY HH:mm:SS');
        const endDateMoment = moment(event.endDate, 'DD/MM/YYYY HH:mm:SS');

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

            await EventRepository.updateEvent(
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
                    onChange={e => { }}
                    minDate={today}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Fecha de fin</FormLabel>
                <DatePicker
                    selectedDate={endDate}
                    onChange={e => { }}
                    minDate={today}
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
