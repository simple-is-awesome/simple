export default async function handler(req, res) {
	const response = await fetch('https://www.inoreader.com/stream/user/1005341682/tag/user-broadcasted/view/json')
	const data = await response.json()
	// 仅保留最新的 5 条数据
	const latestItems = data.items.slice(0, 5)
	// 返回修改后的数据
	res.status(200).json({ ...data, items: latestItems })
}
  