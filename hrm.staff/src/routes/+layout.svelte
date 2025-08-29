<script>
	import './styles.css';
	import 'iconify-icon';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { endProgress, hideSpinner, startProgress } from '$lib/utils';
	import { Toaster } from 'svelte-french-toast';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import advancedFormat from 'dayjs/plugin/advancedFormat';

	dayjs.extend(relativeTime);
	dayjs.extend(advancedFormat);

	beforeNavigate(() => {
		startProgress();
	});

	afterNavigate(() => {
		endProgress();
	});

	hideSpinner();
</script>

<Toaster
	toastOptions={{
		style: 'background: #363636; color: #fff;'
	}}
/>
<slot />
