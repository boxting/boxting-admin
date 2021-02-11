import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import WithLoadingComponent from '@/components/loading/withComponentLoading';
import EventDetail from './detailPage';
import { useEffect, useState } from 'react';
import { EventRepository } from '@/data/event/repository/events.repository';
import * as EventMapper from '@/data/event/api/mapper/event.mapper'

const EventDetailPage: NextPage = () => {

    // Utils
    const router = useRouter();

    // Query variables
    const { eventId } = router.query;
    console.log(router.query)
    // State variables
    const EventDetailLoading = WithLoadingComponent(EventDetail);
    const [appState, setAppState] = useState({
        loading: false,
        event: null,
    });

    // Get service instance
    const eventRepository = EventRepository.getInstance()

    useEffect(() => {
        setAppState({ loading: true, event: null });

        const fetchData = async () => {

            try {
                const res = await eventRepository.getOne(eventId as string)
                const event = await EventMapper.getOneToEvent(res)
                setAppState({ loading: false, event: event })
            } catch (error) {
                setAppState({ loading: false, event: null });
            }
        }

        fetchData()
    }, [setAppState]);

    return (
        <EventDetailLoading isLoading={appState.loading} event={appState.event} />
    );
};

export default dashboardWrapper(EventDetailPage);
export const getServerSideProps = withAuthServerSideProps();
