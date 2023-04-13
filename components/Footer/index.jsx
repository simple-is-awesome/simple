import config from 'config'
import Image from 'next/image'

// 底部组件
export default function Footer() {
	return (
		<div className="flex justify-center items-center my-3">
			<span className="text-lg text-center font-medium">
				{config.footer}
			</span>
			<Image
				src="/images/Written-By-Human-Not-By-AI-Badge-black.svg"
				width={100}
				height={64}
				alt="Written By Human Not By AI Badge black"
				className="hidden md:block ml-2"
			/>
		</div>
	)
}
