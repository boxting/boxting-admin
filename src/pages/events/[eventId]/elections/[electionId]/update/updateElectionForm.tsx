import BoxtingButton from '@/components/buttons/boxting_button';
import {
    FormControl,
    FormLabel,
    Box,
    Input,
    useToast,
    Textarea,
    Select,
    FormErrorMessage,
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
import { FormHelperText } from '@material-ui/core';

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

    // Error state vars
    const [nameError, setNameError] = useState<string | undefined>(undefined)
    const [informationError, setInformationError] = useState<string | undefined>(undefined)
    const [typeError, setTypeError] = useState<string | undefined>(undefined)
    const [winnersError, setWinnersError] = useState<string | undefined>(undefined)

    // Constants
    const MIN_LENGTH_NAME = 5;
    const MAX_LENGTH_NAME = 100;
    const MIN_LENGTH_INFORMATION = 10;
    const MAX_LENGTH_INFORMATION = 500;

    // Utils
    const router = useRouter();
    const toast = useToast();

    // Get service instance
    const electionRepository = ElectionRepository.getInstance()


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

    function validateType() {
        if (type == 0) {
            setTypeError('Debes seleccionar un tipo de actividad.')
        } else {
            setTypeError(undefined)
        }
    }

    function validateWinners() {
        if (winners == 0) {
            setWinnersError('Debes seleccionar la cantidad de ganadores de la actividad.')
        } else {
            setWinnersError(undefined)
        }
    }

    const updateNewEvent = async () => {

        // Validate null data
        if (type < 1 || winners < 1 || name.length == 0 || information.length == 0) {
            validateName()
            validateInformation()
            validateWinners()
            validateType()

            return
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
                `La actividad de elección fue modificada correctamente.`,
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
            <FormControl isInvalid={nameError != undefined} isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Nombre de la actividad de elección"
                    onBlur={validateName}
                />
                <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={informationError != undefined} isRequired>
                <FormLabel>Información</FormLabel>
                <Textarea
                    value={information}
                    onChange={handleInformationChange}
                    onBlur={validateInformation}
                />
                <FormErrorMessage>{informationError}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={typeError != undefined} isRequired>
                <FormLabel>Tipo de actividad</FormLabel>
                <Select value={type} onChange={handleTypeChange} placeholder="Tipo de actividad" onBlur={validateType}>
                    <option key={ElectionTypeEnum.SINGLE} value={ElectionTypeEnum.SINGLE}>
                        Actividad de elección única
					</option>
                    <option key={ElectionTypeEnum.MULTIPLE} value={ElectionTypeEnum.MULTIPLE}>
                        Actividad de elección múltiple
					</option>
                </Select>
                <FormErrorMessage>{typeError}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={winnersError != undefined} isRequired>
                <FormLabel>Cantidad de ganadores</FormLabel>
                <FormHelperText>Esta es la cantidad de candidatos que un votante deberá elegir al momento de emitir un voto.</FormHelperText>
                {
                    (type == ElectionTypeEnum.SINGLE) ?
                        <Input
                            value={1}
                            disabled
                        />
                        :
                        <Select value={winners} onChange={handleWinnersChange} placeholder="Cantidad de ganadores" onBlur={validateWinners}>
                            <option key={2} value={2}>2</option>
                            <option key={3} value={3}>3</option>
                            <option key={4} value={4}>4</option>
                            <option key={5} value={5}>5</option>
                        </Select>
                }
                <FormErrorMessage>{winnersError}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
                <BoxtingButton
                    isDisabled={
                        nameError != undefined || informationError != undefined ||
                        winnersError != undefined || typeError != undefined
                    }
                    isLoading={appState.loading}
                    typeBtn={ButtonType.primary}
                    text="Guardar"
                    onEnter={() => {
                        updateNewEvent();
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default ElectionUpdateForm;
