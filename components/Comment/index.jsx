import { useState } from 'react'
import CommentForm from 'components/CommentForm'
import CommentList from 'components/CommentList'

// 评论组件
export default function Comment() {
	const [quote, setQuote] = useState('')
	const [updateList, setUpdateList] = useState(false)

	const quoteComment = (comment) => {
		setQuote(`<blockquote>${comment.username}的发言:<br/>${comment.content}</blockquote><br/>`)
	}

	return (
		<>
			<h2 className="text-3xl font-bold mt-8 mb-4">留言</h2>
			<CommentList quoteComment={quoteComment} updateList={updateList} />
			<h2 className="text-3xl font-bold mt-8 mb-4">我要发表看法</h2>
			<CommentForm quote={quote} setQuote={setQuote} setUpdateList={setUpdateList} />
		</>
	)
}
