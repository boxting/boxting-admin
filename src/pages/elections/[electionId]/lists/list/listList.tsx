import { Grid } from '@chakra-ui/core';
import React from 'react';
import Card from '@/components/card';
import { useRouter } from 'next/router';
import { List } from '@/data/list/model/list.model';

interface EventListProps {
    lists: List[]
}

const ListList = (props: EventListProps) => {

    const { lists } = props;
    const router = useRouter();

    if (lists == null || lists.length == 0) {
        return <p>No se han registrado listas para esta actividad de elección.</p>;
    }

    return (
        <Grid
            py={2}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={4}
        >
            {lists.map((item) => (
                <Card
                    key={item.id}
                    textHead={item.name}
                    textBody={item.information}
                    onEnter={() => router.push(
                        `/elections/[electionId]/lists/[listId]`,
                        `/elections/${item.electionId}/lists/${item.id}`
                    )}
                />
            ))}
        </Grid>
    );
};

export default ListList;
