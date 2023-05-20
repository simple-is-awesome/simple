import { useState } from 'react'
import CommentForm from 'components/CommentForm'
import CommentList from 'components/CommentList'

// 评论组件
export default function Comment() {
	const [quote, setQuote] = useState('')
	const [updateList, setUpdateList] = useState(false)
	const [parentCommentId, setParentCommentId] = useState(null)

	const quoteComment = (comment, commentId) => {
		// 用正则表达式去匹配和剔除<blockquote>和其内容
		const refinedContent = comment.content.replace(/<blockquote>[\s\S]*?<\/blockquote>/, '')
	
		setQuote(
		  `<blockquote><pre>引用${comment.username}的发言:</pre><p>${refinedContent}</p></blockquote><br/>\n`
		)
		setParentCommentId(commentId)
	}
	
	return (
		<>
			<h2 className="text-3xl font-bold mt-8 mb-4">留言</h2>
			<CommentList quoteComment={quoteComment} updateList={updateList} />
			<h2 className="text-3xl font-bold mt-8 mb-4">我要发表看法</h2>
			<CommentForm quote={quote} setQuote={setQuote} setUpdateList={setUpdateList} parentCommentId={parentCommentId} setParentCommentId={setParentCommentId} />
		</>
	)
}
