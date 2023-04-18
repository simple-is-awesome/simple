import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
import 'styles/globals.css'
import 'public/css/prism-night-owl.css'

export default appWithTranslation(({ Component, pageProps }) => (
	<ThemeProvider attribute='class'>
		<Component {...pageProps} />
	</ThemeProvider>
))
