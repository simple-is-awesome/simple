import { useState } from 'react'
import { useRouter } from 'next/router'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CircularProgress from '@mui/material/CircularProgress'

// 搜索组件
export default function Search() {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(false)

	const onSearch = async (searchTerm) => {
		if (searchTerm.trim() !== '') {
			setLoading(true)
			await router.push(`/search?term=${searchTerm}`)
			setLoading(false)
		}
	}

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value)
	}

	const handleSearch = (event) => {
		if (event.key === 'Enter') {
			onSearch(searchTerm)
		}
	}

	return (
		<div className="relative w-64">
			<div className="absolute left-0 top-0 flex items-center justify-center text-gray-500 p-2">
				{loading ? <CircularProgress size={24} /> : <SearchRoundedIcon />}
			</div>
			<input
				type="text"
				className="w-full p-2 pl-10 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
				placeholder="Search"
				value={searchTerm}
				onChange={handleInputChange}
				onKeyDown={handleSearch}
				disabled={loading}/>
		</div>
	)
}
