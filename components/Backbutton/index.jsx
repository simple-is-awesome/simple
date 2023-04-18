import { useRouter } from 'next/router'

// 回到上一页组件
export default function BackButton () {
	const router = useRouter()
  
	const goBack = () => {
		router.back()
	}
  
	return (
		<button onClick={goBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
			返回上一页
		</button>
	)
}
  