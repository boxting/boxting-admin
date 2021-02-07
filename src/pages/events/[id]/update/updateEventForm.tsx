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
import { UpdateResponseDto } from '@/data/event/api/dto/response/update.response.dto';
import { UpdateRequestDto } from '@/data/event/api/dto/request/update.request.dto';

const today = new Date()

const EventUpdateForm = (props) => {

    // Props
    const { event } = props;

    // State variables
    const [appState, setAppState] = useState({
        loading: false,
        success: null,
    });
    const [name, setName] = useState(event == null ? '' : event.name);
    const [startDate, setStartDate] = useState(event == null ? today : new Date(event.startDate));
    const [endDate, setEndDate] = useState(event == null ? today : new Date(event.endDate));
    const [information, setInformation] = useState(
        event == undefined ? '' : event.information,
    );

    // Utils
    const router = useRouter();
    const toast = useToast();

    // Get service instance
    const eventRepository = EventRepository.getInstance()

    // Validators
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

    // Functions
    const handleInformationChange = (event) => setInformation(event.target.value);
    const handleNameChange = (event) => setName(event.target.value);

    function showError(msg) {
        showToast('Error!', msg, false, toast);
    }

    const updateNewEvent = async () => {
        // Validate null data
        if (startDate == null || endDate == null ||
            name.length == 0 || information.length == 0) {
            showError('Debes completar todos los campos para crear el evento de votación')
            return;
        }

        // Validate if fields are correct
        if (validateLength(name, 5, 100, "nombre") || validateLength(information, 10, 500, "información")) {
            return;
        }

        // Validate if event has not started
        const startDateMoment = moment(event.startDate, 'DD/MM/YYYY HH:mm:SS');
        const endDateMoment = moment(event.endDate, 'DD/MM/YYYY HH:mm:SS');

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

            // Prepare dto to update
            const updateDto: UpdateRequestDto = {
                id: event.id,
                endDate: endDate,
                startDate: startDate,
                information: information,
                name: name
            }

            // Update request
            await eventRepository.update(updateDto)

            // Show successful toast
            showToast(
                `Éxito`,
                `El evento de votación fue modificado con correctamente.`,
                true,
                toast,
            );

            // Set state
            setAppState({ loading: false, success: true });

            // Go back to last screen
            router.back();
        } catch (error) {
            // Show error toast
            showToast(`Ocurrió un error!`, error, false, toast);
            // Stop loading
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
