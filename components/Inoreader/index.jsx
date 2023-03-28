import { useState, useEffect } from 'react'
import Date from 'components/Date'

export default function Inoreader() {
	const [inoreaderData, setInoreaderData] = useState([])

	useEffect(() => {
		async function fetchData() {
			const res = await fetch('/api/inoreader')
			const data = await res.json()
			setInoreaderData(data.items)
		}
		fetchData()
	}, [])

	return (
		<div className="bg-white shadow-lg rounded-lg p-6 my-8">
			<div className="text-2xl font-semibold mb-4">阅读分享</div>
			<ul className="space-y-4">
				{inoreaderData.map((item) => (
					<li key={item.id} className="border-b border-gray-200 pb-2">
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:text-blue-800"
						>
							{item.title}{' '}-{' '}
						</a>
						<Date dateString={item.date_published} />
					</li>
				))}
			</ul>
		</div>
	)
}
