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
                disableInfoIcon
                title="Resultados"
                description="En esta sección podrás ver los resultados de los eventos de votación finalizados."
            />

            <ListElectionsComponent eventId={eventId as string} />
        </Box>
    );
};

export default dashboardWrapper(ElectionPage);
export const getServerSideProps = withAuthServerSideProps();
