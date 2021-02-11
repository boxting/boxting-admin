import BoxtingButton from '@/components/buttons/boxting_button'
import {
	FormControl,
	FormLabel,
	Box,
	Input,
	useToast,
	Textarea,
	Select
} from '@chakra-ui/core'
import { ButtonType } from '@/components/buttons/utils'
import React, { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { showToast } from '@/components/toast/custom.toast'
import { ElectionTypeEnum } from '@/data/utils/type.enum'
import { CreateElectionRequestDto } from '@/data/election/api/dto/request/create.request.dto'
import { ElectionRepository } from '@/data/election/repository/elections.repository'

const today = new Date()

interface ElectionCreateFormProps {
	eventId: string
}

const ElectionCreateForm = (props: ElectionCreateFormProps) => {

	// State variables
	const [appState, setAppState] = useState({
		loading: false,
		success: null,
	})

	const [information, setInformation] = useState('')
	const [name, setName] = useState('')
	const [type, setType] = useState<number>(0)
	const [winners, setWinners] = useState<number>(0)

	// Props
	const eventId = props.eventId

	// Utils
	const router = useRouter()
	const toast = useToast()

	// Get service instance
	const electionRepository = ElectionRepository.getInstance()

	// Functions
	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
	const handleInformationChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInformation(event.target.value)
	const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		if(Number(event.target.value) == 1){
			setType(1)
			setWinners(1)
		}else{
			setWinners(0)
			setType(Number(event.target.value))
		}
	}
	const handleWinnersChange = (event: ChangeEvent<HTMLSelectElement>) => setWinners(Number(event.target.value))

	function showError(msg: string) {
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

	const createNewElection = async () => {
		
		if (type < 1 || winners < 1 || name.length == 0 || information.length == 0) {
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

			const electionRequest: CreateElectionRequestDto = {
				name: name,
				information: information,
				typeId: type,
				winners: winners,
			}
			console.log(eventId)
			const res = await electionRepository.create(eventId, electionRequest)
			const responseSuccess = res != null ? res.success : false

			if (!responseSuccess) {
				throw Error('Create new event fails')
			}

			setAppState({ loading: false, success: responseSuccess })

			showToast('Éxito', 'El evento de votación fue creado correctamente',
				true, toast)

			router.push(
				{
					pathname: '/elections/',
					query: { eventId: eventId }
				}, '/elections/'
			)
		} catch (error) {
			console.log(error)
			showToast('Ocurrió un error!', error, false, toast)
			setAppState({ loading: false, success: false })
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

				/>
			</FormControl>
			<FormControl mt={4}>
				<FormLabel>Tipo de actividad</FormLabel>
				<Select value={type} onChange={handleTypeChange} placeholder="Tipo de actividad">
					<option key={ElectionTypeEnum.SINGLE} value={ElectionTypeEnum.SINGLE}>Actividad de elección única</option>
					<option key={ElectionTypeEnum.MULTIPLE} value={ElectionTypeEnum.MULTIPLE}>Actividad de elección múltiple</option>
				</Select>
			</FormControl>
			<FormControl mt={4}>
				<FormLabel>Cantidad de ganadores</FormLabel>
				{
					(type == ElectionTypeEnum.SINGLE) ?
						<Input
							value={1}
							disabled
						/>
						:
						<Select value={winners} onChange={handleWinnersChange} placeholder="Cantidad de ganadores">
							<option key={2} value={2}>2</option>
							<option key={3} value={3}>3</option>
							<option key={4} value={4}>4</option>
							<option key={5} value={5}>5</option>
						</Select>
				}
			</FormControl>
			<FormControl mt={4}>
				<BoxtingButton
					isLoading={appState.loading}
					typeBtn={ButtonType.primary}
					text="Guardar"
					onEnter={createNewElection}
				/>
			</FormControl>
		</Box>
	)
}

export default ElectionCreateForm