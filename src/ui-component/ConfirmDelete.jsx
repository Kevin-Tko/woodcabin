/* eslint-disable react/prop-types */
function ConfirmDelete({ handleDelete, setDelete }) {
	return (
		<div className='p-4 bg-indigo-300 space-y-3 absolute max-w-60 top-2/4 left-2/4 translate-x-2/4 translate-y-2/4'>
			<p className='font-poppins text-xs font-semibold'>Are you sure you want to delete ?</p>
			<div className='space-x-3'>
				<button
					className='inline-block px-3 bg-indigo-500 rounded text-sm capitalize font-semibold text-indigo-50'
					onClick={() => setDelete(false)}
				>
					No
				</button>
				<button
					className='inline-block px-3  bg-red-500 rounded text-sm capitalize font-semibold text-indigo-50'
					onClick={handleDelete}
				>
					Yes
				</button>
			</div>
		</div>
	);
}

export default ConfirmDelete;
