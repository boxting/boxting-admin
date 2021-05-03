import { Box, Center, Text } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { EditIcon } from '../../../../../components/icons/index';
import { Election } from '@/data/election/model/election.model';
import DeleteElectionAlertDialog from './deleteElection';
import { EventStatusEnum } from '@/data/utils/event.status.enum';
import { eventStatusColorMapper, eventStatusMapper } from '@/data/utils/event.status';

interface ElectionDetailProps {
    election: Election,
    userRole: string
}

const ElectionDetail = (props: ElectionDetailProps) => {

    const { election, userRole } = props;

    const router = useRouter();

    if (election == null) {
        return <Center>No hay información de la actividad de elección</Center>;
    }

    return (
        <Box>
            <PageTitle
                title={election.name}
                description={election.information}
                onBackClick={() => router.push(
                    {
                        pathname: `/elections/`,
                        query: { eventId: election.eventId.toString() },
                    },
                    `/elections/`,
                )}
                enableBackIcon
                disableInfoIcon
            />

            <DeleteElectionAlertDialog election={election}
                disabled={election.eventStatus != EventStatusEnum.NOT_STARTED || userRole == "COLLABORATOR"}
            />

            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Editar"
                typeBtn={ButtonType.primary}
                leftIcon={<EditIcon boxSize={4} />}
                onEnter={() =>
                    router.push(
                        {
                            pathname: `/events/[eventId]/elections/[electionId]/update`,
                            query: { data: JSON.stringify(election) },
                        },
                        `/events/${election.eventId}/elections/${election.id}/update`,
                    )
                }
                isDisabled={election.eventStatus != EventStatusEnum.NOT_STARTED}
            />

            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Gestionar listas"
                typeBtn={ButtonType.primary}
                leftIcon={<EditIcon boxSize={4} />}
                onEnter={() =>
                    router.push(
                        `/elections/[electionId]/lists/`,
                        `/elections/${election.id}/lists/`,
                    )
                }
            />

            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Gestionar candidatos"
                typeBtn={ButtonType.primary}
                leftIcon={<EditIcon boxSize={4} />}
                onEnter={() =>
                    router.push(
                        `/elections/[electionId]/candidates/`,
                        `/elections/${election.id}/candidates/`,
                    )
                }
            />

            <Box width='100%'>
                <Text mt="16px">
                    <b>Tipo de actividad:</b> {(election.typeId == 1) ?
                        'Actividad de elección única' : 'Actividad de elección múltiple'}
                </Text>
                <Text mt="16px">
                    <b>Cantidad de ganadores:</b> {election.winners}
                </Text>
                <Text mt="16px">
                    <b>Estado: </b>
                    <span style={{ color: eventStatusColorMapper(election.eventStatus) }}>
                        {eventStatusMapper(election.eventStatus)}
                    </span>
                </Text>
            </Box>

        </Box>
    );
};

export default ElectionDetail;
