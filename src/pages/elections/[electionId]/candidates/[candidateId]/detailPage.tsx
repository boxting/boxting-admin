import { Box, Center, Text } from '@chakra-ui/core';
import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import BoxtingButton from '@/components/buttons/boxting_button';
import { ButtonType } from '@/components/buttons/utils';
import { EditIcon } from '../../../../../components/icons/index';
import { Candidate } from '@/data/candidate/model/candidate.model';
import DeleteCandidateAlertDialog from './deleteCandidate';
import { EventStatusEnum } from '@/data/utils/event.status.enum';

interface CandidateDetailProps {
    candidate: Candidate
}

const CandidateDetail = (props: CandidateDetailProps) => {

    const { candidate } = props;

    const router = useRouter();

    if (candidate == null) {
        return <Center>No hay información del candidato.</Center>;
    }

    return (
        <Box>
            <PageTitle
                title={`${candidate.firstName} ${candidate.lastName}`}
                imageUrl={candidate.imageUrl}
                description={candidate.information}
                onBackClick={() => router.back()}
                enableBackIcon
                enableImage
                disableInfoIcon
            />

            <DeleteCandidateAlertDialog candidate={candidate} disabled={candidate.eventStatus != EventStatusEnum.NOT_STARTED} />

            <BoxtingButton
                style={{ marginRight: '12px', marginBottom: '12px' }}
                text="Editar"
                typeBtn={ButtonType.primary}
                leftIcon={<EditIcon boxSize={4} />}
                onEnter={() =>
                    router.push(
                        {
                            pathname: `/elections/[electionId]/candidates/[candidateId]/update`,
                            query: { data: JSON.stringify(candidate) },
                        },
                        `/elections/${candidate.electionId}/candidates/${candidate.id}/update`,
                    )
                }
                isDisabled={candidate.eventStatus != EventStatusEnum.NOT_STARTED}
            />

            <Box width='100%'>
                <Text mt="16px">
                    <b>Edad del candidato:</b> {candidate.age}
                </Text>
                <Text mt="16px">
                    <b>Lista:</b> {candidate.list.name}
                </Text>
            </Box>

        </Box>
    );
};

export default CandidateDetail;
