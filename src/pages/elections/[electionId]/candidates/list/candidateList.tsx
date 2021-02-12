import { Box, Grid, Heading } from '@chakra-ui/core';
import React from 'react';
import Card from '@/components/card';
import { useRouter } from 'next/router';
import { Candidate } from '@/data/candidate/model/candidate.model';

interface CandidateListProps {
    candidates: Candidate[]
}

const CandidateList = (props: CandidateListProps) => {

    const { candidates } = props;
    const router = useRouter();

    if (candidates == null || candidates.length == 0) {
        return <p>No se han registrado candidatos para esta actividad de elección.</p>;
    }

    return (
        <Grid
            py={2}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={4}
        >
            {
                candidates.map((item) => (

                    <Card
                        key={item.id}
                        textHead={`${item.firstName} ${item.lastName}`}
                        textBody={item.information}
                        onEnter={() => router.push(
                            `/lists/[listId]/candidates/[candidateId]`,
                            `/lists/${item.listId}/candidates/${item.id}`
                        )}
                    />

                ))
            }
        </Grid>
    );
};

export default CandidateList;
