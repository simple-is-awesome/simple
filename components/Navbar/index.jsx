import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import ImageIcon from '@mui/icons-material/Image'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import MenuIcon from '@mui/icons-material/Menu'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import TranslateIcon from '@mui/icons-material/Translate'

export default function Navbar({ RenderThemeChanger }) {
	const [moreMenuVisible, setMoreMenuVisible] = useState(false)
	const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
	const [translateMenuVisible, setTranslateMenuVisible] = useState(false)

	const supportedLocales = {
		zh: '简体中文',
		en: 'English',
	}
	const { t } = useTranslation('common')
	const home = t('Home')
	const blog = t('Blog')
	const about = t('About')
	const gallery = t('Gallery')
	const rss = t('RSS')

	const router = useRouter()
	const { locale:activeLocale } = router
	const currentUrl = router.asPath

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
							<span>{home}</span>
						</Link>
					</li>
					<li className="hidden md:block">
						<a href="https://blog.gujiakai.top" className="flex items-center dark:text-gray-100" target='blank'>
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12.5 10H10c-.55 0-1-.45-1-1s.45-1 1-1h2.5c.55 0 1 .45 1 1s-.45 1-1 1m2.5 4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1m7-10v16c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V4c0-1.11.89-2 2-2h16c1.11 0 2 .89 2 2m-4 8s0-1-1-1c-.95.03-1-1-1-1V8c0-1.66-1.34-3-3-3H9C7.34 5 6 6.34 6 8v7c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3v-3z" fill="currentColor"/></svg>
							<span>{blog}</span>
						</a>
					</li>
					<li className="hidden md:block">
						<Link href="/about" className="flex items-center dark:text-gray-100">
							<InfoIcon />
							<span>{about}</span>
						</Link>
					</li>
					<li className="hidden md:block">
						<Link href="/gallery" className="flex items-center dark:text-gray-100">
							<ImageIcon />
							<span>{gallery}</span>
						</Link>
					</li>
					<li className="hidden md:block">
						<Link href="/index.xml" className="flex items-center dark:text-gray-100">
							<RssFeedIcon />
							<span>{rss}</span>
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
										{locale !== activeLocale ? <Link href={currentUrl} locale={locale}>{displayName}</Link> : displayName}
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
										<div className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">{RenderThemeChanger()}</div>
									</li>
								</ul>
							</div>
						)}
					</li>

					<li className="md:hidden relative z-50">
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
										<span className='mx-auto'>{home}</span>
									</Link>
								</li>
								<li>
									<a href="https://blog.gujiakai.top" className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700" target='blank'>
										<span className='mx-auto'>{blog}</span>
									</a>
								</li>
								<li>
									<Link href="/about" className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
										<span className='mx-auto'>{about}</span>
									</Link>
								</li>
								<li>
									<Link href="/gallery" className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
										<span className='mx-auto'>{gallery}</span>
									</Link>
								</li>
								<li>
									<Link href="/index.xml" className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
										<span className='mx-auto'>{rss}</span>
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
