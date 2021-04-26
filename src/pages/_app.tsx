import React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/core'
import boxtingTheme from '@/theme/theme'

import '@/components/datepicker/date-picker.css'
import 'react-datepicker/dist/react-datepicker.css'
import Head from 'next/head'

const BoxtingApp = ({ Component, pageProps }: AppProps): JSX.Element => (
	<ChakraProvider theme={boxtingTheme}>
		<Head>
			<title>Boxting</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Component {...pageProps} />
	</ChakraProvider>
)

export default BoxtingApp
