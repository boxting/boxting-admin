import { Box } from '@chakra-ui/core';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { List } from '@/data/list/model/list.model';
import ListUpdateForm from './updateListForm';

const UpdateListPage: NextPage = () => {
    const router = useRouter();

    const list: List = JSON.parse(router.query.data as string);

    return (
        <Box>
            <PageTitle
                title="Actualizar lista de candidatos"
                description="En esta sección se podrá editar la información de la lista de candidatos."
                onBackClick={
                    () => router.back()
                }
                enableBackIcon
                disableInfoIcon
            />

            <ListUpdateForm list={list} />
        </Box>
    );
};

export default dashboardWrapper(UpdateListPage);
export const getServerSideProps = withAuthServerSideProps();
