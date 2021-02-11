import { Box, Center, Flex, PinInput, SimpleGrid, Text } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { EditIcon } from '../../../../../components/icons/index';
import { Election } from '@/data/election/model/election.model';
import DeleteElectionAlertDialog from './deleteElection';

interface ElectionDetailProps {
    election: Election
}

const ElectionDetail = (props: ElectionDetailProps) => {

    const { election } = props;

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
            />

            <DeleteElectionAlertDialog election={election} />

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

            <Box width='100%'>
                <Text mt="16px">
                    <b>Tipo de actividad:</b> {(election.typeId == 1) ?
                        'Actividad de elección única' : 'Actividad de elección múltiple'}
                </Text>
                <Text mt="16px">
                    <b>Cantidad de ganadores:</b> {election.winners}
                </Text>
            </Box>

        </Box>
    );
};

export default ElectionDetail;
