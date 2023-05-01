import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import Layout from 'components/Layout'

// 关于页面
export default function About() {
	const { t } = useTranslation('about')
	const about = t('About')
	return (
		<Layout>
			<Head>
				<title>{about}</title>
			</Head>
			<h1 className='text-center my-3'>{about}</h1>
			<div className='container mx-auto px-4 w-3/5'>
				<p className='my-4'>
					This is an about page.
				</p>
			</div>
		</Layout>
	)
}