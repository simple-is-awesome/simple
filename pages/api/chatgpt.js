import { Configuration, OpenAIApi } from 'openai'

// Create an instance of the OpenAI API
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
	organization: process.env.OPENAI_ORG_ID,
})

const openai = new OpenAIApi(configuration)

// Create a completion
export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { message } = req.body

		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [{
				role: 'user',
				content: message,
			}],
		})
		const gptResponse = completion.data.choices[0].message.content
		res.status(200).json({ gptResponse })
	}
}
