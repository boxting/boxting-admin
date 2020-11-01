import React, { useEffect, useState } from 'react';
import axios from 'axios';

import WithLoadingComponent from '../../../components/loading/withComponentLoading';
import EventList from './eventList';

import Cookies from 'js-cookie';

function ListEventsComponent() {
  const EventListLoading = WithLoadingComponent(EventList);
  const [appState, setAppState] = useState({
    loading: false,
    events: null,
  });

  useEffect(() => {
    setAppState({ loading: true, events: null });
    const token = Cookies.get('token');

    const apiUrl =
      'https://blockchain-voting.herokuapp.com/user/token/events/get';

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        const eventsResponse = response.data;
        setAppState({ loading: false, events: eventsResponse });
      })
      .catch((e) => {
        setAppState({ loading: false, events: [] });
      });
  }, [setAppState]);

  return (
    <EventListLoading isLoading={appState.loading} events={appState.events} />
  );
}

export default ListEventsComponent;
