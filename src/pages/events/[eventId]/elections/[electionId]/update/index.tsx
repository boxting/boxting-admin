import { Box } from '@chakra-ui/core';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Election } from '@/data/election/model/election.model';
import ElectionUpdateForm from './updateElectionForm';

const UpdateElectionPage: NextPage = () => {
    const router = useRouter();

    const election: Election = JSON.parse(router.query.data as string);

    return (
        <Box>
            <PageTitle
                title="Actualizar actividad de elección"
                description="En esta sección se podrá editar la información de la actividad de elección."
                onBackClick={
                    () => router.push(
                        `/events/[eventId]/elections/[electionId]`,
                        `/events/${election.eventId}/elections/${election.id}`
                    )
                }
                enableBackIcon
                disableInfoIcon
            />

            <ElectionUpdateForm election={election} />
        </Box>
    );
};

export default dashboardWrapper(UpdateElectionPage);
export const getServerSideProps = withAuthServerSideProps();
