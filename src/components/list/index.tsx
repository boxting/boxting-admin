import { Grid } from '@chakra-ui/core';
import React from 'react';
import Card from '@/components/card';

const EventList = (props) => {
  const { events } = props;
  console.log(events);
  if (events == null || events.data.length == 0)
    return <p>No hay eventos aún</p>;

  return (
    <Grid
      py={2}
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={4}
    >
      {events.data.map((item) => (
        <Card
          key={item.id}
          textHead={item.name}
          textBody={item.information}
          // onEnter={() => router.push(item.route)}
        />
      ))}
    </Grid>
  );
};

export default EventList;
