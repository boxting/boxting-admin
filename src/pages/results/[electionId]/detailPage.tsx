import { Box, Center } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import { Election } from '@/data/election/model/election.model';

interface ElectionResultProps {
    election: Election
}

const ElectionResult = (props: ElectionResultProps) => {

    const { election } = props;

    const router = useRouter();

    if (election == null) {
        return <Center>Ocurrió un error al intentar obtener la información requerida.</Center>;
    }

    return (
        <Box>
            <PageTitle
                title={election.name}
                description={election.information}
                onBackClick={() => router.push(
                    {
                        pathname: `/results/`,
                        query: { eventId: election.eventId.toString() },
                    },
                    `/results/`,
                )}
                enableBackIcon
            />

            <Center>No hay resultados de la actividad disponibles.</Center>;

        </Box>
    );
};

export default ElectionResult;
