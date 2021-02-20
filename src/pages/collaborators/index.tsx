import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import ListCollaboratorsComponent from './list/index';

const CollaboratorPage: NextPage = () => {
    const router = useRouter();

    const eventId = router.query.eventId

    return (
        <Box>
            <PageTitle
                title="Colaboradores"
                description="En esta sección podrás gestionar los colaboradores de apoyo según cada evento."
            />

            <ListCollaboratorsComponent eventId={eventId as string} />
        </Box>
    );
};

export default dashboardWrapper(CollaboratorPage);
export const getServerSideProps = withAuthServerSideProps();
