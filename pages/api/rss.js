import { getSortedPostsData } from 'lib/posts'
import generateRSSFeed from 'lib/generateRSSFeed'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const allPostsData = getSortedPostsData()
		const rss = generateRSSFeed({ allPostsData })

		res.setHeader('Content-Type', 'application/rss+xml')
		res.write(rss)
		res.end()
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
