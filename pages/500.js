import Head from 'next/head'
import Layout from 'components/Layout'

export default function Custom500() {
	return (
		<Layout>
			<Head>
				<title>500</title>
			</Head>
			<h1>500 - Server-side error occurred</h1>
		</Layout>
	)
}