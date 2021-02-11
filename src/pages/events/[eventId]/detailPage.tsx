import { Box, Center, Flex, PinInput, PinInputField, SimpleGrid, Text } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import DeleteEventAlertDialog from './deleteEvent';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { EditIcon } from '../../../components/icons/index';
import { LockIcon } from '@chakra-ui/icons';
import DatePicker from '@/components/datepicker/DatePicker';
import { Event } from '@/data/event/model/event.model';

interface EventDetailProps {
    event: Event
}

const EventDetail = (props: EventDetailProps) => {
    const { event } = props;

    const router = useRouter();

    if (event == null) {
        return <Center>No hay información del evento de votación</Center>;
    }

    return (
        <Box>
            <PageTitle
                title={event.name}
                description={event.information}
                onBackClick={() => router.push(`/events/`)}
                enableBackIcon
            />
            <DeleteEventAlertDialog event={event} />
            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Editar"
                typeBtn={ButtonType.primary}
                leftIcon={<EditIcon boxSize={4} />}
                onEnter={() =>
                    router.push(
                        {
                            pathname: `/events/[eventId]/update`,
                            query: { data: JSON.stringify(event) },
                        },
                        `/events/${event.id}/update`,
                    )
                }
            />

            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Configurar códigos de acceso"
                typeBtn={ButtonType.primary}
                leftIcon={<LockIcon boxSize={4} />}
                onEnter={() =>
                    router.push(
                        {
                            pathname: `/events/[eventId]/codes`,
                            query: { eventId: event.id },
                        },
                        `/events/${event.id}/codes`,
                    )
                }
            />

            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Configurar actividades de elección"
                typeBtn={ButtonType.primary}
                leftIcon={<LockIcon boxSize={4} />}
                onEnter={() =>
                    router.push(
                        {
                            pathname: `/elections/`,
                            query: { eventId: event.id },
                        },
                        `/elections/`,
                    )
                }
            />

            <Box width='100%'>
                <Text mt="16px">
                    El código de votación para el evento es
        </Text>
                <Flex>
                    <PinInput defaultValue={event.code}>
                        {
                            [...Array(event.code.length)].map((_, i) => <PinInputField key={i} readOnly />)
                        }
                    </PinInput>
                </Flex>
                <br />
                <Flex>
                    <SimpleGrid columns={[1, 1, 2]} spacing={4}>
                        <Box width={['80%', '100%']}>
                            <Text>Fecha de inicio de la votación</Text>
                            <DatePicker
                                selectedDate={event.startDate}
                                inline
                                disabled
                            />
                        </Box>
                        <Box width={['80%', '100%']}>
                            <Text>Fecha de fin de la votación</Text>
                            <DatePicker
                                selectedDate={event.endDate}
                                inline
                                disabled
                            />
                        </Box>
                    </SimpleGrid>
                </Flex>
            </Box>
        </Box>
    );
};

export default EventDetail;
