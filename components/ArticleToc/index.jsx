import { useState } from 'react'
import parseHeading from 'lib/parseHeading'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

// 文章目录组件
export default function Sidebar({ contentMarkdown, showtoc }) {
	const [expanded, setExpanded] = useState(true)
	const headings = parseHeading(contentMarkdown)

	const toggleSidebar = () => {
		setExpanded(!expanded)
	}

	const bulletStyle = (depth) => {
		if (depth === 2) {
			return '●'
		}
		if (depth === 3) {
			return '○'
		}
		return ''
	}

	return (
		<>
			{showtoc && (
				<nav className="sticky top-1/4 p-5 bg-gray-300 shadow-lg rounded-md dark:text-gray-900">
					<div className="flex items-center mb-4 cursor-pointer" onClick={toggleSidebar}>
						{expanded ? (
							<PlayArrowIcon className="transform rotate-90 text-gray-500" />
						) : (
							<PlayArrowIcon className="text-gray-500" />
						)}
						<button
							className="font-semibold text-lg ml-2"

						>
							Table Of Contents
						</button>
					</div>
					{expanded && (
						<ul className="w-full">
							{headings.map((heading, index) => (
								<li
									key={index}
									className={`level-${heading.depth} text-left pl-4 py-1`}
								>
									<span className="mr-2">{bulletStyle(heading.depth)}</span>
									<a href={`#${heading.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
										{heading.value}
									</a>
								</li>
							))}
						</ul>
					)}
				</nav>
			)}

		</>
	)
}
