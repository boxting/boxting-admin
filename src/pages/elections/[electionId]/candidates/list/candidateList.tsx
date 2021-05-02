import { Box, Flex, Grid } from '@chakra-ui/core';
import React from 'react';
import Card from '@/components/card';
import { useRouter } from 'next/router';
import { Candidate } from '@/data/candidate/model/candidate.model';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { AddSmallIcon } from '@/components/icons';
import { EventStatusEnum } from '@/data/utils/event.status.enum';

interface CandidateListProps {
    candidates: Candidate[]
    electionId: string
    eventStatus: EventStatusEnum
}

const CandidateList = (props: CandidateListProps) => {

    const { candidates, electionId, eventStatus } = props;
    const router = useRouter();

    if (candidates == undefined) {
        return <p>Ocurrió un error al cargar los candidatos para esta actividad de elección.</p>;
    }

    return (
        <Box>
            <Flex pb={6}>
                <BoxtingButton
                    text="Nuevo"
                    typeBtn={ButtonType.primary}
                    leftIcon={<AddSmallIcon boxSize={4} />}
                    onEnter={() => router.push(
                        `/elections/[electionId]/candidates/create`,
                        `/elections/${electionId}/candidates/create`
                    )}
                    isDisabled={eventStatus != EventStatusEnum.NOT_STARTED}
                />
            </Flex>

            {(candidates.length == 0) ? <p>No se han registrado candidatos para esta actividad de elección.</p> :
                <Grid
                    py={2}
                    templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                    gap={4}
                >
                    {
                        candidates.map((item) => (
                            <Card
                                src={item.imageUrl}
                                key={item.id}
                                textHead={`${item.firstName} ${item.lastName}`}
                                textBody={`Lista: ${item.list.name}`}
                                onEnter={() => router.push(
                                    `/elections/[electionId]/candidates/[candidateId]`,
                                    `/elections/${item.electionId}/candidates/${item.id}`
                                )}
                            />

                        ))
                    }
                </Grid>
            }
        </Box>

    );
};

export default CandidateList;
