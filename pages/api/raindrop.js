import Parser from 'rss-parser'
import config from 'config'

// 获取raindrop书签rss转json数据
export default async function handler(req, res) {
	const parser = new Parser()
	const feed = await parser.parseURL(config.raindrop)
	res.status(200).json(feed)
}