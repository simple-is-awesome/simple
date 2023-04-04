import config from 'config'

// 获取最新的 5 条广播
export default async function handler(req, res) {
	const response = await fetch(config.inoreaderChannel)
	const data = await response.json()
	const latestItems = data.items.slice(0, 5)
	res.status(200).json({ ...data, items: latestItems })
}
  