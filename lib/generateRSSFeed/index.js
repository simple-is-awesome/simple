import fs from 'fs'
import { Feed } from 'feed'
import { unified } from 'unified'
import gfm from 'remark-gfm'
import remark2rehype from 'remark-rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'

export default async function generateRSSFeed(allPostsData) {
	const feed = new Feed({
		title: process.env.NEXT_PUBLIC_SITE_TITLE,
		description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
		link: process.env.NEXT_PUBLIC_SITE_URL,
		language: 'zh',
		copyright: process.env.NEXT_PUBLIC_FOOTER,
		author: {
			name: process.env.NEXT_PUBLIC_SITE_TITLE,
			link: process.env.NEXT_PUBLIC_SITE_URL,
		}
	})

	allPostsData.forEach(post => {
		const contentMarkdown = post.contentMarkdown

		const contentHtml = unified()
			.use(remarkParse)
			.use(gfm)
			.use(remark2rehype, { allowDangerousHtml: true })
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
			link: `${process.env.NEXT_PUBLIC_SITE_URL}/${year}/${month}/${slug}`,
			date: date,
		})
	})

	fs.writeFileSync('public/rss.xml',feed.atom1())
}