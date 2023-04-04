import dynamic from 'next/dynamic'

export default function Aplayerlist() {

	const ReactAplayer = dynamic(() => import('react-aplayer'), {
		ssr: false,
	})

	const props = {
		fixed: true,
		audio: [
			{
				name: '最伟大的作品',
				artist: '周杰伦',
				url: '/music/mp3/the-greatest-work-of-all.mp3',
				cover: '/music/cover/the-greatest-work-of-all.webp',
			},
			{
				name: '听妈妈的话',
				artist: '周杰伦',
				url: '/music/mp3/listen-to-your-mother.mp3',
				cover: '/music/cover/listen-to-your-mother.webp',
			},
		
			{
				name: '我在这',
				artist: '张杰',
				url: '/music/mp3/i-am-here.mp3',
				cover: '/music/cover/i-am-here.webp',
			},
			{
				name: '少年中国说',
				artist: '张杰',
				url: '/music/mp3/young-chinese-said.mp3',
				cover: '/music/cover/young-chinese-said.jpg',
			},
		],
	}

	return (
		  <ReactAplayer {...props} />
	  )
	  
}
