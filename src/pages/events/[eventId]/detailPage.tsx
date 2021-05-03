import { Box, Center, Flex, PinInput, PinInputField, SimpleGrid, Text } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import DeleteEventAlertDialog from './deleteEvent';
import FinishEventUpdateAlertDialog from './finishUpdate';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { EditIcon } from '../../../components/icons/index';
import { LockIcon } from '@chakra-ui/icons';
import DatePicker from '@/components/datepicker/DatePicker';
import { Event } from '@/data/event/model/event.model';
import { ListAltOutlined } from '@material-ui/icons';
import { EventStatusEnum } from '@/data/utils/event.status.enum';
import { eventStatusColorMapper, eventStatusMapper } from '@/data/utils/event.status';
import CookiesManager from '@/data/utils/cookies.manager';

interface EventDetailProps {
    event: Event
}

const EventDetail = (props: EventDetailProps) => {
    const { event } = props;

    const userRole = CookiesManager.getInstance()._getRole()
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
                disableInfoIcon
            />

            <DeleteEventAlertDialog event={event}
                disabled={(event.eventStatus != EventStatusEnum.NOT_STARTED
                    && event.eventStatus != EventStatusEnum.ENDED) || userRole == "COLLABORATOR"}
            />

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
                isDisabled={event.eventStatus != EventStatusEnum.NOT_STARTED}
            />

            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Gestionar códigos de acceso"
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
                text="Gestionar actividades de elección"
                typeBtn={ButtonType.primary}
                leftIcon={<ListAltOutlined />}
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
                    <b>Estado: </b>
                    <span style={{ color: eventStatusColorMapper(event.eventStatus) }}>
                        {eventStatusMapper(event.eventStatus)}
                    </span>
                </Text>
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

            { (!event.configCompleted && userRole != "COLLABORATOR") ? <FinishEventUpdateAlertDialog event={event} /> : ''}
        </Box>
    );
};

export default EventDetail;
