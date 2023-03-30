import { Feed } from 'feed'
import { unified } from 'unified'
import gfm from 'remark-gfm'
import remark2rehype from 'remark-rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'
import config from 'config'
import fs from 'fs'
import { getSortedPostsData } from 'lib/posts'

export default async function generateRSSFeed() {
	const allPostsData = await getSortedPostsData()
	const feed = new Feed({
		title: config.siteTitle,
		description: config.siteDescription,
		link: config.baseURL,
		language: 'zh',
		copyright: config.footer,
		author: {
			name: 'Demo Website',
			email: '',
			link: 'http://localhost:3000/',
		}
	})

	allPostsData.forEach(post => {
		const contentMarkdown = post.contentMarkdown

		const contentHtml = unified()
			.use(remarkParse)
			.use(gfm)
			.use(remark2rehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(rehypeSlug)
			.use(rehypeAutolinkHeadings)
			.use(rehypePrism)
			.use(rehypeStringify)
			.processSync(contentMarkdown)
			.toString()
		
		const date = new Date(post.date)

		const year = date.getFullYear()
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const slug = post.slug

		feed.addItem({
			title: post.title,
			description: contentHtml,
			link: `http://localhost:3000/${year}/${month}/${slug}`,
			date: date,
		})
	})

	fs.writeFileSync('public/rss.xml',feed.atom1())
}