import React, { useEffect, useState } from 'react';
import axios from 'axios';

import WithLoadingComponent from '../../../components/loading/withComponentLoading';
import EventList from './eventList';

import Cookies from 'js-cookie';
import { EventRepository } from '@/data/event/repository/events.repository';

function ListEventsComponent() {

    const EventListLoading = WithLoadingComponent(EventList);

    const eventService = EventRepository.getInstance()

    const [appState, setAppState] = useState({
        loading: false,
        events: null,
    });

    useEffect(() => {
        setAppState({ loading: true, events: null });

        const fetchData = async () => {

            try {
                const res = await eventService.getAllEvents()
                setAppState({ loading: false, events: res })
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
