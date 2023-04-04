import { useRef } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

// 评论表单组件
export default function CommentForm() {
	const formRef = useRef()
	const turnstileRef = useRef()


	const handleSubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(formRef.current)
		const username = formData.get('username')
		const email = formData.get('email')
		const website = formData.get('website')
		const content = formData.get('content')
		const token = formData.get('cf-turnstile-response')

		const res = await fetch('/api/comment', {
			method: 'POST',
			body: JSON.stringify({ username, email, website, content, token }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (res.status === 200) {
			alert('你的留言已被接受')
			formRef.current.reset()
			turnstileRef.current.reset()
		} else if (res.status === 403) {
			alert('请完成人机验证')
		} else {
			alert('留言出现了一些错误，请稍后再试')
		}
	}

	return (
		<>
		  <form ref={formRef}
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
			  <label htmlFor="username"
					 className="block text-gray-700 text-sm font-bold mb-2">
				Username:
			  </label>
			  <input 	type="text"
						id="username"
						name="username"
						placeholder='NickName'
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
				</div>
				<div className="mb-4">
			  <label htmlFor="email"
					 className="block text-gray-700 text-sm font-bold mb-2">
				Email:
			  </label>
			  <input type="email"
					 id="email"
					 name="email"
					 placeholder='E-Mail'
					 required
					 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
				</div>
				<div className="mb-4">
			  <label htmlFor="website"
					 className="block text-gray-700 text-sm font-bold mb-2">
				Website (optional):
			  </label>
			  <input type="url"
					 id="website"
					 name="website"
					 placeholder='Website'
					 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
				</div>
				<div className="mb-4">
			  <label htmlFor="content"
					 className="block text-gray-700 text-sm font-bold mb-2">
				Comment (Support Part HTML Tag):
			  </label>
			  <textarea
						type="text"
						id="content"
						name="content"
						placeholder='Write a comment here(Fill in the email address to receive an email notification when being replied)'
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"/>
				</div>
				<div className="mb-4">
			  <Turnstile
						siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
						ref={turnstileRef}/>
				</div>
				<button
			  type="submit"
			  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
			  Submit
				</button>
		  </form>
		</>
	  )
}
