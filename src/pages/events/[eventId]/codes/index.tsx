import { Box } from '@chakra-ui/core';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import ListCodesComponent from './list';

const CodesEventPage: NextPage = () => {

    const router = useRouter();

    // Props
    const eventId = router.query.eventId as string;

    return (
        <Box>
            <PageTitle
                title="Configurar códigos de acceso"
                description="En esta sección se podrá gestionar los códigos de acceso de votación individuales para los usuarios votantes."
                onBackClick={() => router.back()}
                enableBackIcon
                disableInfoIcon
            />

            <ListCodesComponent eventId={eventId} />
        </Box>

    );
};

export default dashboardWrapper(CodesEventPage);
export const getServerSideProps = withAuthServerSideProps();
