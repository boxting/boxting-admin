import React, { useEffect, useState } from 'react';
import WithLoadingComponent from '../../../components/loading/withComponentLoading';
import CollaboratorList from './collaboratorList'
import * as EventMapper from '@/data/event/api/mapper/event.mapper'
import { EventRepository } from '@/data/event/repository/events.repository';
import { useRouter } from 'next/router';

interface ListCollaboratorsComponentProps {
    eventId: string | undefined
}

function ListCollaboratorsComponent(props: ListCollaboratorsComponentProps) {

    const CollaboratorListLoading = WithLoadingComponent(CollaboratorList);

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
        <CollaboratorListLoading isLoading={appState.loading} events={appState.events} default={defaultEventId} router={router} />
    );
}

export default ListCollaboratorsComponent;
