import React, { useEffect, useState } from 'react';
import WithLoadingComponent from '../../../../../components/loading/withComponentLoading';
import ListList from './listList';
import * as ListMapper from '@/data/list/api/mapper/list.mapper'
import { ListRepository } from '@/data/list/repository/list.repository';

interface ListListsComponentProps {
    electionId: string | undefined
}

function ListListsComponent(props: ListListsComponentProps) {

    const ListListLoading = WithLoadingComponent(ListList);

    const listRepository = ListRepository.getInstance()

    const electionId = props.electionId

    const [appState, setAppState] = useState({
        loading: false,
        lists: undefined,
        eventStatus: undefined,
    });

    useEffect(() => {
        setAppState({ loading: true, lists: undefined, eventStatus: undefined });

        const fetchData = async () => {

            try {
                const res = await listRepository.getAll(electionId)
                const lists = await ListMapper.getAllToListList(res)
                setAppState({ loading: false, lists: lists, eventStatus: res.data.eventStatus })
            } catch (error) {
                setAppState({ loading: false, lists: undefined, eventStatus: undefined })
            }
        }

        fetchData()

    }, [setAppState])

    return (
        <ListListLoading
            isLoading={appState.loading}
            lists={appState.lists}
            eventStatus={appState.eventStatus}
            electionId={electionId}
        />
    );
}

export default ListListsComponent;
