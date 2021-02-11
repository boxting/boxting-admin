import { Box } from '@chakra-ui/core';
import React, { useState } from 'react';

import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';

import { NextPage } from 'next';
import ListCreateForm from './createListForm';

const CreateListPage: NextPage = () => {
	const router = useRouter();

	const { electionId } = router.query

	return (
		<Box>
			<PageTitle
				title='Crear lista de candidatos'
				description='En esta sección se podrá crear una nueva lista de candidatos.'
				onBackClick={() => router.back()}
				enableBackIcon
			/>

			<ListCreateForm electionId={electionId as string}/>
		</Box>
	);
};

export default dashboardWrapper(CreateListPage);
export const getServerSideProps = withAuthServerSideProps();
