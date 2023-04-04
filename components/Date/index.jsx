import dayjs from 'dayjs'

// 日期组件
export default function Date({ dateString, format = 'MMMM D, YYYY' }) {
	const date = dayjs(dateString)
	return <time dateTime={dateString}>{date.format(format)}</time>
}
