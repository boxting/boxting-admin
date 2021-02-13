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
			const file = event.target.files[0]

			if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
				event.target.value = null
				setImage(undefined)
				setImagePath(undefined)
				showToast('Ocurrió un error!', 'El tipo de archivo seleccionado es incorrecto.', false, toast)
				return
			}

			ImageResizer.imageFileResizer(file, 500, 500, "PNG", 70, 0, (blob: Blob) => {
				setImage(blob)
				setImagePath(URL.createObjectURL(blob))
			}, "blob")

		} else {
			setImage(undefined)
			setImagePath(undefined)
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
				'Debes completar todos los campos para crear el evento de votación'
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
				name: `${imageName}_${new Date().getTime()}.png`,
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
				<FormLabel>Descripción</FormLabel>
				<Textarea
					value={information}
					onChange={handleInformationChange}
					placeholder="Información"
				/>
			</FormControl>
			<FormControl mt={4}>
				<BoxtingButton
					typeBtn={ButtonType.outline}
					text="Subir imagen (opcional)"
					onEnter={()=>{InputRef.current.click()}}
				/> 				
				<input
					style={{display:'none'}}
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
