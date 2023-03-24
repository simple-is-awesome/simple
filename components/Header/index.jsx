import Link from 'next/link'
import config from 'config'

export default function Header() {
	return (
		<header className="flex justify-between items-center border-b border-gray-300 py-3">
			<div className="text-2xl"><Link href='/'>{config.siteTitle}</Link></div>
			<nav>
				<ul className="flex items-center space-x-4 font-medium">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/about">About</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
