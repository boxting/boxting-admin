import BoxtingButton from '@/components/buttons/boxting_button'
import {
	FormControl,
	FormLabel,
	Box,
	Input,
	useToast,
	Textarea,
	FormErrorMessage,
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

	const [errorNameLength, setErrorNameLength] = useState(false)
	const [errorInformationLength, setErrorInformationLength] = useState(false)

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
	}

	function onChangeEndDate (date: Date) {
		setEndDate(date)
	}

	function showError(msg) {
		showToast(`Error!`, msg, false, toast)
	}

	// Validators
	function validateLength(value: string, minLen: number, maxLen: number, fieldName: string) {
		let errors = false

		if (value.length > maxLen) {
			showError(
				`La longitud del campo ${fieldName} debe ser menor a la máxima establecida: ${maxLen}.`
			)
			errors = true
		}
		if (value.length < minLen) {
			showError(
				`La longitud del campo ${fieldName} debe ser mayor a la mínima establecida: ${minLen}.`
			)
			errors = true
		}

		return errors
	}

	const createNewEvent = async () => {

		if (startDate == null || endDate == null || name.length == 0 || information.length == 0) {
			showError(
				'Debes completar todos los campos para crear el evento de votación'
			)
			return
		}

		if (validateLength(name, 5, 100, 'nombre') || validateLength(information, 10, 500, 'información')) {
			return
		}

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

	function verifyInputName(){
		setErrorNameLength((name.length < MIN_LENGTH_NAME || name.length > MAX_LENGTH_NAME) && name.length != 0)
	}

	function verifyInputInformation(){
		setErrorInformationLength((information.length < MIN_LENGTH_INFORMATION || information.length > MAX_LENGTH_INFORMATION) && information.length != 0)
	}

	function errorMessageName(){
		if (errorNameLength){
			return `Nombre incorrecto, no debe ser menor a ${MIN_LENGTH_NAME} y mayor a ${MAX_LENGTH_NAME} caracteres.`
		}
	}


	function errorMessageInformation(){
		if (errorInformationLength){
			return `Información incorrecta, no debe ser menor a ${MIN_LENGTH_INFORMATION} y mayor a ${MAX_LENGTH_INFORMATION} caracteres.`
		}
	}

	return (
		<Box>
			<FormControl isInvalid={errorNameLength}>
				<FormLabel>Nombre</FormLabel>
				<Input
					value={name}
					onChange={handleNameChange}
					placeholder="Nombre del evento"
					onBlur = {verifyInputName}
				/>
				<FormErrorMessage>{errorMessageName()}</FormErrorMessage>
			</FormControl>
			<FormControl mt={4}  isInvalid={errorInformationLength}>
				<FormLabel>Descripción</FormLabel>
				<Textarea
					value={information}
					onChange={handleInformationChange}
					placeholder="Información"
					onBlur = {verifyInputInformation}
				/>
				<FormErrorMessage>{errorMessageInformation()}</FormErrorMessage>
			</FormControl>
			<FormControl mt={4}>
				<FormLabel>Fecha de inicio</FormLabel>
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
					isDisabled = {errorNameLength || errorInformationLength}
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
