/* eslint-disable react/prop-types */
import { closeModal } from '../features/unused/cabinSlice';
import { createPortal } from 'react-dom';
import { HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';

function Modal({ children }) {
	const dispatch = useDispatch();

	function handleCloseModal() {
		dispatch(closeModal());
	}

	return createPortal(
		<div className='fixed top-0 left-0 bg-white/30 backdrop-opacity-30 backdrop-blur-sm w-screen h-screen z-50'>
			<div className='fixed top-2/4 left-2/4 shadow-md bg-stone-200 -translate-x-2/4 -translate-y-1/2'>
				{children}
				<button
					className='p-1 bg-stone-300 rounded absolute top-1 right-1 hover:ring-1 hover:ring-stone-600'
					onClick={handleCloseModal}
				>
					<HiMiniXMark />
				</button>
			</div>
		</div>,
		document.body,
	);
}

export default Modal;
