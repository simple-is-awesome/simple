import { getPostsListBySearchTerm } from 'lib/posts'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			const { term } = req.query
			const posts = getPostsListBySearchTerm(term)
			res.status(200).json({ posts })
		} catch (error) {
			res.status(500).json({ error: '服务器错误，请稍后重试' })
		}
	} else {
		res.status(405).json({ error: '请求方法不允许' })
	}
}