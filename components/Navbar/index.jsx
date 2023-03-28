import Link from 'next/link'

export default function Navbar() {
	return (
		<nav className="bg-gray-100 p-4">
			<ul className="space-y-2">
				<li>
					<Link href="/" className="block p-2 bg-white text-blue-500 hover:text-blue-700 font-semibold rounded">
                        Home
					</Link>
				</li>
				<li>
					<Link href="/about" className="block p-2 bg-white text-blue-500 hover:text-blue-700 font-semibold rounded">
                        About
					</Link>
				</li>
			</ul>
		</nav>
	)
}
