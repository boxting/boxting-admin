import BoxtingButton from '@/components/buttons/boxting_button'
import {
	FormControl,
	FormLabel,
	Box,
	Input,
	useToast,
	Textarea,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Select,
	Image
} from '@chakra-ui/core'
import { ButtonType } from '@/components/buttons/utils'
import React, { ChangeEvent, createRef, useState } from 'react'
import { useRouter } from 'next/router'
import { showToast } from '@/components/toast/custom.toast'
import { List } from '@/data/list/model/list.model'
import { CandidateRepository } from '@/data/candidate/repository/candidate.repository'
import { CreateCandidateRequestDto } from '@/data/candidate/api/dto/request/create.request.dto'
import ImageResizer from 'react-image-file-resizer'
import { FirebaseManager } from '@/data/firebase-cfg'
import { ImageUploadInterface } from '@/data/utils/image.interface'
import { CreateCandidateResponseDto } from '@/data/candidate/api/dto/response/create.response.dto'

interface CandidateCreateFormProps {
	electionId: string | number,
	lists: List[]
}

const CandidateCreateForm = (props: CandidateCreateFormProps) => {

	// State variables
	const [appState, setAppState] = useState({
		loading: false,
		success: null,
	})
	const [information, setInformation] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [age, setAge] = useState<number>(18)
	const [selectedList, setSelectedList] = useState('')
	const [imagePath, setImagePath] = useState('')
	const [imageExtension, setImageExtension] = useState('')
	const [image, setImage] = useState<Blob>(undefined)

	// Props
	const electionId = props.electionId
	const lists = props.lists

	// Utils
	const router = useRouter()
	const toast = useToast()
	const InputRef = createRef<HTMLInputElement>()

	// Get service instance
	const candidateRepository = CandidateRepository.getInstance()
	const firebaseManager = FirebaseManager.getInstance()

	// Functions
	const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)
	const handlLastNameChange = (event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)
	const handleInformationChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInformation(event.target.value)
	const handleAgeChange = (valueStr: string, valueNumber: number) => setAge(valueNumber)
	const handleListChange = (event: ChangeEvent<HTMLSelectElement>) => setSelectedList(event.target.value)
	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files[0]) {
			// Get the image file from input event
			const file = event.target.files[0]

			// Validate that file is a valid image
			if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
				// File is invalid, remove file from event
				event.target.value = null
				// Set image file as undefined
				setImage(undefined)
				// Set image path as undefined
				setImagePath(undefined)
				// Show alert message
				showToast('Ocurrió un error!', 'El tipo de archivo seleccionado es incorrecto.', false, toast)
				return
			}
			const convertType = (file.type == 'image/png') ? "PNG" : "JPEG"
			// File is valid, resize it to optimize resources
			ImageResizer.imageFileResizer(file, 500, 500, convertType, 70, 0, (blob: Blob) => {
				// Set the image with the resized result
				setImage(blob)
				// Set the new local image path
				setImagePath(URL.createObjectURL(blob))
				// Set the image extension
				setImageExtension(convertType)
			}, "blob")

		} else {
			// No image received,set image file as undefined
			setImage(undefined)
			// Set image path as undefined
			setImagePath(undefined)
			// File is invalid, remove file from event
			event.target.value = null
		}
	}

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

	const createNewCandidate = async () => {

		if (firstName.trim().length == 0 || lastName.trim().length == 0 || information.length == 0 ||
			selectedList.trim().length == 0 || age == NaN) {
			showError(
				'Debes completar todos los campos para crear el candidato.'
			)
			return
		}

		if (validateLength(firstName, 2, 100, 'nombre') || validateLength(lastName, 2, 100, 'apellidos') ||
			validateLength(information, 10, 500, 'información')) {
			return
		}

		setAppState({ loading: true, success: null })

		const candidateRequest: CreateCandidateRequestDto = {
			firstName: firstName,
			lastName: lastName,
			age: age,
			listId: Number(selectedList),
			information: information,
			electionId: Number(electionId)
		}


		if (image != undefined) {
			const imageName = lastName.replace(new RegExp(' ', 'g'), '_')

			const imageData: ImageUploadInterface = {
				image: image,
				name: `${imageName}_${new Date().getTime()}.${imageExtension}`,
				path: `images/election-${electionId}/candidates`
			}

			const uploadTask = firebaseManager.storage.ref(
				`${imageData.path}/${imageData.name}`
			).put(imageData.image)

			uploadTask.on(
				"state_changed",
				/*observer*/() => { },
				/*on error*/() => {
					showToast('Ocurrió un error!', 'No se pudo subir la imagen.', false, toast)
					setAppState({ loading: false, success: false })
				},
				/*on complete*/() => {
					firebaseManager.storage.ref(
						`${imageData.path}`
					).child(imageData.name).getDownloadURL().then((url) => {
						// Set the image url
						candidateRequest.imageUrl = url

						// Send creation request
						candidateRepository.create(
							selectedList, candidateRequest
						).then((value: CreateCandidateResponseDto) => {
							const responseSuccess = value != null ? value.success : false

							if (!responseSuccess) {
								throw Error('Create new candidate fails')
							}

							setAppState({ loading: false, success: responseSuccess })

							showToast('Éxito', 'El candidato fue creado correctamente',
								true, toast)

							router.back()
						}).catch((reason) => {
							console.log(reason)
							showToast('Ocurrió un error!', reason, false, toast)
							setAppState({ loading: false, success: false })
						})
					})
				}
			)
		} else {
			try {
				const res = await candidateRepository.create(selectedList, candidateRequest)
				const responseSuccess = res != null ? res.success : false

				if (!responseSuccess) {
					throw Error('Create new candidate fails')
				}

				setAppState({ loading: false, success: responseSuccess })

				showToast('Éxito', 'El candidato fue creado correctamente',
					true, toast)

				router.back()
			} catch (error) {
				console.log(error)
				showToast('Ocurrió un error!', error, false, toast)
				setAppState({ loading: false, success: false })
			}
		}
	}

	return (
		<Box>
			<FormControl mt={4}>
				<FormLabel>Lista</FormLabel>
				<Select value={selectedList} onChange={handleListChange} placeholder="Lista del candidato">
					{
						lists.map((item) => {
							return <option key={item.id} value={item.id}>{item.name}</option>
						})
					}
				</Select>
			</FormControl>
			<FormControl mt={4}>
				<FormLabel>Nombre</FormLabel>
				<Input
					value={firstName}
					onChange={handleFirstNameChange}
					placeholder="Nombre del candidato"
				/>
			</FormControl>
			<FormControl mt={4}>
				<FormLabel>Apellidos</FormLabel>
				<Input
					value={lastName}
					onChange={handlLastNameChange}
					placeholder="Apellidos del candidato"
				/>
			</FormControl>
			<FormControl mt={4}>
				<FormLabel>Descripción</FormLabel>
				<Textarea
					value={information}
					onChange={handleInformationChange}
					placeholder="Información del candidato"
				/>
			</FormControl>
			<FormControl mt={4}>
				<FormLabel>Edad</FormLabel>
				<NumberInput
					min={1}
					max={80}
					value={age}
					onChange={handleAgeChange}
					placeholder='Edad del candidato'>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</FormControl>
			<FormControl mt={4}>
				<BoxtingButton
					typeBtn={ButtonType.outline}
					text="Subir imagen (opcional)"
					onEnter={() => { InputRef.current.click() }}
				/>
				<input
					style={{ display: 'none' }}
					ref={InputRef}
					type="file"
					onChange={handleImageChange}
					accept="image/png, image/jpeg"
				/>
			</FormControl>
			<FormControl mt={4}>
				<Image
					src={imagePath}
					maxWidth='300px'
				/>
			</FormControl>
			<FormControl mt={4}>
				<BoxtingButton
					isLoading={appState.loading}
					typeBtn={ButtonType.primary}
					text="Guardar"
					onEnter={createNewCandidate}
				/>
			</FormControl>
		</Box>
	)
}

export default CandidateCreateForm
