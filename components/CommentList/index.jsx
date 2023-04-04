import { useState, useEffect } from 'react'
import Identicon from 'identicon.js'
import CryptoJS from 'crypto-js'
import Image from 'next/image'
import Date from 'components/Date'

// 生成头像
const generateIdenticon = (username) => {
	const hash = CryptoJS.MD5(username).toString()
	const data = new Identicon(hash, { size: 64, format: 'svg' }).toString()
	return `data:image/svg+xml;base64,${data}`
}

// 评论列表组件
export default function CommentList({ quoteComment, updateList}) {
	const [comments, setComments] = useState([])

	useEffect(() => {
		fetchComments()
	}, [updateList])

	async function fetchComments() {
		const res = await fetch('/api/comSelect')
		const data = await res.json()
		setComments(data)
	}

	return (
		<>
			{comments.length > 0 ? (
				<div className="comment-list space-y-4">
					{comments.map((comment) => (
						<div key={comment.id} className="comment p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col">
							<div className="flex justify-between items-center mb-2 border-b border-gray-30">
								<div className="flex items-center space-x-2">
									<Image
										src={generateIdenticon(comment.username)}
										alt={`${comment.username}'s Identicon`}
										width="32"
										height="32"
										className="rounded-full"
									/>
									<h3 className="font-bold text-lg">{comment.username}</h3>
									说：
								</div>
							</div>
							<div className="flex-1 flex flex-col">
								<div className="flex-1 flex justify-between items-center">
									<p className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: comment.content }}></p>
								</div>
								<div className="flex justify-end items-center space-x-2">
									<small><Date dateString={comment.created_at} format="h:mm A M/D/YYYY" /></small>
									<button className="text-blue-500 hover:text-blue-700" onClick={() => quoteComment(comment)}>
										Quote
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-gray-700 dark:text-gray-300">
				No comments yet. Be the first to comment!
				</p>
			)}
		</>
	)
}