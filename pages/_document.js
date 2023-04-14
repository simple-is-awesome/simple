import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta name="description" content="This is a blog demo built with Next.js." />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}