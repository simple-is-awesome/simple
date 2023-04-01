import CommentForm from 'components/CommentForm'
import CommentList from 'components/CommentList'
import supabase from 'utils/supabase'
import { useState, useEffect } from 'react'

export default function Comment() {
	const [comments, setComments] = useState([])
	const [quote, setQuote] = useState('')

	useEffect(() => {
		fetchComments()
	}, [])

	const fetchComments = async () => {
		const { data, error } = await supabase
			.from('comments')
			.select('*')
			.eq('url', window.location.href)
			.order('created_at', { ascending: true })
		if (error) {
			console.error('Error fetching comments:', error)
		} else {
			setComments(data)
		}
	}

	const addComment = async (comment) => {
		const commentWithUrl = {
			...comment,
			url: window.location.href,
		}
		const { data, error } = await supabase
			.from('comments')
			.insert([commentWithUrl])
			.select()
		if (error) {
			console.error('Error inserting comment:', error)
		} else {
			setComments([...comments, data[0]])
		}
	}

	const quoteComment = (comment) => {
		setQuote(`引用${comment.username}的发言:<br/>${comment.content}<br/>`)
	}

	  return (
		<>
		  <CommentForm onSubmit={addComment} quote={quote} onQuoteCleared={setQuote} />
		  <h2 className="text-3xl font-bold mt-8 mb-4">Comments</h2>
		  <CommentList comments={comments} onQuote={quoteComment} />
		</>
	  )
}
