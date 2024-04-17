<script>
	import './styles.css';
	import 'iconify-icon';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { endProgress, hideSpinner, startProgress } from '$lib/utils';
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

<slot />
