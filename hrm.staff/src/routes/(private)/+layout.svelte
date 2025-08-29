<script lang="ts">
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
	import type { IUserInfo } from '$lib/types';
	import { showSearchBox } from '$svc/command';
	import { Drawer, CloseButton, Modal } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { authInit, refreshToken, signout, userInfo } from '$svc/auth';
	import { menuItems } from '$data/userStore';
	import { onDestroy, onMount } from 'svelte';

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
	let dialogInfo = { show: false, message: '', service: '', action: '' };
	let interval: NodeJS.Timer;

	$: rightDrawerOptions = $sideQuickActions;
	$: activeBreadCrumb = $breadCrumb[$breadCrumb.length - 1].title;

	let showAlert = false;

	const logout = async () => {
		signout('STAFF');
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

	async function showDialogs(user: IUserInfo) {
		// console.log({ user });
		if (!user) return;

		return;

		let message = '';
		let service = '';
		let action = '';

		if (user.newStaffPrerequisiteCheck.bankData === false) {
			message =
				'Welcome! Your bank details are not yet added to your profile. Please update your profile by clicking the button below to proceed with other actions.';
			service = '/profile/bank';
			action = 'Bank Details';
		} else if (user.newStaffPrerequisiteCheck.familyData == false) {
			message =
				'Welcome! Your family details are not yet added to your profile. Please update your profile by clicking the button below to proceed with other actions.';
			service = '/profile/family';
			action = 'Family Details';
		} else if (user.newStaffPrerequisiteCheck.accomodationData == false) {
			message =
				'Welcome! Your accomodation details are not yet added to your profile. Please update your profile by clicking the button below to proceed with other actions.';
			service = '/profile/accomodation';
			action = 'Accomodation Details';
		}

		if (message !== '') {
			dialogInfo = {
				show: true,
				message: message,
				service: service,
				action: action
			};
		}
	}

	$: if ($userInfo) {
		showDialogs($userInfo);
	}

	onMount(async () => {
		await authInit('STAFF');
		interval = setInterval(() => refreshToken('STAFF'), 10000); // refresh every 30s
	});
	onDestroy(() => clearInterval(interval));
</script>

{#if $showSearchBox}
	<CommandPallete on:close={(_) => ($showSearchBox = false)} />
{/if}

{#if !$userInfo}
	<div class="w-screen h-screen flex items-center justify-center">
		<iconify-icon
			icon="svg-spinners:3-dots-move"
			class="text-purple-600"
			style="font-size: 80px;"
		/>
	</div>
{:else}
	<div class="w-screen h-svh overflow-hidden">
		<div class="flex w-full h-full">
			<div class="w-[19rem] h-full hidden lg:flex shrink-0">
				<SidePanel menuItems={$menuItems} on:click={toggleLogout} user={$userInfo} />
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
							<div class="pl-6 lg:container lg:mx-auto">
								<BreadCrumb options={$breadCrumb} {activeBreadCrumb} on:click={optionClicked} />
							</div>
						</div>
					{/if}
					<div class="pt-5 w-full h-full flex-grow overflow-hidden lg:container lg:mx-auto">
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
					class="flex-grow shrink-0 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
				>
					<SidePanel user={$userInfo} menuItems={$menuItems} on:click={toggleLogout} />
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
{/if}

<AlertDialog
	bind:open={showAlert}
	icon="line-md:log-out"
	message="Are you sure you want to log out?"
	on:cancel={() => (showAlert = false)}
	on:yes={logout}
/>

<Modal open={dialogInfo.show} size="xs" autoclose={false} outsideclose={false} dismissable={false}>
	<div class="text-center">
		<iconify-icon
			icon="ph:warning"
			width="48"
			height="48"
			class="mx-auto mb-4 text-orange-400 w-12 h-12 dark:text-gray-200"
		/>
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{dialogInfo.message}</h3>
		<a
			class="bg-blue-600 px-3 py-2 text-white rounded-md text-sm hover:bg-blue-700"
			href={dialogInfo.service}
			on:click={() => (dialogInfo = { ...dialogInfo, show: false })}>{dialogInfo.action}</a
		>
	</div>
</Modal>
