import CommentForm from 'components/CommentForm'
import CommentList from 'components/CommentList'
import supabase from 'utils/supabase'
import { useState, useEffect } from 'react'

export default function Comment() {

	const [comments, setComments] = useState([])

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
		const { data, error }=await supabase
		  .from('comments')
			.insert([commentWithUrl])
			.select()
		if (error) {
			console.error('Error inserting comment:', error)
		} else {
			setComments([...comments, data[0]])
		}
	}

	return (
		<>
			<CommentForm onSubmit={addComment} />
			<h2 className="text-3xl font-bold mt-8 mb-4">Comments</h2>
			<CommentList comments={comments} />
		</>
	)
}
