import Link from 'next/link'
import { useTheme } from 'next-themes'
import Search from 'components/Search'
import config from 'config'

export default function Header({handleResetSearch}) {
	const RenderThemeChanger = () => {
		const { theme, systemTheme, setTheme } = useTheme()
		const currentTheme = theme === 'system' ? systemTheme : theme
		if (currentTheme === 'dark') {
			return (
				<button className='bg-gray-300 p-2 rounder-md hover:ring-2 hover:ring-gray-300 dark:bg-gray-600' onClick={() => setTheme('light')}>
					<svg svg="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
						<path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
					</svg>
				</button>
			)
		} else {
			return (
				<button className='bg-gray-300 p-2 rounder-md hover:ring-2 hover:ring-gray-300 dark:bg-gray-600' onClick={() => setTheme('dark')}>
					<svg svg="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" >
						<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
					</svg >
				</button >
			)
		}
	}

	return (
		<header className="flex justify-between items-center border-b border-gray-30 py-3">
			<div className="grid grid-cols-12 gap-8 px-5 w-full">
				<div className="col-span-2">
				</div>
				<div className="hidden lg:col-span-7 lg:flex justify-between space-x-4">
					<div className="text-2xl">
						<Link href="/" onClick={handleResetSearch}>{config.siteTitle}</Link>
					</div>
					<Search handleResetSearch={handleResetSearch} />
				</div>
				<div className="col-span-3">
					<nav>
						<ul className="flex items-center space-x-4 font-medium">
							<li>
								<Link href="/">Home</Link>
							</li>
							<li>
								<Link href="/about">About</Link>
							</li>
							<li>
								<Link href="/gallery">Gallery</Link>
							</li>
							<li>
								<Link href="/rss">RSS</Link>
							</li>
							<li>{RenderThemeChanger()}</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}
