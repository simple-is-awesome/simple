import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import config from 'config'

export default function ChatGPTSummary({ contentMarkdown, params, tags }) {
	const [showCopyButton, setShowCopyButton] = useState(false)
	const [summary, setSummary] = useState(null)
	const formattedTags = tags.map(tag => `#${tag}`).join(', ')
	const [isCopied, setIsCopied] = useState(false)
	const [isFetching, setIsFetching] = useState(false)

	const fetchSummary = () => {
		setIsFetching(true)
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
			.then(data => {
				setSummary(`${data.gptResponse}`)
				setIsFetching(false)
				setShowCopyButton(true)
			})
			.catch(error => {
				console.error('Error fetching summary:', error)
				setIsFetching(false)
			})
	}

	const copyText = `标签：${formattedTags}\n总结: ${summary}\nvia: ${config.baseURL}/${params.year}/${params.month}/${params.slug}`

	return (
		<div className="border border-gray-300 rounded relative">
			<div className="font-bold mb-2 text-center">文章摘要生成器</div>
			<>
				{summary ? (
					<div className='bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border'>
						<p className="break-words max-w-full">标签：{formattedTags}</p>
						<p className="break-words max-w-full">总结: {summary}</p>
						<p className="break-words max-w-full">via: {config.baseURL}/{params.year}/{params.month}/{params.slug} </p>
					</div>
				) : (
					<p className="break-words max-w-full text-center">{isFetching ? 'ChatGPT正在为你总结信息，请稍等...' : '点击下方按钮生成本文摘要'}</p>
				)}
				<div className="flex justify-center items-center">
					{showCopyButton ? (
						<CopyToClipboard text={copyText} onCopy={() => setIsCopied(true)}>
							<button className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded mt-2">
								{isCopied ? '已复制' : '复制摘要'}
							</button>
						</CopyToClipboard>
					) : (
						<button
							className="bg-black hover:bg-gray-700 text-white text-xs font-bold py-1 px-2 rounded mt-2"
							onClick={fetchSummary}
							disabled={isFetching}
						>
							生成摘要
						</button>
					)}
				</div>
			</>
		</div>
	)
}	  