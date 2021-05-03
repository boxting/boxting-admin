import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import WithLoadingComponent from '@/components/loading/withComponentLoading';
import { useEffect, useState } from 'react';
import * as ElectionMapper from '@/data/election/api/mapper/election.mapper'
import ElectionDetail from './detailPage';
import { ElectionRepository } from '@/data/election/repository/elections.repository';
import CookiesManager from '@/data/utils/cookies.manager';
import { CryptoManager } from '@/data/utils/crypto.manager';

const ElectionDetailPage: NextPage = () => {

    // Utils
    const router = useRouter();

    // Query variables
    const { electionId, eventId } = router.query;

    // State variables
    const ElectionDetailLoading = WithLoadingComponent(ElectionDetail);
    const [appState, setAppState] = useState({
        loading: false,
        election: null,
        userRole: ''
    });

    // Get service instance
    const electionRepository = ElectionRepository.getInstance()

    useEffect(() => {
        setAppState({ loading: true, election: null, userRole: '' });

        const fetchData = async () => {

            try {
                const res = await electionRepository.getOne(electionId as string, eventId as string)
                const election = await ElectionMapper.getOneToElection(res)
                
                let userRole = CookiesManager.getInstance()._getRole()
                userRole = CryptoManager.getInstance().decrypt(userRole)

                setAppState({ loading: false, election: election, userRole: userRole })
            } catch (error) {
                setAppState({ loading: false, election: null, userRole: '' });
            }
        }

        fetchData()
    }, [setAppState]);

    return (
        <ElectionDetailLoading isLoading={appState.loading} election={appState.election} userRole={appState.userRole}/>
    );
};

export default dashboardWrapper(ElectionDetailPage);
export const getServerSideProps = withAuthServerSideProps();
