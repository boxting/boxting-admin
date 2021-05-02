import { Flex, Grid } from '@chakra-ui/core';
import React from 'react';
import Card from '@/components/card';
import { useRouter } from 'next/router';
import { List } from '@/data/list/model/list.model';
import { EventStatusEnum } from '@/data/utils/event.status.enum';
import { Box } from '@material-ui/core';
import BoxtingButton from '@/components/buttons/boxting_button';
import { AddSmallIcon } from '@/components/icons';
import { ButtonType } from '@/components/buttons/utils';

interface ListListProps {
    lists: List[]
    eventStatus: EventStatusEnum
    electionId: string
}

const ListList = (props: ListListProps) => {

    const { lists, eventStatus, electionId } = props;
    const router = useRouter();

    if (lists == undefined) {
        return <p>Ocurrió un error al cargar las listas de candidatos para esta actividad de elección.</p>;
    }

    return (
        <Box>
            <Flex pb={6}>
                <BoxtingButton
                    text="Nuevo"
                    typeBtn={ButtonType.primary}
                    leftIcon={<AddSmallIcon boxSize={4} />}
                    onEnter={() => router.push(
                        `/elections/[electionId]/lists/create`,
                        `/elections/${electionId}/lists/create`
                    )}
                    isDisabled={eventStatus != EventStatusEnum.NOT_STARTED}
                />
            </Flex>

            {
                (lists.length == 0) ? <p>No se han registrado listas para esta actividad de elección.</p> :
                    <Grid
                        py={2}
                        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                        gap={4}>
                        {lists.map((item) => (
                            <Card
                                src={item.imageUrl}
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
            }
        </Box>
    );
};

export default ListList;
