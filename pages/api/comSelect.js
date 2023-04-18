import supabase from 'utils/supabase'

const fetchCommentsFromDB = async (url) => {
	const { data, error } = await supabase
		.from('comments')
		.select('*')
		.eq('url', url)
		.order('created_at', { ascending: true })

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export default async function handler(req, res) {
	try {
		const comments = await fetchCommentsFromDB(req.headers.referer)
		res.status(200).json(comments)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
