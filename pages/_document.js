import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
	return (
		<Html>
			<Head>
				<meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
				<meta name="keywords" content={process.env.NEXT_PUBLIC_SITE_KEYWORDS} />
			</Head>
			<body>
				<Main />
				<NextScript />
				<Script src="/js/APlayer.min.js" strategy="beforeInteractive" />
			</body>
		</Html>
	)
}