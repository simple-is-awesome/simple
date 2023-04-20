import { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Date from 'components/Date'

// raindrop组件
export default function Raindrop() {
	const [raindropData, setraindropData] = useState([])
	const { t } = useTranslation('home')
	const raindrop = t('Raindrop')

	useEffect(() => {
		async function fetchData() {
			const res = await fetch('/api/raindrop')
			const data = await res.json()
			setraindropData(data.items.slice(0, 5))
		}
		fetchData()
	}, [])

	return (
		<div className="bg-white shadow-lg rounded-lg p-6 my-8 dark:bg-gray-600 dark:text-gray-100">
			<div className="text-2xl font-semibold mb-4">{raindrop}</div>
			<ul className="space-y-4">
				{raindropData.map((item) => (
					<li key={item.title} className="border-b border-gray-200 pb-2">
						<a
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:text-blue-800 dark:text-gray-100">
							{item.title}{' '}-{' '}
						</a>
						<Date dateString={item.pubDate} />
					</li>
				))}
			</ul>
		</div>
	)
}
