import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import WithLoadingComponent from '@/components/loading/withComponentLoading';
import { useEffect, useState } from 'react';
import ElectionResult from './detailPage';
import { ElectionRepository } from '@/data/election/repository/elections.repository';

const ElectionResultPage: NextPage = () => {

    // Utils
    const router = useRouter();

    // Query variables
    const { electionId } = router.query;

    // State variables
    const ElectionResultLoading = WithLoadingComponent(ElectionResult);

    const [appState, setAppState] = useState({
        loading: false,
        results: undefined
    });

    // Get service instance
    const electionRepository = ElectionRepository.getInstance()

    useEffect(() => {
        setAppState({ loading: true, results: undefined });

        const fetchData = async () => {
            try {
                const res = await electionRepository.getResults(Number(electionId))

                setAppState({ loading: false, results: res.data })
            } catch (error) {
                setAppState({ loading: false, results: undefined });
            }
        }

        fetchData()
    }, [setAppState]);

    return (
        <ElectionResultLoading isLoading={appState.loading} results={appState.results} />
    );
};

export default dashboardWrapper(ElectionResultPage);
export const getServerSideProps = withAuthServerSideProps();
