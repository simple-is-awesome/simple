import React,{useEffect} from 'react'

export default function CommentForm ({ onSubmit, quote, onQuoteCleared }) {
	const [username, setUsername] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [website, setWebsite] = React.useState('')
	const [content, setContent] = React.useState('')
	const [showModal, setShowModal] = React.useState(false)
	const [isQuoteCleared, setIsQuoteCleared] = React.useState(false)

	useEffect(() => {
		if (quote) {
		  setContent((prevContent) => prevContent + quote)
		  setIsQuoteCleared(true)
		}
	  }, [quote])
	
	  useEffect(() => {
		if (isQuoteCleared) {
		  onQuoteCleared('')
		  setIsQuoteCleared(false)
		}
	  }, [isQuoteCleared, onQuoteCleared])

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit({ username, email, website, content })
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	return (
		<>
			{showModal && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen">
						<div
							className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
							onClick={handleCloseModal}
						></div>

						<div className="bg-white rounded-lg w-3/4 max-w-md p-8 text-left overflow-hidden shadow-xl transform transition-all dark:bg-gray-600 dark:text-gray-100">
							<div className="text-center">
								<h3 className="text-lg font-bold">提示</h3>
								<p className="mt-3 text-sm">你的留言已被接受</p>
							</div>
							<div className="mt-5 flex justify-center">
								<button
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									onClick={handleCloseModal}
								>
            确定
								</button>
							</div>
						</div>
					</div>
				</div>
			)}




			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-500">
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
						id="website"
						type="url"
						placeholder="Website"
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
          Comment(Support Part HTML Tag)
					</label>
					<textarea
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 dark:text-white"
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
		</>
	)
}
