import dayjs from 'dayjs'

export default function Date({ dateString }) {
    const date = dayjs(dateString)
    return <time dateTime={dateString}>{date.format('MMMM D, YYYY')}</time>
}