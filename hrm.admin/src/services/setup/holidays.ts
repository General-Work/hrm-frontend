import Holidays from 'date-holidays';
import type { HolidaysTypes } from 'date-holidays';
import dayjs from 'dayjs';

const holiday = new Holidays();

export function readHolidays(year: number) {
	holiday.init('GH');
	const holidays: any[] = holiday.getHolidays(year);
	// console.log(holidays);
	const holidayEvents = holidays.map((h) => ({
		title: h.name,
		start:
			dayjs(h.date).format('YYYY-MM-DD') !== 'Invalid Date'
				? dayjs(h.date).format('YYYY-MM-DD')
				: dayjs(h.end).format('YYYY-MM-DD'),
		end: dayjs(h.end).format('YYYY-MM-DD')
	}));
	return holidayEvents;
}
