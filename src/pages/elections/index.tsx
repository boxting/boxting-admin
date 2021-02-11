import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import ListElectionsComponent from './list/index';

const ElectionPage: NextPage = () => {
    const router = useRouter();

    const eventId = router.query.eventId
    return (
        <Box>
            <PageTitle
                title="Elecciones"
                description="En esta sección podrás ver, crear, editar y eliminar las diferentes actividades de elección creadas según cada evento."
            />

            <ListElectionsComponent eventId={eventId as string} />
        </Box>
    );
};

export default dashboardWrapper(ElectionPage);
export const getServerSideProps = withAuthServerSideProps();
