import { Box, Flex, Grid, Text } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import { useRouter } from 'next/router';
import Card from '@/components/card';
import PageTitle from '@/components/pageTitle';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { AddSmallIcon } from '@/components/icons';

import { EventService } from '../../data/services/events.service';
import ListEventsComponent from './list/index';

const EventPage: NextPage = () => {
    const router = useRouter();

    return (
        <Box>
            <PageTitle
                title="Votaciones"
                description="En esta sección se deberá poder ver, crear, editar y eliminar las diferentes listas y datos que sirven de base para los demás módulos de la plataforma."
            />

            <Flex pb={6}>
                <BoxtingButton
                    text="Nuevo"
                    typeBtn={ButtonType.primary}
                    leftIcon={<AddSmallIcon boxSize={4} />}
                    onEnter={() => router.push(`/events/create/`)}
                />
            </Flex>

            <ListEventsComponent />
        </Box>
    );
};

export default dashboardWrapper(EventPage);
export const getServerSideProps = withAuthServerSideProps();
