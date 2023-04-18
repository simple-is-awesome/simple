import Link from 'next/link'
import { useTheme } from 'next-themes'
import Search from 'components/Search'
import Navbar from 'components/Navbar'
import Brightness5Icon from '@mui/icons-material/Brightness5'
import Brightness4Icon from '@mui/icons-material/Brightness4'

// 顶部导航栏组件
export default function Header() {
	const RenderThemeChanger = () => {
		const { theme, systemTheme, setTheme } = useTheme()
		const currentTheme = theme === 'system' ? systemTheme : theme
		if (currentTheme === 'dark') {
			return (
				<button aria-label="Switch to light mode" onClick={() => setTheme('light')}>
					<Brightness4Icon />
				</button>
			)
		} else {
			return (
				<button aria-label="Switch to dark mode" onClick={() => setTheme('dark')}>
					<Brightness5Icon />
				</button >
			)
		}
	}

	return (
		<header className="flex justify-between items-center border-b border-gray-30 py-3 px-5">
			<div className="flex-grow">
				<div className="text-base pl-6">
					<Link href="/">{process.env.NEXT_PUBLIC_SITE_TITLE}</Link>
				</div>
			</div>
			<div className="hidden md:block lg:hidden">
				<Search />
			</div>
			<div className="flex items-center space-x-4">
				<div className="hidden lg:block">
					<Search />
				</div>
				<div className="md:flex">
					<Navbar RenderThemeChanger={RenderThemeChanger} />
				</div>
			</div>
		</header>
	)
}
