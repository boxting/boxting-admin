import { Box } from '@chakra-ui/core';
import React from 'react';
import dashboardWrapper from '@/utils/dashboard-wrapper';
import withAuthServerSideProps from '@/utils/auth-middleware';
import PageTitle from '@/components/pageTitle';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import ElectionCreateForm from './createElectionForm';

const CreateEventPage: NextPage = () => {
	const router = useRouter();

	const eventId = router.query.eventId as string
	console.log('evento ', eventId)
	return (
		<Box>
			<PageTitle
				title='Crear actividad de elección'
				description='En esta sección se podrá crear una actividad de elección.'
				onBackClick={() => router.push(
					{
						pathname: '/elections/',
						query: { eventId: eventId }
					}, '/elections/'
				)}
				enableBackIcon
			/>

			<ElectionCreateForm eventId={eventId} />
		</Box>
	);
};

export default dashboardWrapper(CreateEventPage);
export const getServerSideProps = withAuthServerSideProps();
