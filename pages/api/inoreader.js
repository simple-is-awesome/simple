// 获取最新的 5 条广播
export default async function handler(req, res) {
	const response = await fetch(process.env.NEXT_PUBLIC_INOREADER_CHANNEL)
	const data = await response.json()
	const latestItems = data.items.slice(0, 5)
	res.status(200).json({ ...data, items: latestItems })
}
  