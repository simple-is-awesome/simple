import { useRef,useEffect } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

// 评论表单组件
export default function CommentForm({quote, setQuote, setUpdateList}) {
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

		const res = await fetch('/api/comInsert', {
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
			setQuote('')
			setUpdateList((prev) => !prev)
		} else if (res.status === 403) {
			alert('请完成人机验证')
		} else {
			alert('留言出现了一些错误，请稍后再试')
		}
	}

	useEffect(() => {
		formRef.current.content.value = quote 
	  }, [quote])

	return (
		<>
		  <form ref={formRef}
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-600 dark:text-gray-100">
				<div className="mb-4">
			  <label htmlFor="username"
					 className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
				您的大名（必填）：
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
					 className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
				电子邮件（必填）：
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
					 className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
				个人网址 (选填):
			  </label>
			  <input type="url"
					 id="website"
					 name="website"
					 placeholder='Website'
					 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
				</div>
				<div className="mb-4">
			  <label htmlFor="content"
					 className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
				您的留言 (HTML标签部分可用):
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
					<Turnstile siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY} ref={turnstileRef}/>
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
