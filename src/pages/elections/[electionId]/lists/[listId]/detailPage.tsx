import { Box, Center, Flex, Image, PinInput, SimpleGrid, Text } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { EditIcon } from '../../../../../components/icons/index';
import { List } from '@/data/list/model/list.model';
import DeleteListAlertDialog from './deleteList';
import { EventStatusEnum } from '@/data/utils/event.status.enum';
import CookiesManager from '@/data/utils/cookies.manager';

interface ListDetailProps {
    list: List,
    userRole: string
}

const ListDetail = (props: ListDetailProps) => {

    const { list, userRole } = props;

    const router = useRouter();

    if (list == null) {
        return <Center>No hay información de la lista de candidatos.</Center>;
    }

    return (
        <Box>
            <PageTitle
                title={list.name}
                description={list.information}
                imageUrl={list.imageUrl}
                onBackClick={() => router.back()}
                enableBackIcon
                enableImage
                disableInfoIcon
            />

            <DeleteListAlertDialog list={list} 
            disabled={list.eventStatus != EventStatusEnum.NOT_STARTED || userRole == "COLLABORATOR"} />

            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Editar"
                typeBtn={ButtonType.primary}
                leftIcon={<EditIcon boxSize={4} />}
                onEnter={() =>
                    router.push(
                        {
                            pathname: `/elections/[electionId]/lists/[listId]/update`,
                            query: { data: JSON.stringify(list) },
                        },
                        `/elections/${list.electionId}/lists/${list.id}/update`,
                    )
                }
                isDisabled={list.eventStatus != EventStatusEnum.NOT_STARTED}
            />
        </Box>
    );
};

export default ListDetail;
