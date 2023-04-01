import Identicon from 'identicon.js'
import CryptoJS from 'crypto-js'
import Image from 'next/image'
import Date from 'components/Date'

export default function CommentList({ comments}) {

	const generateIdenticon = (username) => {
		const hash = CryptoJS.MD5(username).toString()
		const data = new Identicon(hash, { size: 64, format: 'svg' }).toString()
		return `data:image/svg+xml;base64,${data}`
	}

	return (
		<>
			{comments.length > 0 ? (
				<div className="comment-list space-y-4">
					{comments.map((comment, index) => (
						<div
							key={index}
							className="comment p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col"
						>
							<div className="flex justify-between items-center mb-2 border-b border-gray-30">
								<div className="flex items-center space-x-2">
									<h3 className="font-bold text-lg">{comment.username}</h3>
									<Image
										src={generateIdenticon(comment.username)}
										alt={`${comment.username}'s Identicon`}
										width="32"
										height="32"
										className="rounded-full"
									/>
									<Date dateString={comment.created_at} format="h:mm A M/D/YYYY"/>
								</div>
							</div>
							<div className="flex-1">
								<p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
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
