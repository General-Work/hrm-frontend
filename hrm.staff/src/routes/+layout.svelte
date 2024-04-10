<script>
	import './styles.css';
	import 'iconify-icon';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { endProgress, hideSpinner, startProgress } from '$lib/utils';

	beforeNavigate(() => {
		startProgress();
	});

	afterNavigate(() => {
		endProgress();
	});

	hideSpinner();
</script>

<slot />
