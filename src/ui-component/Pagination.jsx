/* eslint-disable react/prop-types */
import { VscChevronLeft } from 'react-icons/vsc';
import { VscChevronRight } from 'react-icons/vsc';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constant';

function Pagination({ count }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	const pageCount = Math.ceil(count / PAGE_SIZE);

	function handleNext() {
		const next = currentPage === pageCount ? currentPage : currentPage + 1;
		searchParams.set('page', next);
		setSearchParams(searchParams);
	}

	function handlePrevious() {
		const prev = currentPage === 1 ? currentPage : currentPage - 1;
		searchParams.set('page', prev);
		setSearchParams(searchParams);
	}

	//if items in a page are less than 10 do not return the pagination component
	if (pageCount <= 1) return null;

	return (
		<div className='flex flex-row justify-between px-3 py-2 text-sm font-poppins items-center'>
			<p>
				Showing <strong>{(currentPage - 1) * PAGE_SIZE + 1}</strong> to{' '}
				<strong>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</strong> of{' '}
				<strong>{count}</strong> results
			</p>
			<div className='flex flex-row items-center gap-4'>
				<button
					className='hover:bg-indigo-500  transition-all duration-500 flex gap-1 items-center py-1 px-2 rounded disabled:cursor-not-allowed'
					onClick={handlePrevious}
					disabled={currentPage === 1}
				>
					<span>
						<VscChevronLeft />
					</span>
					Prev
				</button>
				<button
					className='hover:bg-indigo-500 transition-all duration-700 flex gap-1 items-center py-1 px-2 rounded disabled:cursor-not-allowed'
					onClick={handleNext}
					disabled={currentPage === pageCount}
				>
					Next
					<span>
						<VscChevronRight />
					</span>
				</button>
			</div>
		</div>
	);
}

export default Pagination;
