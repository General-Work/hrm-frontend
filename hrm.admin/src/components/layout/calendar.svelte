<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import interaction from '@fullcalendar/interaction';
	import multiMonth from '@fullcalendar/multimonth';
	import googleCalenda from '@fullcalendar/google-calendar';
	import list from '@fullcalendar/list';
	import timeGrid from '@fullcalendar/timegrid';
	import CalendarDetail from './calendarDetail.svelte';
	import Modal from '$cmps/ui/modal.svelte';
	import dayjs from 'dayjs';
	import Button from '$cmps/ui/button.svelte';
	import SideModal from './sideModal.svelte';

	export let events: { title: string; start: string; end?: string }[] = []; // Accept events as a prop
	export let holidays: { title: string; start: string; end?: string }[] = [];

	export let height = 700;
	export let showAdd = false;
	export let addLabel = 'Add Event';
	export let editorComponent: any = {};

	let calendar: Calendar;
	let showDetails = false;
	let open = false;
	let selectedDate = '';
	let activeEvent: any = {
		title: '',
		start: '',
		end: ''
	};

	// $: options = {

	// }
	onMount(() => {
		calendar = new Calendar(document.getElementById('calendar')!, {
			plugins: [dayGridPlugin, interaction, multiMonth, googleCalenda, list, timeGrid],
			initialView: 'dayGridMonth', // Set initial view to month view
			events: [...events, ...holidays],
			droppable: true,
			multiMonthMaxColumns: 2,
			height,
			handleWindowResize: true,
			aspectRatio: 2,
			headerToolbar: {
				start: 'prev,next today',
				center: 'title',
				end: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
			},
			eventClick: function (info) {
				showDetails = true;
				activeEvent = {
					title: info.event.title,
					start: dayjs(info.event.start).format('ddd DD MMM YYYY'),
					end: dayjs(info.event.end).format('ddd DD MMM YYYY')
				};
			},
			dateClick: function (info) {
				selectedDate = info.dateStr;
				open = true;
			},
			eventContent: function (info) {
				let html = `<div class="">${info.timeText}</div>
                    <div id="info" class="truncate pl-1 cursor-pointer">${info.event.title}</div>
                    `;
				return { html };
			}
		});

		calendar.render();

		return onDestroy(() => {
			calendar.destroy();
		});
	});

	function closeSideModal() {
		open = false;
		selectedDate = '';
	}
</script>

<div class="flex justify-end" class:hidden={!showAdd}>
	<Button
		label={addLabel}
		color="primary"
		leadingIcon="clarity:date-solid-badged"
		on:click={() => (open = true)}
	/>
</div>
<div id="calendar"></div>

<Modal
	bind:open={showDetails}
	title="Event Details"
	size="xs"
	on:close={() => (showDetails = false)}
>
	<CalendarDetail title={activeEvent.title} start={activeEvent.start} end={activeEvent.end} />
</Modal>

<SideModal {open} title={addLabel} on:close={closeSideModal}>
	<svelte:component this={editorComponent} {selectedDate} />
</SideModal>
