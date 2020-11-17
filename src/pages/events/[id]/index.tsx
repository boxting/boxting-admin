import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Text } from '@chakra-ui/core';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import WithLoadingComponent from '@/components/loading/withComponentLoading';
import EventDetail from './detailPage';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const EventDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const EventDetailLoading = WithLoadingComponent(EventDetail);
  const [appState, setAppState] = useState({
    loading: false,
    event: null,
  });

  useEffect(() => {
    setAppState({ loading: true, event: null });
    const token = Cookies.get('token');

    const apiUrl = `https://blockchain-voting.herokuapp.com/event/token/get/${id}`;

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        const eventResponse = response.data;
        eventResponse.data.startDate = new Date(eventResponse.data.startDate)
        eventResponse.data.endDate = new Date(eventResponse.data.endDate)
        eventResponse.data.createdAt = new Date(eventResponse.data.createdAt)
        eventResponse.data.updatedAt = new Date(eventResponse.data.updatedAt)
        setAppState({ loading: false, event: eventResponse });
      })
      .catch((e) => {
        setAppState({ loading: false, event: null });
      });
  }, [setAppState]);

  return (
    <EventDetailLoading isLoading={appState.loading} event={appState.event} />
  );
};

export default dashboardWrapper(EventDetailPage);
export const getServerSideProps = withAuthServerSideProps();
