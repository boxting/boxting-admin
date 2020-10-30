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

  // EventService.read();
  const response = [
    {
      id: 1,
      name: `New voting event`,
      information: `Information about this new event`,
      startDate: `2020-10-23T23:00:00.000Z`,
      endDate: `2020-10-24T02:00:00.000Z`,
      code: `snuz45ckft`,
      createdAt: `2020-10-23T21:51:39.000Z`,
      updatedAt: `2020-10-23T21:51:39.000Z`,
    },
    {
      id: 2,
      name: `Elección de comite - Ingeniería`,
      information: `Information about this new event`,
      startDate: `2020-10-23T23:00:00.000Z`,
      endDate: `2020-10-24T02:00:00.000Z`,
      code: `snuz45ckft`,
      createdAt: `2020-10-23T21:51:39.000Z`,
      updatedAt: `2020-10-23T21:51:39.000Z`,
    },
    {
      id: 3,
      name: `Elección de comite - Arquitectura`,
      information: `Information about this new event`,
      startDate: `2020-10-23T23:00:00.000Z`,
      endDate: `2020-10-24T02:00:00.000Z`,
      code: `snuz45ckft`,
      createdAt: `2020-10-23T21:51:39.000Z`,
      updatedAt: `2020-10-23T21:51:39.000Z`,
    },
    {
      id: 4,
      name: `Elección de comite - Derecho`,
      information: `Information about this new event`,
      startDate: `2020-10-23T23:00:00.000Z`,
      endDate: `2020-10-24T02:00:00.000Z`,
      code: `snuz45ckft`,
      createdAt: `2020-10-23T21:51:39.000Z`,
      updatedAt: `2020-10-23T21:51:39.000Z`,
    },
    {
      id: 5,
      name: `Elección de comite - Medicina`,
      information: `Information about this new event`,
      startDate: `2020-10-23T23:00:00.000Z`,
      endDate: `2020-10-24T02:00:00.000Z`,
      code: `snuz45ckft`,
      createdAt: `2020-10-23T21:51:39.000Z`,
      updatedAt: `2020-10-23T21:51:39.000Z`,
    },
  ];

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
