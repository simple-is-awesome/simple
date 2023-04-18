// pages/gallery.js
import Gallery from 'components/Gallery'
import getPhotoList from 'lib/getPhotoList'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({locale}) {
	const images = getPhotoList()
	return {
		props: {
			images,
			...(await serverSideTranslations(locale, ['gallery'])),
		},
	}
}

export default function GalleryPage({ images }) {
	const { t:translate } = useTranslation('gallery')
	return <Gallery images={images} translate={translate} />
}
