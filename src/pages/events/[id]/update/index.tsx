import { Box, FormControl, FormLabel, Input } from '@chakra-ui/core';
import React, { useState } from 'react';

import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router';

import { NextPage } from 'next';
import EventUpdateForm from './updateEventForm';

const UpdateEventPage: NextPage = (props) => {
  const pageRouter = useRouter();

  const event = props.router.query;

  return (
    <Box>
      <PageTitle
        title="Actualizar votación"
        description="En esta sección se podrá editar la información del evento"
        onBackClick={() => pageRouter.push(`/events/`)}
        enableBackIcon
      />

      <EventUpdateForm event={event} />
    </Box>
  );
};

export default dashboardWrapper(withRouter(UpdateEventPage));
export const getServerSideProps = withAuthServerSideProps();
