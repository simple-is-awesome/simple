import React from 'react'

export default function CommentForm ({ onSubmit }) {
	const [username, setUsername] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [website, setWebsite] = React.useState('')
	const [content, setContent] = React.useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit({ username, email, website, content })
	}

	return (
		<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="username"
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="email"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
          Website (optional)
				</label>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="website"
					type="url"
					placeholder="Website"
					value={website}
					onChange={(e) => setWebsite(e.target.value)}
				/>
			</div>
			<div className="mb-6">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
          Comment
				</label>
				<textarea
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
					id="content"
					placeholder="Enter your comment here..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					required
				></textarea>
			</div>
			<div className="flex items-center justify-end">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
				</button>
			</div>
		</form>
	)
}
