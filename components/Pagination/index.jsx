// 分页组件
export default function Pagination({ currentPage, totalPages, handlePrevPage, handleNextPage }) {
	const currentPageNumber = Number(currentPage)
	const totalPagesNumber = Number(totalPages)
	return (
		<div className="flex justify-center my-4">
			{currentPageNumber !== 1 && (
				<button className="px-4 py-2 bg-gray-300 text-black rounded mr-2 dark:bg-gray-600 dark:text-gray-100" onClick={handlePrevPage}>
				Pre
				</button>
			)}
			<span className="px-4 py-2">{currentPageNumber} / {totalPagesNumber}</span>
			{currentPageNumber !== totalPagesNumber && (
				<button className="px-4 py-2 bg-gray-300 text-black rounded ml-2 dark:bg-gray-600 dark:text-gray-100" onClick={handleNextPage}>
				Next
				</button>
			)}
		</div>
	)
}
