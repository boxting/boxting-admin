import BoxtingButton from '@/components/buttons/boxting_button';
import {
    FormControl,
    FormLabel,
    Box,
    Input,
    useToast,
    Textarea,
    Image,
    FormErrorMessage
} from '@chakra-ui/core';
import { ButtonType } from '@/components/buttons/utils';
import React, { ChangeEvent, createRef, useState } from 'react';
import { useRouter } from 'next/router';
import { showToast } from '@/components/toast/custom.toast';
import 'react-datetime/css/react-datetime.css';
import { List } from '@/data/list/model/list.model';
import { ListRepository } from '@/data/list/repository/list.repository';
import { UpdateListRequestDto } from '@/data/list/api/dto/request/update.request.dto';
import ImageResizer from 'react-image-file-resizer'
import { ImageUploadInterface } from '@/data/utils/image.interface';
import { FirebaseManager } from '@/data/firebase-cfg';

interface ListUpdateFormProps {
    list: List
}

const ListUpdateForm = (props: ListUpdateFormProps) => {

    // Props
    const { list } = props;

    // State variables
    const [appState, setAppState] = useState({
        loading: false,
        success: null,
    });

    const [name, setName] = useState(
        list == null ? '' : list.name
    );
    const [information, setInformation] = useState(
        list == undefined ? '' : list.information
    );
    const [imageUrl, setImageUrl] = useState(
        list == undefined ? undefined : list.imageUrl
    );
    const [imageExtension, setImageExtension] = useState('')
    const [image, setImage] = useState<Blob>(undefined)

    // Error state vars
    const [nameError, setNameError] = useState<string | undefined>(undefined)
    const [informationError, setInformationError] = useState<string | undefined>(undefined)

    // Constants
    const MIN_LENGTH_NAME = 5;
    const MAX_LENGTH_NAME = 100;
    const MIN_LENGTH_INFORMATION = 10;
    const MAX_LENGTH_INFORMATION = 500;

    // Utils
    const router = useRouter();
    const toast = useToast();
    const InputRef = createRef<HTMLInputElement>();

    // Get service instance
    const listRepository = ListRepository.getInstance()
    const firebaseManager = FirebaseManager.getInstance()

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
                setImageUrl(list == undefined ? undefined : list.imageUrl)
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
                setImageUrl(URL.createObjectURL(blob))
                // Set the image extension
                setImageExtension(convertType)
            }, "blob")

        } else {
            // No image received,set image file as undefined
            setImage(undefined)
            // Set image path as undefined
            setImageUrl(list == undefined ? undefined : list.imageUrl)
            // File is invalid, remove file from event
            event.target.value = null
        }
    }

    const updateList = async () => {

        // Validate null data
        if (name.length == 0 || information.length == 0) {
            validateInformation()
            validateName()
            return
        }

        setAppState({ loading: true, success: null });

        // Prepare dto to update
        const updateDto: UpdateListRequestDto = {
            id: list.id,
            electionId: list.electionId,
            information: information,
            name: name
        }

        if (image != undefined) {
            const imageName = name.replace(new RegExp(' ', 'g'), '_')

            const imageData: ImageUploadInterface = {
                image: image,
                name: `${imageName}_${new Date().getTime()}.${imageExtension}`,
                path: `images/election-${list.electionId}/lists`
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
                        updateDto.imageUrl = url

                        // Send creation request
                        listRepository.update(updateDto).then(() => {
                            // Show successful toast
                            showToast(
                                `Éxito`,
                                `La lista fue modificada correctamente.`,
                                true,
                                toast,
                            );

                            // Remove image with old name as the new image has been saved
                            if (list.imageUrl) {
                                firebaseManager.storage.refFromURL(list.imageUrl).delete().catch(() => { })
                            }

                            // Set state
                            setAppState({ loading: false, success: true });

                            // Go back to last screen
                            router.back()
                        }).catch((reason) => {
                            // Show error toast
                            showToast(`Ocurrió un error!`, reason, false, toast);
                            // Stop loading
                            setAppState({ loading: false, success: false });
                        })
                    })
                }
            )
        } else {
            try {
                // Update request
                await listRepository.update(updateDto)

                // Show successful toast
                showToast(
                    `Éxito`,
                    `La lista fue modificada correctamente.`,
                    true,
                    toast,
                );

                // Set state
                setAppState({ loading: false, success: true });

                // Go back to last screen
                router.back()
            } catch (error) {
                // Show error toast
                showToast(`Ocurrió un error!`, error, false, toast);
                // Stop loading
                setAppState({ loading: false, success: false });
            }
        }
    }

    return (
        <Box>
            <FormControl isInvalid={nameError != undefined} isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Nombre de la lista"
                    onBlur={validateName}
                />
                <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={informationError != undefined} isRequired>
                <FormLabel>Información</FormLabel>
                <Textarea
                    value={information}
                    onChange={handleInformationChange}
                    placeholder="Información de la lista"
                    onBlur={validateInformation}
                />
                <FormErrorMessage>{informationError}</FormErrorMessage>
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
                    src={imageUrl}
                    maxWidth='300px'
                />
            </FormControl>
            <FormControl mt={4}>
                <BoxtingButton
                    isDisabled={nameError != undefined || informationError != undefined}
                    isLoading={appState.loading}
                    typeBtn={ButtonType.primary}
                    text="Guardar"
                    onEnter={() => {
                        updateList();
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default ListUpdateForm;
