import BoxtingButton from '@/components/buttons/boxting_button';
import {
    FormControl,
    FormLabel,
    Box,
    Input,
    useToast,
    Textarea,
    Image
} from '@chakra-ui/core';
import { ButtonType } from '@/components/buttons/utils';
import React, { ChangeEvent, useState } from 'react';
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
    const [image, setImage] = useState<Blob>(undefined)

    // Utils
    const router = useRouter();
    const toast = useToast();

    // Get service instance
    const listRepository = ListRepository.getInstance()
    const firebaseManager = FirebaseManager.getInstance()

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
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
    const handleInformationChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInformation(event.target.value)
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files[0]) {
            const file = event.target.files[0]

            if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
                event.target.value = null
                setImage(undefined)
                setImageUrl(list == undefined ? undefined : list.imageUrl)
                showToast('Ocurrió un error!', 'El tipo de archivo seleccionado es incorrecto.', false, toast)
                return
            }

            ImageResizer.imageFileResizer(file, 500, 500, "PNG", 70, 0, (blob: Blob) => {
                setImage(blob)
                setImageUrl(URL.createObjectURL(blob))
            }, "blob")

        } else {
            setImage(undefined)
            setImageUrl(list == undefined ? undefined : list.imageUrl)
            event.target.value = null
        }
    }

    function showError(msg: string) {
        showToast('Error!', msg, false, toast);
    }

    const updateList = async () => {

        // Validate null data
        if (name.length == 0 || information.length == 0) {
            showError(
                'Debes completar todos los campos para editar la lista de candidatos.'
            )
            return
        }

        // Validate if fields are correct
        if (validateLength(name, 5, 100, "nombre") || validateLength(information, 10, 500, "información")) {
            return;
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
                name: `${imageName}.png`,
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
                                `El evento de votación fue modificado con correctamente.`,
                                true,
                                toast,
                            );

                            // Check if necessary to delete old image
                            const oldName = firebaseManager.storage.refFromURL(list.imageUrl).name
                            if (list.imageUrl && oldName != imageData.name) {
                                // Remove image with old name as the new image has been saved
                                firebaseManager.storage.refFromURL(list.imageUrl).delete()
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
                    `El evento de votación fue modificado con correctamente.`,
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
                <FormLabel>Imagen (opcional)</FormLabel>
                <input
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
                    isLoading={appState.loading}
                    typeBtn={ButtonType.primary}
                    text="Modificar"
                    onEnter={() => {
                        updateList();
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default ListUpdateForm;
