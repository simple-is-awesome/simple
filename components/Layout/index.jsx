import Head from 'next/head'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ChatGPT from 'components/ChatGPT'

export default function Layout({ children }) {
	return (
		<div className="container mx-auto flex flex-col min-h-screen">
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="text-lg font-sans antialiased font-normal grid grid-cols-5 gap-4 my-3 flex-grow">
				<div className="col-span-1">
					<ChatGPT />
				</div>
				<div className="col-span-4 mx-10">
					{children}
				</div>
			</main>
			<Footer />
		</div>
	)
}
