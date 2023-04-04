import CommentForm from 'components/CommentForm'
import CommentList from 'components/CommentList'

// 评论组件
export default function Comment() {
	  return (
		<>
		  <CommentForm  />
		  <h2 className="text-3xl font-bold mt-8 mb-4">Comments</h2>
		  <CommentList  />
		</>
	  )
}
