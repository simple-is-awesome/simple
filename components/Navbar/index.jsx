import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import ImageIcon from '@mui/icons-material/Image'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import MenuIcon from '@mui/icons-material/Menu'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import TranslateIcon from '@mui/icons-material/Translate'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Navbar({ RenderThemeChanger }) {
	const [moreMenuVisible, setMoreMenuVisible] = useState(false)
	const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
	const [translateMenuVisible, setTranslateMenuVisible] = useState(false)

	const supportedLocales = {
		zh: '简体中文',
		en: 'English',
	}

	const router = useRouter()
	const activeLocale = router.locale

	const sortedLocales = Object.entries(supportedLocales).sort(([localeA], [localeB]) => {
		if (localeA === activeLocale) return -1
		if (localeB === activeLocale) return 1
		return 0
	})

	const handleTranslateMenuClick = () => {
		setTranslateMenuVisible(!translateMenuVisible)
	}
	
	const handleMoreMenuClick = () => {
		setMoreMenuVisible(!moreMenuVisible)
	}
	
	const handleMobileMenuClick = () => {
		setMobileMenuVisible(!mobileMenuVisible)
	}


	return (
		<div className="col-span-3">
			<nav>
				<ul className="flex items-center space-x-4 font-medium">
					<li className="hidden md:block">
						<Link href="/" className="flex items-center dark:text-gray-100">
							<HomeIcon />
							<span>Home</span>
						</Link>
					</li>
					<li className="hidden md:block">
						<Link href="/about" className="flex items-center dark:text-gray-100">
							<InfoIcon />
							<span>About</span>
						</Link>
					</li>
					<li className="hidden md:block">
						<Link href="/gallery" className="flex items-center dark:text-gray-100">
							<ImageIcon />
							<span>Gallery</span>
						</Link>
					</li>
					<li className="hidden md:block">
						<Link href="/rss.xml" className="flex items-center dark:text-gray-100">
							<RssFeedIcon />
							<span>RSS</span>
						</Link>
					</li>
					<li className="hidden xl:block relative">
						<button
							onClick={handleTranslateMenuClick}
							aria-expanded={translateMenuVisible ? 'true' : 'false'}>
							<TranslateIcon />
						</button>
						{translateMenuVisible && (
							<div
								className="absolute right-0 mt-2 py-2 w-36 bg-white text-black dark:bg-gray-600 dark:text-gray-100 rounded-md shadow-lg text-center"
								onMouseLeave={() => setTranslateMenuVisible(false)}>
								{sortedLocales.map(([locale, displayName]) => (
									<div key={locale} className={`block px-4 py-2 text-sm ${activeLocale !== locale ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}`}>
										{locale !== activeLocale ? <Link href='/' locale={locale}>{displayName}</Link> : displayName}
									</div>
								))}
							</div>
						)}
					</li>
					<li className="hidden xl:block">{RenderThemeChanger()}</li>

					<li className="hidden md:block xl:hidden relative">
						<button
							onClick={handleMoreMenuClick}
							aria-expanded={moreMenuVisible ? 'true' : 'false'}>
							<MoreHorizIcon />
						</button>
						{moreMenuVisible && (
							<div className="absolute right-0 mt-2 py-2 w-36 bg-white text-black dark:bg-gray-600 dark:text-gray-100 rounded-md shadow-lg text-center"
								onMouseLeave={ () =>setMoreMenuVisible(false)}>
								<ul className="space-y-2">
									<li className="py-2 bg-white rounded-md shadow-lg bg-white text-black dark:bg-gray-600 dark:text-gray-100">
										{sortedLocales.map(([locale, displayName]) => (
											<div key={locale} className={`block px-4 py-2 text-sm ${activeLocale !== locale ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}`}>
												{locale !== activeLocale ? <Link href='/' locale={locale}>{displayName}</Link> : displayName}
											</div>
										))}
									</li>
									<li className="py-2 bg-white rounded-md shadow-lg bg-white dark:bg-gray-600">
										<div className="block px-4 py-2 text-sm">{RenderThemeChanger()}</div>
									</li>
								</ul>
							</div>
						)}
					</li>

					<li className="md:hidden relative">
						<button
							onClick={handleMobileMenuClick}
							aria-expanded={mobileMenuVisible ? 'true' : 'false'}>
							<MenuIcon />
						</button>
						{mobileMenuVisible && (
							<div className="absolute right-0 mt-2 py-2 w-36 bg-white text-black dark:bg-gray-600 dark:text-gray-100"
								onMouseLeave={ () =>setMobileMenuVisible(false)} >
								<li>
									<Link href="/" className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
										<span className='mx-auto'>Home</span>
									</Link>
								</li>
								<li>
									<Link href="/about" className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
										<span className='mx-auto'>About</span>
									</Link>
								</li>
								<li>
									<Link href="/gallery" className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
										<span className='mx-auto'>Gallery</span>
									</Link>
								</li>
								<li>
									<Link href="/rss.xml" className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
										<span className='mx-auto'>RSS</span>
									</Link>
								</li>
								<div className="absolute right-0 mt-2 py-2 w-36 bg-white dark:bg-gray-600 dark:text-gray-100 text-center border-t border-gray-30">
									<ul className="space-y-2">
										<li className="py-2 bg-white dark:bg-gray-600 dark:text-gray-100 border-b border-gray-30">
											{sortedLocales.map(([locale, displayName]) => (
												<div key={locale} className={`block px-4 py-2 text-sm ${activeLocale !== locale ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}`}>
													{locale !== activeLocale ? <Link href='/' locale={locale}>{displayName}</Link> : displayName}
												</div>
											))}
										</li>
										<li className="py-2 bg-white dark:bg-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
											<div className="block px-4 py-2 text-sm">{RenderThemeChanger()}</div>
										</li>
									</ul>
								</div>
							</div>
						)}
					</li>
				</ul>
			</nav>
		</div>
	)
}