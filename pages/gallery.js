import Gallery from 'components/Gallery'
import getPhotoList from 'lib/getPhotoList'

export async function getServerSideProps() {
	const images = getPhotoList()
	return {
		props: {
			images,
		},
	}
}

export default function GalleryPage({ images }) {
	return <Gallery images={images} />
}
