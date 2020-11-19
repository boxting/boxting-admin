import { Box, Center, Grid, HStack, Icon, PinInput, PinInputField, SimpleGrid, Text } from '@chakra-ui/core';
import React from 'react';
import Card from '@/components/card';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import DeleteEventAlertDialog from './deleteEvent';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { EditIcon } from '../../../components/icons/index';
import { LockIcon } from '@chakra-ui/icons';
import moment from 'moment';
import DatePicker from '@/components/datepicker/DatePicker';

const EventDetail = (props) => {
  const { event } = props;

  const router = useRouter();

  if (event == null || event.data == null)
    return <Center>No hay información del evento de votación</Center>;

  console.log('daw', event.data);

  return (
    <Box>
      <PageTitle
        title={event.data.name}
        description={event.data.information}
        onBackClick={() => router.back()}
        enableBackIcon
      />
      <DeleteEventAlertDialog event={event.data} />
      <BoxtingButton
        style={{ marginRight: '12px', marginBottom: '12px' }}
        text="Editar"
        typeBtn={ButtonType.primary}
        leftIcon={<EditIcon boxSize={4} />}
        onEnter={() =>
          router.push(
            {
              pathname: `/events/[id]/update`,
              query: {
                ...event.data,
                startDate: event.data.startDate.toISOString(),
                endDate: event.data.endDate.toISOString(),
                createdAt: event.data.createdAt.toISOString(),
                updatedAt: event.data.updatedAt.toISOString(),
              },
            },
            `/events/${event.data.id}/update`,
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
              pathname: `/events/[id]/codes`,
              query: event.data,
            },
            `/events/${event.data.id}/codes`,
          )
        }
      />

      <Box>
        <Text mt="16px">
          El código de votación para el evento es
        </Text>
        <HStack>
          <PinInput defaultValue={event.data.code}>
            {
              [...Array(event.data.code.length)].map((_, i) => <PinInputField key={i} readOnly />)
            }
          </PinInput>
        </HStack>
        <br />
        <HStack spacing={10}>
          <Box>
            <Text>Fecha de inicio de la votación</Text>
            <DatePicker
              selectedDate={event.data.startDate}
              inline
            />
          </Box>
          <Box>
            <Text>Fecha de fin de la votación</Text>
            <DatePicker
              selectedDate={event.data.endDate}
              inline
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default EventDetail;
