import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

// 回到上一页组件
export default function BackButton () {
	const router = useRouter()
	const { t } = useTranslation('common')
	const back = t('BackToLast')
  
	const goBack = () => {
		router.back()
	}
  
	return (
		<button onClick={goBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
			{back}
		</button>
	)
}
  