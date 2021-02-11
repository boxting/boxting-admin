import { Box, Flex } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { AddSmallIcon } from '@/components/icons';
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
            />

            <Flex pb={6}>
                <BoxtingButton
                    text="Nuevo"
                    typeBtn={ButtonType.primary}
                    leftIcon={<AddSmallIcon boxSize={4} />}
                    onEnter={() => router.push(
                        `/elections/[electionId]/lists/create`,
                        `/elections/${electionId}/lists/create`
                    )}
                />
            </Flex>

            <ListListsComponent electionId={electionId as string} />
        </Box>
    );
};

export default dashboardWrapper(ListPage);
export const getServerSideProps = withAuthServerSideProps();
