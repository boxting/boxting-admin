import { Box, Center, Grid, Icon, Text } from '@chakra-ui/core';
import React from 'react';
import Card from '@/components/card';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import DeleteEventAlertDialog from './deleteEvent';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { EditIcon } from '../../../components/icons/index';

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
        text="Editar"
        typeBtn={ButtonType.primary}
        leftIcon={<EditIcon boxSize={4} />}
        onEnter={() =>
          router.push(
            {
              pathname: `/events/[id]/update`,
              query: event.data,
            },
            `/events/${event.data.id}/update`,
          )
        }
      />

      <BoxtingButton
        text="Configurar códigos de acceso"
        typeBtn={ButtonType.primary}
        leftIcon={<Icon name="lock" boxSize={4} />}
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

      <Text mt="16px">
        El código de votación para el evento es : {event.data.code}
      </Text>
    </Box>
  );
};

export default EventDetail;
