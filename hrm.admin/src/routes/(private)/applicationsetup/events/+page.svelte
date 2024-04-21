<script lang="ts">
	import Calendar from '$cmps/layout/calendar.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	import Editor from './editor.svelte';

	$activePage = {
		title: 'Events',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Events', path: '' }
		],
		true
	);

	let events = [
		{ title: 'Event 1', start: '2024-04-01', end: '2024-04-03' },
		{ title: 'Event 2', start: '2024-04-15' }
	];
</script>

<div class=" h-full w-full flex flex-col gap-3">
	<Calendar {events} height={650} showAdd addLabel="Add Event" editorComponent={Editor} />
</div>
