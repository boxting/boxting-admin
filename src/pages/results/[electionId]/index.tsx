import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import WithLoadingComponent from '@/components/loading/withComponentLoading';
import { useEffect, useState } from 'react';
import ElectionResult from './detailPage';
import { ElectionRepository } from '@/data/election/repository/elections.repository';
import * as ElectionMapper from '@/data/election/api/mapper/election.mapper'

const ElectionResultPage: NextPage = () => {

    // Utils
    const router = useRouter();

    // Query variables
    const { electionId } = router.query;

    // State variables
    const ElectionResultLoading = WithLoadingComponent(ElectionResult);
    const [appState, setAppState] = useState({
        loading: false,
        election: null,
    });

    // Get service instance
    const electionRepository = ElectionRepository.getInstance()

    useEffect(() => {
        setAppState({ loading: true, election: null });

        const fetchData = async () => {
            try {
                const res = await electionRepository.getOne(Number(11),Number(electionId))
                const election = await ElectionMapper.getOneToElection(res)

                setAppState({ loading: false, election: election })
            } catch (error) {
                setAppState({ loading: false, election: null });
            }
        }

        fetchData()
    }, [setAppState]);

    return (
        <ElectionResultLoading isLoading={appState.loading} election={appState.election} />
    );
};

export default dashboardWrapper(ElectionResultPage);
export const getServerSideProps = withAuthServerSideProps();
