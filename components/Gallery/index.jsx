import ImageGallery from 'react-image-gallery'
import Layout from 'components/Layout'
import Head from 'next/head'

export default function Gallery({ images,translate }) {
	return (
		<Layout>
			<Head>
				<title>{translate('Gallery')}</title>
			</Head>
			<div className='text-3xl text-center my-3'>{translate('Gallery')}</div>
			<div className='flex justify-center'>
				<ImageGallery items={images} thumbnailPosition="right"/>
			</div>
		</Layout>
	)
}
