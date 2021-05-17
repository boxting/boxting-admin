import { Box, Center } from '@chakra-ui/core';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import { Election } from '@/data/election/model/election.model';
import Chart from '@/components/barChart'

interface ElectionResultProps {
    election: Election
}

const ElectionResult = (props: ElectionResultProps) => {

    const { election } = props;

    const router = useRouter();

    const [appState, setAppState] = useState({
        events: []
    });

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
                disableInfoIcon
            />

            <Center
                width = "85%"
                position = "relative"
                top = "50px">
                <Chart  election = {election as Election}/>
            </Center>

        </Box>
    );
};

export default ElectionResult;
