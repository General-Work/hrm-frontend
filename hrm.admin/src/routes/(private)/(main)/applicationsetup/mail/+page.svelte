<script>
	import Mail from '$modules/setup/mail/index.svelte';
	import { activePage, breadCrumb } from '$data/appStore';
	$activePage = {
		title: 'Mail Templates',
		showBreadCrumb: true
	};
	breadCrumb.addToFirstIndex(
		[
			{ title: 'Home', path: '/applicationsetup' },
			{ title: 'Mail Templates', path: '/applicationsetup/mail' }
		],
		true
	);
</script>

<div class="px-6 pb-6 w-full h-full">
	<Mail />
</div>
