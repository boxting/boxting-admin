import { Box, Center, Grid } from '@chakra-ui/core';
import React from 'react';
import Card from '@/components/card';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import DeleteEventAlertDialog from './deleteEvent';

const EventDetail = (props) => {
  const { event } = props;

  const router = useRouter();

  if (event == null || event.data == null)
    return <Center>No hay información del evento de votación</Center>;

  return (
    <Box>
      <PageTitle
        title={event.data.name}
        description={event.data.information}
        onBackClick={() => router.back()}
        enableBackIcon
      />
      <DeleteEventAlertDialog />
    </Box>
  );
};

export default EventDetail;
