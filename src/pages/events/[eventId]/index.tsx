import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import WithLoadingComponent from '@/components/loading/withComponentLoading';
import EventDetail from './detailPage';
import { useEffect, useState } from 'react';
import { EventRepository } from '@/data/event/repository/events.repository';
import * as EventMapper from '@/data/event/api/mapper/event.mapper'
import CookiesManager from '@/data/utils/cookies.manager';
import { CryptoManager } from '@/data/utils/crypto.manager';

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
        userRole: ''
    });

    // Get service instance
    const eventRepository = EventRepository.getInstance()

    useEffect(() => {
        setAppState({ loading: true, event: null, userRole: '' });

        const fetchData = async () => {

            try {
                const res = await eventRepository.getOne(eventId as string)
                const event = await EventMapper.getOneToEvent(res)
                
                let userRole = CookiesManager.getInstance()._getRole()
                userRole = CryptoManager.getInstance().decrypt(userRole)

                setAppState({ loading: false, event: event, userRole: userRole })
            } catch (error) {
                setAppState({ loading: false, event: null, userRole: '' });
            }
        }

        fetchData()
    }, [setAppState]);

    return (
        <EventDetailLoading isLoading={appState.loading} event={appState.event} userRole={appState.userRole}/>
    );
};

export default dashboardWrapper(EventDetailPage);
export const getServerSideProps = withAuthServerSideProps();
