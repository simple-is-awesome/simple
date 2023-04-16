import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import ImageIcon from '@mui/icons-material/Image'
import RssFeedIcon from '@mui/icons-material/RssFeed'

export default function Navbar({RenderThemeChanger}) {
	return (
		<div className="col-span-3">
			<nav>
				<ul className="flex items-center space-x-4 font-medium">
					<li>
						<Link href="/" className="flex items-center dark:text-gray-100">
							<HomeIcon /><span>Home</span>
						</Link>
					</li>
					<li>
						<Link href="/about" className="flex items-center dark:text-gray-100">
							<InfoIcon /><span>About</span>
						</Link>
					</li>
					<li>
						<Link href="/gallery" className="flex items-center dark:text-gray-100">
							<ImageIcon /><span>Gallery</span>
						</Link>
					</li>
					<li>
						<Link href="/rss.xml" className="flex items-center dark:text-gray-100">
							<RssFeedIcon /><span>RSS</span>
						</Link>
					</li>
					<li>{RenderThemeChanger()}</li>
				</ul>
			</nav>
		</div>
	)
}
