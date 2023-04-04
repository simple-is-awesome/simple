// 获取最新的 5 条广播
export default async function handler(req, res) {
	const response = await fetch('https://www.inoreader.com/stream/user/1005341682/tag/user-broadcasted/view/json')
	const data = await response.json()
	const latestItems = data.items.slice(0, 5)
	res.status(200).json({ ...data, items: latestItems })
}
  