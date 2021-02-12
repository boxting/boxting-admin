import { Box } from '@chakra-ui/core';
import React, { useState, useEffect } from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Candidate } from '@/data/candidate/model/candidate.model';
import CandidateUpdateForm from './updateCandidateForm';
import { ListRepository } from '@/data/list/repository/list.repository';
import * as ListMapper from '@/data/list/api/mapper/list.mapper';

const UpdateCandidatePage: NextPage = () => {
    const router = useRouter();

    const candidate: Candidate = JSON.parse(router.query.data as string);
    const { electionId } = router.query

    const listRepository = ListRepository.getInstance()

    const [appState, setAppState] = useState({
        loading: false,
        lists: [],
    });

    useEffect(() => {
        setAppState({ loading: true, lists: [] });

        const fetchData = async () => {

            try {
                const res = await listRepository.getAll(electionId as string)
                const lists = await ListMapper.getAllToListList(res)
                setAppState({ loading: false, lists: lists })
            } catch (error) {
                setAppState({ loading: false, lists: [] })
            }
        }

        fetchData()

    }, [setAppState])

    return (
        <Box>
            <PageTitle
                title="Actualizar candidato"
                description="En esta sección se podrá editar la información del candidato."
                onBackClick={
                    () => router.back()
                }
                enableBackIcon
            />

            <CandidateUpdateForm candidate={candidate} lists={appState.lists} />
        </Box>
    );
};

export default dashboardWrapper(UpdateCandidatePage);
export const getServerSideProps = withAuthServerSideProps();
