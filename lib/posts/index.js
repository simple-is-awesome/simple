import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import remark2rehype from 'remark-rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'

const postsDirectory = path.join(process.cwd(), 'posts')

// 获取排序后的文章数据
export function getSortedPostsData() {
	const fileNames = fs.readdirSync(postsDirectory)
	const allPostsData = fileNames.map(fileName => {
		const id = fileName.replace(/\.mdx?$/, '')
		const fullPath = path.join(postsDirectory, fileName)
		const fileContents = fs.readFileSync(fullPath, 'utf8')
		const matterResult = matter(fileContents)
		return {
			id,
			date: matterResult.data.date,
			summary: matterResult.data.summary,
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

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory)
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.mdx?$/, ''),
			},
		}
	})
}

// 根据id获取文章数据
export async function getPostData(id) {
	const fileNames = fs.readdirSync(postsDirectory)
	const matchedFile = fileNames.find((file) => file.replace(/\.mdx?$/, '') === id)
	const fullPath = path.join(postsDirectory, matchedFile)
	const fileContents = fs.readFileSync(fullPath, 'utf8')
	const matterResult = matter(fileContents)
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content)
	const contentHtml = processedContent.toString()
	return {
		id,
		contentHtml,
		...matterResult.data,
	}
}

// 获取所有文章的元数据
export function getAllPostMetadata() {
	const fileNames = fs.readdirSync(postsDirectory)
	const allPostMetadata = fileNames.map((fileName) => {
		const fullPath = path.join(postsDirectory, fileName)
		const fileContents = fs.readFileSync(fullPath, 'utf8')
		const matterResult = matter(fileContents)

		const date = new Date(matterResult.data.date)
		const year = date.getFullYear()
		const month = date.getMonth() + 1

		return {
			year,
			month,
			slug: matterResult.data.slug,
			filename: fileName,
		}
	})

	return allPostMetadata
}

// 根据参数获取文件名
export function getPostFilenameByParams(year, month, slug) {
	const allPostMetadata = getAllPostMetadata()

	const matchingPost = allPostMetadata.find(
		(post) =>
			post.year.toString() === year &&
      post.month.toString().padStart(2, '0') === month &&
      post.slug === slug
	)

	if (matchingPost) {
		return matchingPost.filename
	}

	return null
}

// 根据文件名获取文章数据
export async function getPostDataByFileName(year, month, slug) {
	const filename = getPostFilenameByParams(year, month, slug)
	if (!filename) {
		return null
	}
	const fullPath = path.join(postsDirectory, filename)
	const fileContents = fs.readFileSync(fullPath, 'utf8')

	const matterResult = matter(fileContents)

	const tags = matterResult.data.tags

	const showtoc = matterResult.data.showtoc === undefined ? false : matterResult.data.showtoc

	// 使用 remark 和 rehype 处理内容
	const contentHtml = await unified()
		.use(remarkParse)
		.use(gfm)
		.use(remark2rehype)
		.use(rehypeStringify)
		.use(rehypePrism)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings)
		.process(matterResult.content)
		.then((processedContent) => processedContent.toString())

	return {
		year,
		month,
		tags,
		slug,
		showtoc,
		contentHtml,
		contentMarkdown: matterResult.content,
		...matterResult.data,
	}
}
