import { Box } from '@chakra-ui/core';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import EventUpdateForm from './updateEventForm';
import { Event } from '@/data/event/model/event.model';

const UpdateEventPage: NextPage = () => {
    const router = useRouter();

    const event:Event = JSON.parse(router.query.data as string);

    return (
        <Box>
            <PageTitle
                title="Actualizar votación"
                description="En esta sección se podrá editar la información del evento."
                onBackClick={() => router.push(`/events/`)}
                enableBackIcon
            />

            <EventUpdateForm event={event} />
        </Box>
    );
};

export default dashboardWrapper(UpdateEventPage);
export const getServerSideProps = withAuthServerSideProps();
