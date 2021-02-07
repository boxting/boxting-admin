import React, { useEffect, useState } from 'react';
import WithLoadingComponent from '@/components/loading/withComponentLoading';
import { CodeRepository } from '@/data/access_code/repository/codes.repository';
import * as CodeMapper from '@/data/access_code/api/mapper/code.mapper'
import CodesList from './codesList';

interface ListCodesComponentProps {
    eventId: string
}

function ListCodesComponent(props: ListCodesComponentProps) {

    const CodesListLoading = WithLoadingComponent(CodesList);

    // Repository
    const codeRepository = CodeRepository.getInstance()

    // State variables
    const [appState, setAppState] = useState({
        loading: false,
        codes: null,
    });

    useEffect(() => {
        setAppState({ loading: true, codes: null })

        const fetchData = async () => {
            try {
                const res = await codeRepository.getAll(props.eventId)
                const codes = await CodeMapper.getAllToCodesList(res)
                setAppState({ loading: false, codes: codes });
            } catch (error) {
                setAppState({ loading: false, codes: null });
            }
        }

        fetchData()
    }, [setAppState]);

    return (
        <CodesListLoading isLoading={appState.loading} codes={appState.codes} eventId={props.eventId} />
    );
};

export default ListCodesComponent
