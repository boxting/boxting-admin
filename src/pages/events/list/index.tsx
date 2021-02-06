import React, { useEffect, useState } from 'react';
import axios from 'axios';

import WithLoadingComponent from '../../../components/loading/withComponentLoading';
import EventList from './eventList';

import { EventRepository } from '@/data/event/repository/events.repository';
import * as EventMapper from '@/data/event/api/mapper/event.mapper'

function ListEventsComponent() {

    const EventListLoading = WithLoadingComponent(EventList);

    const eventRepository = EventRepository.getInstance()

    const [appState, setAppState] = useState({
        loading: false,
        events: null,
    });

    useEffect(() => {
        setAppState({ loading: true, events: null });

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
        <EventListLoading isLoading={appState.loading} events={appState.events} />
    );
}

export default ListEventsComponent;
