import { Box, useToast } from '@chakra-ui/core';
import React, { useState, useEffect } from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';
import * as ListMapper from '@/data/list/api/mapper/list.mapper'
import { NextPage } from 'next';
import CandidateCreateForm from './createCandidateForm';
import { ListRepository } from '@/data/list/repository/list.repository';
import { showToast } from '@/components/toast/custom.toast'

const CreateCandidatePage: NextPage = () => {
    const router = useRouter();

    const listRepository = ListRepository.getInstance()

    const toast = useToast()

    const { electionId } = router.query

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

                if (lists == undefined || lists.length == 0) {
                    showToast('Ocurrió un error!', 'No puedes crear candidatos sin haber creado una lista.', false, toast)
                    router.back()
                    return
                }

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
                title='Crear candidato'
                description='En esta sección se podrá crear un nuevo candidato.'
                onBackClick={() => router.back()}
                enableBackIcon
            />

            <CandidateCreateForm electionId={electionId as string} lists={appState.lists} />
        </Box>
    );
};

export default dashboardWrapper(CreateCandidatePage);
export const getServerSideProps = withAuthServerSideProps();
