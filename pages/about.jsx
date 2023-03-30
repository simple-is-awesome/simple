import Layout from 'components/Layout'
import Head from 'next/head'

export default function About() {
	return (
		<Layout>
			<Head>
				<title>About</title>
			</Head>
			<h1 className='text-center my-3'>About</h1>
			<div className='flex justify-center items-center mx-auto'>
				Hello, my name is xxx. I am xxx, currently studying at xxx.<br/>
				
				My major is xxx. I aspire to become a xxx.
			</div>
		</Layout>
	)
}