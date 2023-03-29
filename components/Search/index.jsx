import { useState, useContext } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import SearchContext from 'contexts/SearchContext'

export default function Search({ handleResetSearch }) {

	const {
		setSearchResults,
		setSearchPerformed,
	} = useContext(SearchContext)

	const [searchTerm, setSearchTerm] = useState('')

	const onSearch = async (searchTerm) => {
		if (searchTerm.trim() === '') {
			setSearchResults([])
			setSearchPerformed(false)
		} else {
			const response = await fetch(`/api/search?term=${searchTerm}`)
			const { posts } = await response.json()
			setSearchResults(posts)
			setSearchPerformed(true)
		}
	}

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value)
	}

	const handleSearch = (event) => {
		if (event.key === 'Enter') {
			onSearch(searchTerm)
			if (handleResetSearch) {
				handleResetSearch()
			}
		}
	}

	return (
		<div className="relative w-64">
			<input
				type="text"
				className="w-full p-2 pl-10 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
				placeholder="搜索博客..."
				value={searchTerm}
				onChange={handleInputChange}
				onKeyDown={handleSearch}
			/>
			<div className="absolute left-0 top-0 flex items-center justify-center text-gray-500 p-2">
				<SearchRoundedIcon />
			</div>
		</div>
	)
}
