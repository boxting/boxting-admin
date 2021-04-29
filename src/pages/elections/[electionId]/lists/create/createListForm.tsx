import BoxtingButton from '@/components/buttons/boxting_button'
import {
	FormControl,
	FormLabel,
	Box,
	Input,
	useToast,
	Textarea,
	Image,
} from '@chakra-ui/core'
import { ButtonType } from '@/components/buttons/utils'
import React, { ChangeEvent, createRef, useState } from 'react'
import { useRouter } from 'next/router'
import { showToast } from '@/components/toast/custom.toast'
import { ListRepository } from '@/data/list/repository/list.repository'
import { CreateListRequestDto } from '@/data/list/api/dto/request/create.request.dto'
import ImageResizer from 'react-image-file-resizer'
import { FirebaseManager } from '@/data/firebase-cfg'
import { ImageUploadInterface } from '@/data/utils/image.interface'
import { CreateListResponseDto } from '@/data/list/api/dto/response/create.response.dto'

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
	const [imagePath, setImagePath] = useState('')
	const [imageExtension, setImageExtension] = useState('')
	const [image, setImage] = useState<Blob>(undefined)

	// Props
	const electionId = props.electionId

	// Utils
	const router = useRouter()
	const toast = useToast()
	const InputRef = createRef<HTMLInputElement>()

	// Get service instance
	const listRepository = ListRepository.getInstance()
	const firebaseManager = FirebaseManager.getInstance()

	// Functions
	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
	const handleInformationChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInformation(event.target.value)
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

	const createNewList = async () => {

		if (name.length == 0 || information.length == 0) {
			showError(
				'Debes completar todos los campos para crear la lista.'
			)
			return
		}

		if (validateLength(name, 5, 100, 'nombre') || validateLength(information, 10, 500, 'información')) {
			return
		}

		// Set app state
		setAppState({ loading: true, success: null })

		// Create list request
		const listRequest: CreateListRequestDto = {
			name: name,
			information: information,
			electionId: Number(electionId),
		}

		if (image != undefined) {
			const imageName = name.replace(new RegExp(' ', 'g'), '_')

			const imageData: ImageUploadInterface = {
				image: image,
				name: `${imageName}_${new Date().getTime()}.${imageExtension}`,
				path: `images/election-${electionId}/lists`
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
						listRequest.imageUrl = url

						// Send creation request
						listRepository.create(
							electionId, listRequest
						).then((value: CreateListResponseDto) => {
							const responseSuccess = value != null ? value.success : false

							if (!responseSuccess) {
								throw Error('Create new list fails')
							}

							setAppState({ loading: false, success: responseSuccess })

							showToast('Éxito', 'La lista fue creada correctamente',
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
				const res: CreateListResponseDto = await listRepository.create(electionId, listRequest)

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
				<FormLabel>Información</FormLabel>
				<Textarea
					value={information}
					onChange={handleInformationChange}
					placeholder="Información de la lista"
				/>
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
					onEnter={createNewList}
				/>
			</FormControl>
		</Box>
	)
}

export default ListCreateForm
