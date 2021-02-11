import BoxtingButton from '@/components/buttons/boxting_button'
import {
	FormControl,
	FormLabel,
	Box,
	Input,
	useToast,
	Textarea,
} from '@chakra-ui/core'
import { ButtonType } from '@/components/buttons/utils'
import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { showToast } from '@/components/toast/custom.toast'
import { ListRepository } from '@/data/list/repository/list.repository'
import { CreateListRequestDto } from '@/data/list/api/dto/request/create.request.dto'

interface ListCreateFormProps {
	electionId: string | number
}

const ListCreateForm = (props: ListCreateFormProps) => {

	// State variables
	const [appState, setAppState] = useState({
		loading: false,
		success: null,
	})
	const [information, setInformation] = useState('')
	const [name, setName] = useState('')

	// Props
	const electionId = props.electionId

	// Utils
	const router = useRouter()
	const toast = useToast()

	// Get service instance
	const listRepository = ListRepository.getInstance()

	// Functions
	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
	const handleInformationChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInformation(event.target.value)

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

	const createNewList = async () => {

		if (name.length == 0 || information.length == 0) {
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

			const listRequest: CreateListRequestDto = {
				name: name,
				information: information,
				electionId: Number(electionId)
			}

			const res = await listRepository.create(electionId, listRequest)
			const responseSuccess = res != null ? res.success : false

			if (!responseSuccess) {
				throw Error('Create new list fails')
			}

			setAppState({ loading: false, success: responseSuccess })

			showToast('Éxito', 'La lista fue creada correctamente',
				true, toast)

			router.back()
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
					placeholder="Nombre de la lista"
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
				<BoxtingButton
					isLoading={appState.loading}
					typeBtn={ButtonType.primary}
					text="Guardar"
					onEnter={createNewList}
				/>
			</FormControl>
		</Box>
	)
}

export default ListCreateForm
