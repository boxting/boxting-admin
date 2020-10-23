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

const EventPage: NextPage = async () => {
  const router = useRouter();

  EventService.read();
  const response = await EventService.read();

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

      <Grid
        py={2}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={4}
      >
        {response.map((item, index) => (
          <Card
            key={index}
            textHead={item.name}
            textBody={item.information}
            onEnter={() => router.push(item.route)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default dashboardWrapper(EventPage);
export const getServerSideProps = withAuthServerSideProps();
