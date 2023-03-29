// pages/api/search.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

function getSortedPostsData() {
	const fileNames = fs.readdirSync(postsDirectory)
	const allPostsData = fileNames.map(fileName => {
		const id = fileName.replace(/\.mdx?$/, '')
		const fullPath = path.join(postsDirectory, fileName)
		const fileContents = fs.readFileSync(fullPath, 'utf8')
		const matterResult = matter(fileContents)
		return {
			id,
			date: matterResult.data.date,
			tags: matterResult.data.tags,
			summary: matterResult.data.summary,
			contentMarkdown: matterResult.content,
			...matterResult.data
		}
	})
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1
		} else {
			return -1
		}
	})
}

function getPostsListBySearchTerm(searchTerm) {
	const allPostsData = getSortedPostsData()
	const filteredPosts = allPostsData.filter((post) =>
		post.contentMarkdown.includes(searchTerm) ||
        post.title.includes(searchTerm) ||
        post.summary.includes(searchTerm) ||
        post.tags.some((tag) => tag.includes(searchTerm))
	)

	return filteredPosts.map((post) => {
		const { title, slug, date, summary } = post
		const year = new Date(date).getFullYear()
		const month = new Date(date).getMonth() + 1

		return {
			title,
			year,
			month,
			slug,
			date,
			summary
		}
	})
}



const handler = async (req, res) => {
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
  
export default handler