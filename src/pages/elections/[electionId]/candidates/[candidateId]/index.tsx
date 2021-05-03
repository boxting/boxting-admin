import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import WithLoadingComponent from '@/components/loading/withComponentLoading';
import { useEffect, useState } from 'react';
import * as CandidateMapper from '@/data/candidate/api/mapper/candidate.mapper'
import CandidateDetail from './detailPage';
import { CandidateRepository } from '@/data/candidate/repository/candidate.repository';
import { CryptoManager } from '@/data/utils/crypto.manager';
import CookiesManager from '@/data/utils/cookies.manager';

const CandidateDetailPage: NextPage = () => {

    // Utils
    const router = useRouter();

    // Query variables
    const { candidateId, electionId } = router.query;

    // State variables
    const CandidateDetailLoading = WithLoadingComponent(CandidateDetail);

    const [appState, setAppState] = useState({
        loading: false,
        candidate: null,
        userRole: ''
    });

    // Get service instance
    const candidateRepository = CandidateRepository.getInstance()

    useEffect(() => {
        setAppState({ loading: true, candidate: null, userRole: ''});

        const fetchData = async () => {

            try {
                const res = await candidateRepository.getOneByElection(candidateId as string, electionId as string)
                const candidate = await CandidateMapper.getOneToCandidate(res)
                
                let userRole = CookiesManager.getInstance()._getRole()
                userRole = CryptoManager.getInstance().decrypt(userRole)

                setAppState({ loading: false, candidate: candidate, userRole: userRole })
            } catch (error) {
                setAppState({ loading: false, candidate: null, userRole: ''});
            }
        }

        fetchData()
    }, [setAppState]);

    return (
        <CandidateDetailLoading isLoading={appState.loading} candidate={appState.candidate} userRole={appState.userRole}/>
    );
};

export default dashboardWrapper(CandidateDetailPage);
export const getServerSideProps = withAuthServerSideProps();
