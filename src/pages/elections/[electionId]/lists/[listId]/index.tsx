import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import WithLoadingComponent from '@/components/loading/withComponentLoading';
import { useEffect, useState } from 'react';
import * as ListMapper from '@/data/list/api/mapper/list.mapper'
import ListDetail from './detailPage';
import { ListRepository } from '@/data/list/repository/list.repository';
import CookiesManager from '@/data/utils/cookies.manager';
import { CryptoManager } from '@/data/utils/crypto.manager';

const ListDetailPage: NextPage = () => {

    // Utils
    const router = useRouter();

    // Query variables
    const { listId, electionId } = router.query;

    // State variables
    const ElectionDetailLoading = WithLoadingComponent(ListDetail);
    const [appState, setAppState] = useState({
        loading: false,
        list: null,
        userRole: ''
    });

    // Get service instance
    const listRepository = ListRepository.getInstance()

    useEffect(() => {
        setAppState({ loading: true, list: null, userRole: '' });

        const fetchData = async () => {

            try {
                const res = await listRepository.getOne(listId as string, electionId as string)
                const list = await ListMapper.getOneToList(res)
                
                let userRole = CookiesManager.getInstance()._getRole()
                userRole = CryptoManager.getInstance().decrypt(userRole)

                setAppState({ loading: false, list: list, userRole: userRole })
            } catch (error) {
                setAppState({ loading: false, list: null, userRole: '' });
            }
        }

        fetchData()
    }, [setAppState]);

    return (
        <ElectionDetailLoading isLoading={appState.loading} list={appState.list} userRole={appState.userRole}/>
    );
};

export default dashboardWrapper(ListDetailPage);
export const getServerSideProps = withAuthServerSideProps();
