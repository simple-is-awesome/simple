import Head from 'next/head'
import GithubCorner from 'react-github-corner'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ScrollToTop from 'components/ScrollToTop'
import config from 'config'

// 页面布局
export default function Layout({ children, handleResetSearch}) {
	return (
		<>
			<div className="container mx-auto flex flex-col min-h-screen">
				<Head>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Header handleResetSearch={handleResetSearch} />

				<main className="text-lg font-sans antialiased font-normal flex-grow p-3">
					{children}
				</main>

				<Footer />

				<GithubCorner href={config.githubRepo} className='hidden md:block'/>
			</div>
			<ScrollToTop />
		</>
	)
}
