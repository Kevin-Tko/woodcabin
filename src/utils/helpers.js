import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays, format } from 'date-fns';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
	differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export function daysToStay(startDate, endDate) {
	const daysStayed = differenceInDays(parseISO(String(endDate)), parseISO(String(startDate)));
	return daysStayed;
}

export function formatedDates(startDate, endDate) {
	const SD = parseISO(String(startDate));
	const ED = parseISO(String(endDate));

	const formattedSD = format(SD, 'EEE, MMM dd yyyy');
	const formattedED = format(ED, 'EEE, MMM dd yyyy');

	return { formattedSD, formattedED };
}

export function formatedDateTime(bookingDate) {
	const BD = parseISO(String(bookingDate));

	const formattedBD = format(BD, 'EEE, MMM dd yyyy');

	return formattedBD;
}

export const formatDistanceFromNow = (dateStr) =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	})
		.replace('about ', '')
		.replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
	const today = new Date();

	// This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
	if (options?.end)
		// Set to the last second of the day
		today.setUTCHours(23, 59, 59, 999);
	else today.setUTCHours(0, 0, 0, 0);
	return today.toISOString();
};

export function formatCurrency(price) {
	const convertedPrice = new Intl.NumberFormat('ke-KE', {
		style: 'currency',
		currency: 'KES',
	}).format(price);
	return convertedPrice;
}

//Find date.now
export function formatDateToISOWithOffset() {
	const date = new Date(Date.now());

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
	const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

	// Calculate timezone offset
	const offset = -date.getTimezoneOffset(); // in minutes
	const sign = offset >= 0 ? '+' : '-';
	const absOffset = Math.abs(offset);
	const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, '0');
	const offsetMinutes = String(absOffset % 60).padStart(2, '0');

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetMinutes}`;
}

//Find days ago 30, 90, 7
export function calculateDaysAgo(days) {
	const now = new Date(Date.now());

	const targetOffsetMinutes = 60;

	const givenDate = new Date(now); // Parse the given date
	const daysAgo = new Date(givenDate.getTime() - days * 24 * 60 * 60 * 1000); // Subtract 7 days in milliseconds

	// Apply the target offset (in minutes)
	const targetOffsetMs = targetOffsetMinutes * 60 * 1000;
	const offsetDate = new Date(daysAgo.getTime() + targetOffsetMs);

	// Format the date into ISO 8601 with the target offset
	const isoString = offsetDate.toISOString(); // e.g., 2024-11-08T10:38:07.685Z
	const [datePart, timePart] = isoString.split('Z')[0].split('T'); // Remove 'Z'

	// Format the offset (e.g., +03:00)
	const offsetHours = Math.floor(targetOffsetMinutes / 60)
		.toString()
		.padStart(2, '0');
	const offsetMinutes = Math.abs(targetOffsetMinutes % 60)
		.toString()
		.padStart(2, '0');
	const offsetSign = targetOffsetMinutes >= 0 ? '+' : '-';

	return `${datePart}T${timePart}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

export function percentageFormatter(num) {
	return new Intl.NumberFormat('default', {
		style: 'percent',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(num);
}

//Format label date
export function formatLineChartDate(dateIsoStr) {
	const date = new Date(dateIsoStr); // Parse the ISO string into a Date object
	const options = { month: 'short', day: 'numeric' }; // Options for Intl.DateTimeFormat
	return new Intl.DateTimeFormat('en-US', options).format(date);
}

//Group Number of Nights
export function groupNights(num) {
	let duration;
	let color;
	let value;

	if (num <= 2) {
		duration = '2 Nights';
		color = '#fa5252';
		value = 2;
	} else if (num > 2 && num <= 3) {
		duration = '3 Nights';
		color = '#e64980';
		value = 3;
	} else if (num > 3 && num <= 5) {
		duration = '4-5 Nights';
		color = '#be4bdb';
		value = 5;
	} else if (num > 5 && num <= 7) {
		duration = '6-7 Nights';
		color = '#4c6ef5';
		value = 7;
	} else {
		duration = 'Over 8 Nights';
		color = '#37b24d';
		value = 8;
	}

	return { duration, color, value };
}
