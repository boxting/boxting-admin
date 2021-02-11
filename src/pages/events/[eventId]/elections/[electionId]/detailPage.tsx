import { Box, Center, Flex, PinInput, PinInputField, SimpleGrid, Text } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import DeleteEventAlertDialog from './deleteEvent';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { EditIcon } from '../../../../../components/icons/index';
import { LockIcon } from '@chakra-ui/icons';
import DatePicker from '@/components/datepicker/DatePicker';
import { Election } from '@/data/election/model/election.model';

interface ElectionDetailProps {
    election: Election
}

const ElectionDetail = (props: ElectionDetailProps) => {

    const { election } = props;

    const router = useRouter();

    if (event == null) {
        return <Center>No hay información del evento de votación</Center>;
    }

    return (
        <Box>
            <PageTitle
                title={election.name}
                description={election.information}
                onBackClick={() => router.push(
                    {
                        pathname: `/elections/`,
                        query: { eventId: election.eventId.toString() },
                    },
                    `/elections/`,
                )}
                enableBackIcon
            />
            
        </Box>
    );
};

export default ElectionDetail;
