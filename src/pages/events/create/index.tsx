import { Box, FormControl, FormLabel, Input } from '@chakra-ui/core';
import React, { useState } from 'react';
import { ButtonType } from '@/components/buttons/utils';
import BoxtingButton from '@/components/buttons/boxting_button';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';

import { NextPage } from 'next';
import EventCreateForm from './createEventForm';

const CreateEventPage: NextPage = () => {
  const router = useRouter();
  const [] = useState(new Date());

  return (
    <Box>
      <PageTitle
        title="Crear votación"
        description="En esta sección se deberá poder ver, crear, editar y eliminar las diferentes listas y datos que sirven de base para los demás módulos de la plataforma."
        onBackClick={() => router.push(`/events/`)}
        enableBackIcon
      />

      <EventCreateForm />
    </Box>
  );
};

export default dashboardWrapper(CreateEventPage);
export const getServerSideProps = withAuthServerSideProps();
