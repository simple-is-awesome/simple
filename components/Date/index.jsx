import dayjs from 'dayjs'

export default function Date({ dateString, format = 'MMMM D, YYYY' }) {
	const date = dayjs(dateString)
	return <time dateTime={dateString}>{date.format(format)}</time>
}
