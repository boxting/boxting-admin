import { Box, Center } from '@chakra-ui/core';
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

    if (event == null) {
        return <Center>No hay información del evento de votación</Center>;
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

        </Box>
    );
};

export default ElectionDetail;