import fs from 'fs'
import path from 'path'

const photosDir = path.join(process.cwd(), 'public', 'photos')

export default function getPhotoList() {
	const fileNames = fs.readdirSync(photosDir)
	return fileNames.map(fileName => (
		{
			original: `/photos/${fileName}`,
			thumbnail: `/photos/${fileName}`,
		})
	)
}
