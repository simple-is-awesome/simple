export default function TagCloud({ tags }) {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 my-8">
			<h2 className="text-2xl font-semibold mb-4">标签云</h2>
			<div className="flex flex-wrap">
				{tags.map((tag, index) => (
					<span
						key={index}
						className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold m-2 cursor-pointer hover:bg-blue-600"
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	)
}
