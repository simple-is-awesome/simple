import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import config from 'config'

export default function ChatGPTSummary({ contentMarkdown, params, tags }) {
	const [summary, setSummary] = useState(null)
	const formattedTags = tags.map(tag => `#${tag}`).join(', ')
	const [isCopied, setIsCopied] = useState(false)

	useEffect(() => {
		fetch('/api/chatgpt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: `using Chinese to summary this article. The article content is: ${contentMarkdown}.
				Please summary this article within 100 chinese words.`,
			}),
		})
			.then((response) => response.json())
			.then(data => setSummary(`${data.gptResponse}`))
			.catch(error => console.error('Error fetching summary:', error))
	}, [contentMarkdown, params, tags])

	const copyText = `标签：${formattedTags}\n总结: ${summary}\nvia: ${config.baseURL}/${params.year}/${params.month}/${params.slug}`

	return (
		<div className="border border-gray-300 rounded relative">
			<h2 className="font-bold mb-2">本文总结概括</h2>
			<>
				{summary ? (
					<>
						<p className="break-words max-w-full">标签：{formattedTags}</p>
						<p className="break-words max-w-full">总结: {summary}</p>
						<p className="break-words max-w-full">via: {config.baseURL}/{params.year}/{params.month}/{params.slug} </p>
						<CopyToClipboard text={copyText} onCopy={() => setIsCopied(true)}>
							<button className="absolute top-1 right-1 bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded">
								{isCopied ? '已复制' : '复制摘要'}
							</button>
						</CopyToClipboard>
					</>
				) : (
					<p className="break-words max-w-full">ChatGPT正在为你总结信息，请稍等...</p>
				)}
			</>
		</div>
	)
}