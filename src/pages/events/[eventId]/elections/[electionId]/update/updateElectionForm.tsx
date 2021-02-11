import BoxtingButton from '@/components/buttons/boxting_button';
import {
    FormControl,
    FormLabel,
    Box,
    Input,
    useToast,
    Textarea,
    Select,
} from '@chakra-ui/core';
import { ButtonType } from '@/components/buttons/utils';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { showToast } from '@/components/toast/custom.toast';
import 'react-datetime/css/react-datetime.css';
import DatePicker from '@/components/datepicker/DatePicker';
import { UpdateRequestDto } from '@/data/event/api/dto/request/update.request.dto';
import { Election } from '@/data/election/model/election.model';
import { ElectionRepository } from '@/data/election/repository/elections.repository';
import { UpdateElectionRequestDto } from '@/data/election/api/dto/request/update.request.dto';
import { ElectionTypeEnum } from '@/data/utils/type.enum';

interface ElectionUpdateFormProps {
    election: Election
}

const ElectionUpdateForm = (props: ElectionUpdateFormProps) => {

    // Props
    const { election } = props;

    // State variables
    const [appState, setAppState] = useState({
        loading: false,
        success: null,
    });

    const [name, setName] = useState(
        election == null ? '' : election.name)
        ;
    const [information, setInformation] = useState(
        election == undefined ? '' : election.information
    );
    const [type, setType] = useState<number>(
        election == undefined ? 1 : election.typeId
    );
    const [winners, setWinners] = useState<number>(
        election == undefined ? 1 : election.winners
    );

    // Utils
    const router = useRouter();
    const toast = useToast();

    // Get service instance
    const electionRepository = ElectionRepository.getInstance()

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
    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (Number(event.target.value) == 1) {
            setType(1)
            setWinners(1)
        } else {
            setWinners(0)
            setType(Number(event.target.value))
        }
    }
    const handleWinnersChange = (event: ChangeEvent<HTMLSelectElement>) => setWinners(Number(event.target.value))

    function showError(msg: string) {
        showToast('Error!', msg, false, toast);
    }

    const updateNewEvent = async () => {

        // Validate null data
        if (type < 1 || winners < 1 || name.length == 0 || information.length == 0) {
            showError(
                'Debes completar todos los campos para crear el evento de votación'
            )
            return
        }

        // Validate if fields are correct
        if (validateLength(name, 5, 100, "nombre") || validateLength(information, 10, 500, "información")) {
            return;
        }

        try {
            setAppState({ loading: true, success: null });

            // Prepare dto to update
            const updateDto: UpdateElectionRequestDto = {
                id: election.id.toString(),
                eventId: election.eventId,
                winners: winners,
                information: information,
                name: name,
                typeId: type
            }

            // Update request
            await electionRepository.update(updateDto)

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
            router.push(
                `/events/[eventId]/elections/[electionId]`,
                `/events/${election.eventId}/elections/${election.id}`
            )
        } catch (error) {
            // Show error toast
            showToast(`Ocurrió un error!`, error, false, toast);
            // Stop loading
            setAppState({ loading: false, success: false });
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
                    text="Modificar"
                    onEnter={() => {
                        updateNewEvent();
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default ElectionUpdateForm;
