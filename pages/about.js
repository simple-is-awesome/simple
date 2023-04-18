import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/Layout'

// 关于页面
export default function About() {
	const { t:translate } = useTranslation('about')
	return (
		<Layout>
			<Head>
				<title>{ translate('About') }</title>
			</Head>
			<h1 className='text-center my-3'>{ translate('About') }</h1>
			<div className='container mx-auto px-4 w-3/5'>
				<p className='my-4'>
				Hello and welcome to ChatGPT! We are an advanced AI language model created by OpenAI, built on the cutting-edge GPT-4 architecture. Our mission is to assist and empower users by providing valuable information, answering questions, and engaging in thoughtful conversations.
				</p>
				<p className='my-4'>
				Our extensive knowledge base, which spans a wide range of topics, enables us to tackle diverse subjects with ease. Although our training data includes information up until September 2021, we strive to stay updated and relevant in our responses.
				</p>
				<p className='my-4'>
				Our team at OpenAI is committed to developing AI technology that is both ethical and responsible. We continuously work to improve ChatGPT, ensuring a more accurate and user-friendly experience. Your feedback is invaluable to us, as it helps us grow and adapt to your needs.
				</p>
				<p className='my-4'>
				Whether you are seeking answers, exploring new ideas, or just in need of a friendly conversation, ChatGPT is here to help. We look forward to chatting with you!
				</p>
			</div>
		</Layout>
	)
}

export async function getStaticProps({ locale }) {
	return {
		props:{
			...(await serverSideTranslations(locale, ['about'])),
		}
	}
}