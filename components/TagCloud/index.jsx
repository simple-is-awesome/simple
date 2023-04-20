import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

// 标签云组件
export default function TagCloud({ tags }) {
	const { t } = useTranslation('home')
	const tagCloud = t('TagCloud')
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 my-8 dark:bg-gray-600 dark:text-gray-100">
			<h2 className="text-2xl font-semibold mb-4">{tagCloud}</h2>
			<div className="flex flex-wrap">
				{tags.map((tag, index) => (
					 <Link className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold m-2 cursor-pointer hover:bg-blue-600" key={index} href={`/tag/${tag}`}>
					 {tag}
				   </Link>
				))}
			</div>
		</div>
	)
}
