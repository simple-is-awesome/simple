import Parser from 'rss-parser'

// 获取raindrop书签rss转json数据
export default async function handler(req, res) {
	const parser = new Parser()
	const feed = await parser.parseURL(process.env.NEXT_PUBLIC_RAINDROP)
	res.status(200).json(feed)
}