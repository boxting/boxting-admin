import { Box, Flex } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import ListListsComponent from './list/index';

const ListPage: NextPage = () => {
    const router = useRouter();

    const electionId = router.query.electionId

    return (
        <Box>
            <PageTitle
                title="Listas de candidatos"
                description="En esta sección podrás ver, crear, editar y eliminar las diferentes listas de candidatos para tus actividades de elección."
                onBackClick={() => router.back()}
                enableBackIcon
                disableInfoIcon
            />

            <ListListsComponent electionId={electionId as string} />
        </Box>
    );
};

export default dashboardWrapper(ListPage);
export const getServerSideProps = withAuthServerSideProps();
