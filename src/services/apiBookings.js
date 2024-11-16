import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constant';

import { formatDateToISOWithOffset, getToday } from '../utils/helpers';

///////////////////Getting bookings data from the Database
export async function getBookings({ filter, sortBy, page }) {
	let query = supabase.from('bookings').select('*, cabins(name), guests(name, email)', { count: 'exact' }); //count will return the number of items queried

	if (filter)
		// query = query[filter.method || 'eq'](filter?.field, filter?.value)
		query = query.eq(filter?.field, filter?.value);

	if (sortBy)
		query = query.order(sortBy.field, {
			ascending: sortBy.direction === 'asc',
		});

	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from, to);
	}

	const { data: bookings, error, count } = await query;

	if (error) {
		console.error(error);
		throw new Error('Failed to load bookings');
	}

	return { bookings, count };
}

export async function getBooking(id) {
	let query = supabase.from('bookings').select('*, cabins(*), guests(*)');

	if (id) query = query.eq('id', id);

	const { data: booking, error } = await query;

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return booking;
}

export async function getBookingsAfterDate(date, now) {
	const { data, error } = await supabase
		.from('bookings')
		.select('created_at, totalPrice, status, extrasPrice, numberNights')
		.gte('created_at', date)
		.lte('created_at', formatDateToISOWithOffset(now));

	if (error) throw new Error('Failed to get bookings days ago');

	return data;
}

export async function updateBooking(id, obj) {
	let query = supabase.from('bookings').update(obj);

	if (id) query = query.eq('id', id).select();

	const { data, error } = await query;

	if (error) {
		console.error(error);
		throw new Error('Failed to update status');
	}

	return data;
}

export async function deleteBooking(id) {
	let query = supabase.from('bookings').delete();

	if (id) query = query.eq('id', id);

	const { data: deletedBooking, error } = await query;

	if (error) {
		console.error(error.message);
		throw new Error('Failed to delete booking');
	}

	return deletedBooking;
}

export async function getTodaysActivity() {
	const { data, error } = await supabase
		.from('bookings')
		.select('*,guests(*)')
		.or(`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`)
		.order('created_at');

	if (error) throw new Error('Unable to get activites for today');

	return data;
}
