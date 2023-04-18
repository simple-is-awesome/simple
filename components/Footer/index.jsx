import Image from 'next/image'
import GitHubIcon from '@mui/icons-material/GitHub'

// 底部组件
export default function Footer() {
	return (
		<div className="flex justify-center items-center my-3 space-x-3">
			<span className="text-md text-center font-medium">
				{process.env.NEXT_PUBLIC_FOOTER}
			</span>
			<span className="mx-2 text-gray-400">|</span>
			<a href={process.env.NEXT_PUBLIC_GITHUB_REPO} target="_blank">
				<GitHubIcon />
			</a>
			<span className="mx-2 text-gray-400 hidden md:block">|</span>
			<a href="https://notbyai.fyi/" target="_blank" className="flex items-center">
				<Image
					src="/images/Written-By-Human-Not-By-AI-Badge-black.svg"
					width={64}
					height={64}
					alt="Written By Human Not By AI Badge black"
					className="hidden md:block" />
			</a>
		</div>
	)
}
