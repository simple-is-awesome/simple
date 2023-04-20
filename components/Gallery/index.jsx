import Head from 'next/head'
import ImageGallery from 'react-image-gallery'
import useTranslation from 'next-translate/useTranslation'
import Layout from 'components/Layout'

export default function Gallery({ images }) {
	const { t } = useTranslation('gallery')
	const gallery= t('Gallery')
	return (
		<Layout>
			<Head>
				<title>{gallery}</title>
			</Head>
			<div className='text-3xl text-center my-3'>{gallery}</div>
			<div className='flex justify-center'>
				<ImageGallery items={images} thumbnailPosition="right"/>
			</div>
		</Layout>
	)
}
