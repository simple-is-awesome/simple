import { ThemeProvider } from 'next-themes'
import 'styles/globals.css'
import 'public/css/prism-night-owl.css'
import 'public/css/APlayer.min.css'

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider attribute='class'>
			<Component {...pageProps} />	
		</ThemeProvider>
	)
}