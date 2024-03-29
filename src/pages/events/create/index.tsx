import { Box, FormControl, FormLabel, Input } from '@chakra-ui/core';
import React, { useState } from 'react';

import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';

import { NextPage } from 'next';
import EventCreateForm from './createEventForm';

const CreateEventPage: NextPage = () => {
	const router = useRouter();
	const [] = useState(new Date());

	return (
		<Box>
			<PageTitle
				title='Crear votación'
				description='En esta sección se podrá crear un evento.'
				onBackClick={() => router.push('/events/')}
				enableBackIcon
				disableInfoIcon
			/>

			<EventCreateForm />
		</Box>
	);
};

export default dashboardWrapper(CreateEventPage);
export const getServerSideProps = withAuthServerSideProps();
