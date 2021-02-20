import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import ListVotersComponent from './list/index';

const VoterPage: NextPage = () => {
    const router = useRouter();

    const eventId = router.query.eventId

    return (
        <Box>
            <PageTitle
                title="Usuarios votantes"
                description="En esta sección podrás gestionar los usuarios votantes suscritos según cada evento."
            />

            <ListVotersComponent eventId={eventId as string} />
        </Box>
    );
};

export default dashboardWrapper(VoterPage);
export const getServerSideProps = withAuthServerSideProps();
