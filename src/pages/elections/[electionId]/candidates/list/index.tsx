import React, { useEffect, useState } from 'react';
import WithLoadingComponent from '../../../../../components/loading/withComponentLoading';
import CandidateList from './candidateList';
import * as CandidateMapper from '@/data/candidate/api/mapper/candidate.mapper'
import { CandidateRepository } from '@/data/candidate/repository/candidate.repository';

interface ListCandidatesComponentProps {
    electionId: string | undefined
}

function ListCandidatesComponent(props: ListCandidatesComponentProps) {

    const ListCandidatesLoading = WithLoadingComponent(CandidateList);

    const candidateRepository = CandidateRepository.getInstance()

    const electionId = props.electionId

    const [appState, setAppState] = useState({
        loading: false,
        candidates: undefined,
        eventStatus: undefined
    });

    useEffect(() => {
        setAppState({ loading: true, candidates: undefined, eventStatus: undefined });

        const fetchData = async () => {

            try {
                const res = await candidateRepository.getAllByElection(electionId)
                const candidates = await CandidateMapper.getAllToCandidateList(res)
                setAppState({ loading: false, candidates: candidates, eventStatus: res.data.eventStatus })
            } catch (error) {
                setAppState({ loading: false, candidates: undefined, eventStatus: undefined })
            }
        }

        fetchData()

    }, [setAppState])

    return (
        <ListCandidatesLoading
            isLoading={appState.loading}
            candidates={appState.candidates}
            eventStatus={appState.eventStatus}
            electionId={electionId}
        />
    );
}

export default ListCandidatesComponent;
