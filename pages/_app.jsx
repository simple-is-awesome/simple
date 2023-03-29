import { ThemeProvider } from 'next-themes'
import 'styles/globals.css'
import 'public/css/prism-night-owl.css'
import { useState } from 'react'
import SearchContext from 'contexts/SearchContext'
import { useRouter } from 'next/router'


export default function App({ Component, pageProps }) {
	const router = useRouter()


	const [searchResults, setSearchResults] = useState([])
	const [searchPerformed, setSearchPerformed] = useState(false)

	const handleResetSearch = () => {
		setSearchPerformed(false)
		setSearchResults([])
		router.push('/')
	}

	return (
		<ThemeProvider attribute='class'>
			<SearchContext.Provider
				value={{
					searchResults,
					setSearchResults,
					searchPerformed,
					setSearchPerformed,
				}}
			>
				<Component
					{...pageProps}
					handleResetSearch={handleResetSearch}
				/>
			</SearchContext.Provider>
		</ThemeProvider>
	)
}