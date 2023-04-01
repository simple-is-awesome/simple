import ImageGallery from 'react-image-gallery'
import Head from 'next/head'
import Layout from 'components/Layout'


export default function GalleryPage() {
	const images = [
		{
			original: 'https://picsum.photos/id/1018/1000/600/',
			thumbnail: 'https://picsum.photos/id/1018/250/150/',
		},
		{
			original: 'https://picsum.photos/id/1015/1000/600/',
			thumbnail: 'https://picsum.photos/id/1015/250/150/',
		},
		{
			original: 'https://picsum.photos/id/1019/1000/600/',
			thumbnail: 'https://picsum.photos/id/1019/250/150/',
		},
	]
    

	return (
		<Layout>
			<Head>
				<title>Gallery</title>
			</Head>
			<div className='text-3xl text-center my-3'>画廊</div>
			<div className='flex justify-center'>
				<ImageGallery items={images} widh/>
			</div>	
		</Layout>
	)
}
