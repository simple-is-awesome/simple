import Layout from 'components/Layout'
import Head from 'next/head'

// 404页面
export default function Custom404() {
	return (
		<Layout>
			<Head>
				<title>404</title>
			</Head>
			<div className='flex items-center justify-center'>
				<div>
					<h1 className='text-center text-6xl font-bold'>404</h1>
					<div className="text-center text-gray-600 font-semibold text-2xl">
						Oops! Page Not Found🥲🥲🥲
					</div>
				</div>
			</div>
		</Layout>
	)
}