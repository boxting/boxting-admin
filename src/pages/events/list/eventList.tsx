import { Grid } from '@chakra-ui/core';
import React from 'react';
import Card from '@/components/card';
import { useRouter } from 'next/router';

const EventList = (props) => {
    const { events } = props;
    const router = useRouter();

    if (events == null || events.length == 0){
        return <p>No se han registrado eventos de votación.</p>;
    }
        
    return (
        <Grid
            py={2}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={4}
        >
            {events.map((item) => (
                <Card
                    key={item.id}
                    textHead={item.name}
                    textBody={item.information}
                    onEnter={() => router.push(`/events/[id]`, `/events/${item.id}`)}
                />
            ))}
        </Grid>
    );
};

export default EventList;
