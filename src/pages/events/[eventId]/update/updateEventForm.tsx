import BoxtingButton from '@/components/buttons/boxting_button';
import {
    FormControl,
    FormLabel,
    Box,
    Input,
    useToast,
    Textarea,
    FormErrorMessage
} from '@chakra-ui/core';
import { ButtonType } from '@/components/buttons/utils';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { showToast } from '@/components/toast/custom.toast';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { EventRepository } from '../../../../data/event/repository/events.repository';
import DatePicker from '@/components/datepicker/DatePicker';
import { UpdateRequestDto } from '@/data/event/api/dto/request/update.request.dto';
import { Event } from '@/data/event/model/event.model';

const today = new Date()

interface EventUpdateFormProps {
    event: Event
}

const EventUpdateForm = (props: EventUpdateFormProps) => {

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

    // Error state vars
    const [nameError, setNameError] = useState<string | undefined>(undefined)
    const [informationError, setInformationError] = useState<string | undefined>(undefined)
    const [startDateError, setStartDateError] = useState<string | undefined>(undefined)
    const [endDateError, setEndDateError] = useState<string | undefined>(undefined)

    // Constants
    const MIN_LENGTH_NAME = 5;
    const MAX_LENGTH_NAME = 100;
    const MIN_LENGTH_INFORMATION = 10;
    const MAX_LENGTH_INFORMATION = 500;

    // Utils
    const router = useRouter();
    const toast = useToast();

    // Get service instance
    const eventRepository = EventRepository.getInstance()

    // Functions
    const handleInformationChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInformation(event.target.value);
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

    function onChangeStartDate(date: Date) {
        setStartDate(date)
        validateStartDate(date)
    }

    function onChangeEndDate(date: Date) {
        setEndDate(date)
        validateEndDate(date)
    }

    // State listeners
    useEffect(() => {
        if (endDate < startDate) {
            setEndDate(startDate)
        }
    }, [startDate])

    // Validators
    function validateName() {
        let value = name.trim()
        if (value.length == 0) {
            setNameError('Debes completar el campo nombre.')
        } else if (value.length < MIN_LENGTH_NAME) {
            setNameError(`La longitud del campo nombre debe ser mayor a ${MIN_LENGTH_NAME}.`)
        } else if (value.length > MAX_LENGTH_NAME) {
            setNameError(`La longitud del campo nombre debe ser menor a ${MAX_LENGTH_NAME}.`)
        } else {
            setNameError(undefined)
        }
    }

    function validateInformation() {
        let value = information.trim()
        if (value.length == 0) {
            setInformationError('Debes completar el campo información.')
        } else if (value.length < MIN_LENGTH_INFORMATION) {
            setInformationError(`La longitud del campo información debe ser mayor a ${MIN_LENGTH_INFORMATION}.`)
        } else if (value.length > MAX_LENGTH_INFORMATION) {
            setInformationError(`La longitud del campo información debe ser menor a ${MAX_LENGTH_INFORMATION}.`)
        } else {
            setInformationError(undefined)
        }
    }

    function validateStartDate(value: Date) {
        if (value == null) {
            setStartDateError('Debes completar el campo fecha de inicio.')
        } else if (value.getTime() < Date.now()) {
            setStartDateError(`La fecha y hora de inicio debe ser posterior a la fecha y hora actual.`)
        } else {
            setStartDateError(undefined)
        }
    }

    function validateEndDate(value: Date) {
        if (value == null) {
            setEndDateError('Debes completar el campo fecha de fin.')
        } else if (value.getTime() <= startDate.getTime()) {
            setEndDateError(`La fecha y hora de fin debe ser posterior a la fecha y hora de inicio.`)
        } else {
            setEndDateError(undefined)
        }
    }

    const updateNewEvent = async () => {

        // Validate null data
        if (startDate == null || endDate == null || name.length == 0 || information.length == 0) {
            validateName()
            validateInformation()
            validateStartDate(startDate)
            validateEndDate(endDate)

            return
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
                id: event.id.toString(),
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
                `El evento de votación fue modificado correctamente.`,
                true,
                toast,
            );

            // Set state
            setAppState({ loading: false, success: true });

            // Go back to last screen
            router.push(`/events/[eventId]`, `/events/${event.id}`)
        } catch (error) {
            // Show error toast
            showToast(`Ocurrió un error!`, error, false, toast);
            // Stop loading
            setAppState({ loading: false, success: false });
        }
    }

    return (
        <Box>
            <FormControl isInvalid={nameError != undefined} isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Nombre del evento"
                    onBlur={validateName}
                />
                <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={informationError != undefined} isRequired>
                <FormLabel>Información</FormLabel>
                <Textarea
                    value={information}
                    onChange={handleInformationChange}
                    placeholder="Información"
                    onBlur={validateInformation}
                />
                <FormErrorMessage>{informationError}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={startDateError != undefined} isRequired>
                <FormLabel>Fecha de inicio</FormLabel>
                <DatePicker
                    selectedDate={startDate}
                    onChange={onChangeStartDate}
                    minDate={today}
                />
                <FormErrorMessage>{startDateError}</FormErrorMessage>

            </FormControl>
            <FormControl mt={4} isInvalid={endDateError != undefined} isRequired>
                <FormLabel>Fecha de fin</FormLabel>
                <DatePicker
                    selectedDate={endDate}
                    onChange={onChangeEndDate}
                    minDate={startDate}
                />
                <FormErrorMessage>{endDateError}</FormErrorMessage>

            </FormControl>
            <FormControl mt={4}>
                <BoxtingButton
                    isDisabled={
                        nameError != undefined || informationError != undefined ||
                        startDateError != undefined || endDateError != undefined
                    }
                    isLoading={appState.loading}
                    typeBtn={ButtonType.primary}
                    text="Guardar"
                    onEnter={() => {
                        updateNewEvent();
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default EventUpdateForm;
