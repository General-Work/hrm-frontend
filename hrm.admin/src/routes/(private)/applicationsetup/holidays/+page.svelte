<script lang="ts">
	import Calendar from '$cmps/layout/calendar.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import { readHolidays } from '$svc/setup';
	import Editor from './editor.svelte';

	$activePage = {
		title: 'Holidays',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Holidays', path: '' }
		],
		true
	);

	let holidays: any = [];
	let open = false;
	let events = [
		{ title: 'Event 1', start: '2024-04-01', end: '2024-04-03' },
		{ title: 'Event 2', start: '2024-04-15' }
	];

  const year = new Date().getFullYear()
</script>

<div class=" h-full w-full flex flex-col gap-3">
	<Calendar
		holidays={readHolidays(year)}
		height={650}
		showAdd
		addLabel="Add Holiday"
		editorComponent={Editor}
	/>
</div>
