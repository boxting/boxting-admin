import { Box, FormControl, FormLabel, Input } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';
import CodesList from './codesList'

import { NextPage } from 'next';
import Axios from 'axios';
import WithLoadingComponent from '@/components/loading/withComponentLoading';

const CodesEventPage: NextPage = (props) => {
  const pageRouter = useRouter();

  const event = props.router.query;

  const CodesListLoading = WithLoadingComponent(CodesList);
  const [appState, setAppState] = useState({
    loading: false,
    codes: null,
  });

  useEffect(() => {
    setAppState({ loading: true, codes: null });
    const token = Cookies.get('token');

    const apiUrl = `https://blockchain-voting.herokuapp.com/accesscodes/token/event/${event.id}/get/all`;

    Axios
      .get(apiUrl, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        const codesResponse = response.data;
        setAppState({ loading: false, codes: codesResponse });
      })
      .catch((e) => {
        setAppState({ loading: false, codes: null });
      });
  }, [setAppState]);

  return (
    <Box>
      <PageTitle
        title="Configurar códigos de acceso"
        description="En esta sección se podrá gestionar los códigos de acceso de votación individuales para los usuarios votantes."
        onBackClick={() => pageRouter.back()}
        enableBackIcon
      />

      <CodesListLoading isLoading={appState.loading} codes={appState.codes} eventId={event.id}/>
    </Box>
    
  );
};

export default dashboardWrapper(withRouter(CodesEventPage));
export const getServerSideProps = withAuthServerSideProps();
