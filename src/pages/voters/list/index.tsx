import React, { useEffect, useState } from 'react';
import WithLoadingComponent from '../../../components/loading/withComponentLoading';
import VoterList from './collaboratorList'
import * as EventMapper from '@/data/event/api/mapper/event.mapper'
import { EventRepository } from '@/data/event/repository/events.repository';
import { useRouter } from 'next/router';

interface ListVotersComponentProps {
    eventId: string | undefined
}

function ListVotersComponent(props: ListVotersComponentProps) {

    const VoterListLoading = WithLoadingComponent(VoterList);

    const eventRepository = EventRepository.getInstance()

    const router = useRouter()
    const defaultEventId = props.eventId

    const [appState, setAppState] = useState({
        loading: false,
        events: []
    });

    useEffect(() => {
        setAppState({ loading: true, events: [] });

        const fetchData = async () => {

            try {
                const res = await eventRepository.getAll()
                const events = await EventMapper.getAllToEventList(res)

                setAppState({ loading: false, events: events })
            } catch (error) {
                setAppState({ loading: false, events: [] })
            }
        }

        fetchData()

    }, [setAppState])

    return (
        <VoterListLoading isLoading={appState.loading} events={appState.events} default={defaultEventId} router={router} />
    );
}

export default ListVotersComponent;
