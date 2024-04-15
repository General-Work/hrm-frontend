<script lang="ts">
	import { goto } from '$app/navigation';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import HeaderPanel from '$cmps/layout/headerPanel.svelte';
	import SidePanel from '$cmps/layout/sidePanel.svelte';
	import BreadCrumb from '$cmps/ui/breadCrumb.svelte';
	import CommandPallete from '$cmps/ui/commandPallete.svelte';
	import {
		activePage,
		hideNavDrawer,
		hideRightDrawer,
		sideQuickActions,
		breadCrumb
	} from '$data/appStore';
	import { menuItems } from '$data/userStore';
	import { logoutStaff } from '$svc/auth';
	import { showSearchBox } from '$svc/command';
	import { Drawer, CloseButton } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

	export let data;
	const leftDrawerTransitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	const rightDrawerTransitionParams = {
		x: 320,
		duration: 200,
		easing: sineIn
	};

	$: rightDrawerOptions = $sideQuickActions;
	$: activeBreadCrumb = $breadCrumb[$breadCrumb.length - 1].title;

	let showAlert = false;

	const logout = async () => {
		await logoutStaff();
		goto('/login');
	};

	const toggleLogout = () => {
		if (showAlert) {
			showAlert = false;
		} else {
			showAlert = true;
		}
	};
	function optionClicked({ detail }: any) {
		const { index } = detail;
		breadCrumb.removeFromFront(index);
		// goto(path);
	}
</script>

{#if $showSearchBox}
	<CommandPallete on:close={(_) => ($showSearchBox = false)} />
{/if}
<div class="w-screen h-svh overflow-hidden">
	<div class="flex w-full h-full">
		<div class="w-[19rem] h-full hidden lg:flex">
			<SidePanel menuItems={$menuItems} on:click={toggleLogout} user={data.user} />
		</div>
		<div class="flex-grow flex flex-col h-full gap-4">
			<HeaderPanel
				on:search={() => ($showSearchBox = true)}
				on:leftDrawer={() => ($hideNavDrawer = false)}
				on:rightDrawer={() => ($hideRightDrawer = !$hideRightDrawer)}
			/>
			<div class="h-full w-full">
				{#if $activePage.showBreadCrumb}
					<div class="">
						<div class="pl-6">
							<BreadCrumb options={$breadCrumb} {activeBreadCrumb} on:click={optionClicked} />
						</div>
					</div>
				{/if}
				<div class="pt-5 w-full h-full flex-grow overflow-hidden">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>

<div class="nav-drawer lg:hidden">
	<Drawer
		bind:hidden={$hideNavDrawer}
		transitionType="fly"
		transitionParams={leftDrawerTransitionParams}
		bgOpacity="bg-opacity-50"
		divClass="overflow-y-hidden z-[50] pt-5 bg-gray-50 dark:bg-gray-800 "
	>
		<div class="h-full flex flex-col overflow-y-hidden">
			<div class="flex items-center">
				<h5 class="text-base font-semibold text-gray-500">&nbsp;</h5>
				<CloseButton on:click={(_) => ($hideNavDrawer = true)} />
			</div>
			<div
				class="flex-grow overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
			>
				<SidePanel user={data.user} menuItems={$menuItems} on:click={toggleLogout} />
			</div>
		</div>
	</Drawer>
</div>

<div class="md:hidden">
	{#if rightDrawerOptions}
		<Drawer
			bind:hidden={$hideRightDrawer}
			transitionType="fly"
			transitionParams={rightDrawerTransitionParams}
			backdrop={true}
			placement="right"
			bgOpacity="bg-opacity-50"
			width="w-[25rem]"
			divClass="overflow-y-hidden fixed z-50 pt-4 px-4 bg-white dark:bg-gray-800"
			title={rightDrawerOptions.title || 'Quick Actions'}
		>
			<div class="h-full flex flex-col overflow-y-hidden">
				<div class="flex items-center">
					<h5 class="text-base font-semibold text-gray-500">
						{rightDrawerOptions.title || 'Quick Actions'}
					</h5>
					<CloseButton on:click={(_) => ($hideRightDrawer = true)} />
				</div>
				<div class="flex-grow overflow-y-auto">
					<svelte:component this={rightDrawerOptions.component} />
				</div>
			</div>
		</Drawer>
	{/if}
</div>

<AlertDialog
	bind:open={showAlert}
	icon="line-md:log-out"
	message="Are you sure you want to log out?"
	on:cancel={() => (showAlert = false)}
	on:yes={logout}
/>
