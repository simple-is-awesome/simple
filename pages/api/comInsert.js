import supabase from 'utils/supabase'

export default async function handler(req, res) {
	const { username, email, website, content, token } = req.body
	
	const refererUrl = new URL(req.headers.referer)

	const cleanUrl = `${refererUrl.origin}${refererUrl.pathname}`

	const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
	const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY

	const result = await fetch(verifyEndpoint, {
		method: 'POST',
		body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	})

	const data = await result.json()
	if (!data.success) {
		return res.status(403).json({ error: 'Invalid token' })
	} else {
		const { data: insertedData, error } = await supabase
			.from('comments')
			.insert([
				{ username: username, email: email, website: website, content: content,url: cleanUrl },
			])
			.select()

		if (error) {
			return res.status(500).json({ error: error.message })
		}
		res.status(200).json(insertedData)
	}
}
