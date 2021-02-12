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
	NumberDecrementStepper
} from '@chakra-ui/core';
import { ButtonType } from '@/components/buttons/utils';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { showToast } from '@/components/toast/custom.toast';
import 'react-datetime/css/react-datetime.css';
import { CandidateRepository } from '@/data/candidate/repository/candidate.repository';
import { UpdateCandidateRequestDto } from '@/data/candidate/api/dto/request/update.request.dto';
import { Candidate } from '@/data/candidate/model/candidate.model';
import { List } from '@/data/list/model/list.model';

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

    // Utils
    const router = useRouter();
    const toast = useToast();

    // Get service instance
    const candidateRepository = CandidateRepository.getInstance()

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

    function showError(msg: string) {
        showToast('Error!', msg, false, toast);
    }

    const updateCandidate = async () => {

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

        try {
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
