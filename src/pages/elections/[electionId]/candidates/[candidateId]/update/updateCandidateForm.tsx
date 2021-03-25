import BoxtingButton from '@/components/buttons/boxting_button';
import {
    FormControl,
    FormLabel,
    Box,
    Input,
    useToast,
    Textarea,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Image
} from '@chakra-ui/core';
import { ButtonType } from '@/components/buttons/utils';
import React, { ChangeEvent, createRef, useState } from 'react';
import { useRouter } from 'next/router';
import { showToast } from '@/components/toast/custom.toast';
import 'react-datetime/css/react-datetime.css';
import { CandidateRepository } from '@/data/candidate/repository/candidate.repository';
import { UpdateCandidateRequestDto } from '@/data/candidate/api/dto/request/update.request.dto';
import { Candidate } from '@/data/candidate/model/candidate.model';
import { List } from '@/data/list/model/list.model';
import { FirebaseManager } from '@/data/firebase-cfg';
import ImageResizer from 'react-image-file-resizer'
import { ImageUploadInterface } from '@/data/utils/image.interface';

interface CandidateUpdateFormProps {
    candidate: Candidate,
    lists: List[]
}

const CandidateUpdateForm = (props: CandidateUpdateFormProps) => {

    // Props
    const { candidate, lists } = props;

    // State variables
    const [appState, setAppState] = useState({
        loading: false,
        success: null,
    });

    const [information, setInformation] = useState(
        candidate == null ? '' : candidate.information
    );
    const [firstName, setFirstName] = useState(candidate == null ? '' : candidate.firstName)
    const [lastName, setLastName] = useState(candidate == null ? '' : candidate.lastName)
    const [age, setAge] = useState<number>(candidate == null ? NaN : candidate.age)
    const [selectedList, setSelectedList] = useState(candidate == null ? '' : candidate.listId.toString())
    const [imageUrl, setImageUrl] = useState(
        candidate == null ? undefined : candidate.imageUrl
    );
    const [imageExtension, setImageExtension] = useState('')
    const [image, setImage] = useState<Blob>(undefined)

    // Utils
    const router = useRouter();
    const toast = useToast();
    const InputRef = createRef<HTMLInputElement>();

    // Get service instance
    const candidateRepository = CandidateRepository.getInstance()
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
                setImageUrl(candidate == null ? undefined : candidate.imageUrl)
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
            setImageUrl(candidate == null ? undefined : candidate.imageUrl)
            // File is invalid, remove file from event
            event.target.value = null
        }
    }

    function showError(msg: string) {
        showToast('Error!', msg, false, toast);
    }

    const updateCandidate = async () => {

        if (firstName.trim().length == 0 || lastName.trim().length == 0 || information.length == 0 ||
            selectedList.trim().length == 0 || age == NaN) {
            showError(
                'Debes completar todos los campos para actualizar el candidato.'
            )
            return
        }

        if (validateLength(firstName, 2, 100, 'nombre') || validateLength(lastName, 2, 100, 'apellidos') ||
            validateLength(information, 10, 500, 'información')) {
            return
        }

        setAppState({ loading: true, success: null });

        // Prepare dto to update
        const updateDto: UpdateCandidateRequestDto = {
            id: candidate.id,
            age: age,
            electionId: candidate.electionId,
            firstName: firstName,
            lastName: lastName,
            information: information,
            listId: Number(selectedList)
        }

        if (image != undefined) {
            const imageName = lastName.replace(new RegExp(' ', 'g'), '_')

            const imageData: ImageUploadInterface = {
                image: image,
                name: `${imageName}_${new Date().getTime()}.${imageExtension}`,
                path: `images/election-${candidate.electionId}/candidates`
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
                        candidateRepository.updateByElection(updateDto).then(() => {
                            // Show successful toast
                            showToast(
                                `Éxito`,
                                `El candidato fue modificado correctamente.`,
                                true,
                                toast,
                            );

                            // Remove image with old name as the new image has been saved
                            if (candidate.imageUrl) {
                                firebaseManager.storage.refFromURL(candidate.imageUrl).delete().catch(() => { })
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
                await candidateRepository.updateByElection(updateDto)

                // Show successful toast
                showToast(
                    `Éxito`,
                    `El candidato fue modificado correctamente.`,
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
            <FormControl mt={4}>
                <FormLabel>Lista</FormLabel>
                <Select value={selectedList} onChange={handleListChange} placeholder="Lista del candidato">
                    {
                        lists && lists.map((item) => {
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
                    src={imageUrl}
                    maxWidth='300px'
                />
            </FormControl>
            <FormControl mt={4}>
                <BoxtingButton
                    isLoading={appState.loading}
                    typeBtn={ButtonType.primary}
                    text="Guardar"
                    onEnter={updateCandidate}
                />
            </FormControl>
        </Box>
    );
};

export default CandidateUpdateForm;
