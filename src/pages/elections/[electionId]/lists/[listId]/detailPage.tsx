import { Box, Center, Flex, Image, PinInput, SimpleGrid, Text } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { EditIcon } from '../../../../../components/icons/index';
import { List } from '@/data/list/model/list.model';
import DeleteListAlertDialog from './deleteList';

interface ListDetailProps {
    list: List
}

const ListDetail = (props: ListDetailProps) => {

    const { list } = props;

    const router = useRouter();

    if (list == null) {
        return <Center>No hay información de la lista de candidatos.</Center>;
    }

    return (
        <Box>
            <PageTitle
                title={list.name}
                description={list.information}
                onBackClick={() => router.back()}
                enableBackIcon
            />

            <DeleteListAlertDialog list={list} />

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
            />

            <Box width='100%'>
                <Image
                    mt="16px"
                    src={(list.imageUrl) ? list.imageUrl : '/images/logo/boxting_logo.png'}
                    maxWidth='300px'
                />
            </Box>
        </Box>
    );
};

export default ListDetail;
