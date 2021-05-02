import BoxtingButton from '@/components/buttons/boxting_button'
import {
	FormControl,
	FormLabel,
	Box,
	Input,
	useToast,
	Textarea,
	FormErrorMessage
} from '@chakra-ui/core'
import { ButtonType } from '@/components/buttons/utils'
import React, { useEffect, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { showToast } from '@/components/toast/custom.toast'
import DatePicker from '@/components/datepicker/DatePicker'
import { EventRepository } from '@/data/event/repository/events.repository'
import { CreateRequestDto } from '@/data/event/api/dto/request/create.request.dto'

const today = new Date()

const EventCreateForm = () => {

	// State variables
	const [appState, setAppState] = useState({
		loading: false,
		success: null,
	})
	const [startDate, setStartDate] = useState(today)
	const [endDate, setEndDate] = useState(today)
	const [information, setInformation] = useState('')
	const [name, setName] = useState('')

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
	const router = useRouter()
	const toast = useToast()

	// Get service instance
	const eventRepository = EventRepository.getInstance()

	// Functions
	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
	const handleInformationChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInformation(event.target.value)

	// State listeners
	useEffect(() => {
		if (endDate < startDate) {
			setEndDate(startDate)
		}
	}, [startDate])

	function onChangeStartDate(date: Date) {
		setStartDate(date)
		validateStartDate(date)
	}

	function onChangeEndDate(date: Date) {
		setEndDate(date)
		validateEndDate(date)
	}

	const createNewEvent = async () => {

		try {
			setAppState({ loading: true, success: null })

			const eventRequest: CreateRequestDto = {
				name: name,
				information: information,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			}

			const res = await eventRepository.create(eventRequest)
			const responseSuccess = res != null ? res.success : false

			if (!responseSuccess) {
				throw Error('Create new event fails')
			}

			setAppState({ loading: false, success: responseSuccess })

			showToast('Éxito', 'El evento de votación fue creado correctamente',
				true, toast)

			router.back()
		} catch (error) {
			console.log(error)
			showToast('Ocurrió un error!', error, false, toast)
			setAppState({ loading: false, success: false })
		}
	}

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
			<FormControl mt={4} isInvalid={endDateError != undefined} isRequired >
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
					isDisabled={nameError != undefined || informationError != undefined}
					isLoading={appState.loading}
					typeBtn={ButtonType.primary}
					text="Guardar"
					onEnter={createNewEvent}
				/>
			</FormControl>
		</Box>
	)
}

export default EventCreateForm
