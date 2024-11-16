/* eslint-disable react/prop-types */
import TableRow from './TableRow';
import TableHead from './TableHead';
import { formatCurrency } from '../utils/helpers';
import { daysToStay } from '../utils/helpers';
import { DetailsButton } from '../ui-component/Button';

import { HiOutlineEye } from 'react-icons/hi2';

function Table({ cabins = [], headers = [], bookings = [] }) {
	return (
		<table className='table-fixed min-w-full font-poppins text-xs font-light bg-indigo-50 border-2 border-indigo-50 rounded-lg'>
			<thead>
				<TableRow>
					{headers.map((header, idx) => (
						<TableHead key={header}>{headers[idx]}</TableHead>
					))}
				</TableRow>
			</thead>

			<tbody className='text-center'>
				{cabins &&
					cabins.map((el) => {
						return (
							<TableRow key={el.id}>
								<td className='py-5 font-semibold'>{el.name}</td>
								<td>
									{el.maxCapacity} <span>Guests</span>
								</td>
								<td>{formatCurrency(el.regularPrice)}</td>
								<td>{el.discount ? formatCurrency(el.discount) : <span>&mdash;</span>}</td>
								<td>
									<div className='flex justify-center items-center h-full'>
										<DetailsButton icon={<HiOutlineEye />} id={el.id}>
											see more
										</DetailsButton>
									</div>
								</td>
							</TableRow>
						);
					})}

				{bookings &&
					bookings.map((el) => {
						return (
							<TableRow key={el.id}>
								<td className='py-5 font-semibold'>{el.cabins.name}</td>
								<td>
									{el.guests.name} <span>Guests</span>
								</td>
								<td>{`${daysToStay(el.startDate, el.endDate)} Days`}</td>
								<td className='font-bold lowercase'>{el.status}</td>
								<td>{formatCurrency(el.totalPrice)}</td>
								<td>
									<div className='flex justify-center items-center h-full'>
										<DetailsButton icon={<HiOutlineEye />} id={el.id}>
											see more
										</DetailsButton>
									</div>
								</td>
							</TableRow>
						);
					})}
			</tbody>
		</table>
	);
}

export default Table;
