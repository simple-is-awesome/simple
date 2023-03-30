import { useEffect, useState } from 'react'

export default function RssPage() {
	const [rssContent, setRssContent] = useState(null)

	useEffect(() => {
		fetch('/api/rss')
			.then((response) => response.text())
			.then((data) => {
				setRssContent(data)
			})
	}, [])

	return (
		<div>
			{rssContent ? (
				<pre>
					<code>{rssContent}</code>
				</pre>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}
