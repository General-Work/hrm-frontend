<script lang="ts">
	import Navbar from '$cmps/layout/navbar.svelte';
	import { menuItems } from '$data/userStore';
	import { activePage, breadCrumb, hideRightDrawer, sideQuickActions } from '$data/appStore';
	import BreadCrumb from '$cmps/ui/breadCrumb.svelte';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import SidePanel from '$cmps/layout/sidePanel.svelte';
	import logo from '$lib/images/logo_full.png';
	import Divider from '$cmps/ui/divider.svelte';
	import Dialog from '$cmps/ui/dialog.svelte';
	import { CloseButton, Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { browser } from '$app/environment';
	import { signOut } from '@auth/sveltekit/client';
	import { authToken, readAuthUser, userInfo } from '$svc/auth';
	import { onMount } from 'svelte';
	import { showError } from '$lib/utils/index.js';
	import { page } from '$app/stores';
	import { setAuthToken } from '$lib/axios';
	import axios from 'axios';
	// import { onMount } from 'svelte';
	// import { showError } from '$lib/utils/index.js';
	// import { readAuthUser, userInfo } from '$svc/auth';

	// export let data;

	let hideSidebar = false;
	let showAlert = false;
	$: rightDrawerOptions = $sideQuickActions;
	$: activeBreadCrumb = $breadCrumb[$breadCrumb.length - 1].title;

	const rightDrawerTransitionParams = {
		x: 0,
		duration: 200,
		easing: sineIn
	};

	function optionClicked({ detail }: any) {
		const { index } = detail;
		breadCrumb.removeFromFront(index);
		// goto(path);
	}

	async function logout() {
		await signOut();
		// authToken.set('');
		setAuthToken('');
		if (browser) window.location.reload();
	}

	async function fetchData() {
		try {
			const ret = await axios.get('/authuser');
			if (ret.data.success) {
				userInfo.set(ret.data.data);
			}
		} catch (error: any) {
			showError(error.message || error);
		}
	}

	$: if ($page.data.session) {
		fetchData();
	}
	// onMount(() => {
	// });
</script>

{#if userInfo}
	<div class="w-screen h-screen overflow-hidden relative">
		<aside id="sidebar" class="relative overflow-y-hidden flex flex-col" class:hide={hideSidebar}>
			<div class="flex justify-center pt-4">
				<!-- <div
        class:px-10={!hideSidebar}
        class="rounded-md border-2 py-4 w-fit border-indigo-600 shadow-md shadow-gray-400"
      > -->
				<div class="space-y-2">
					<a href="/dashboard" class="brand">
						<img src={logo} alt="Logo" class={hideSidebar ? 'w-12 ' : 'w-12 md:w-[250px]'} />
					</a>
					<!-- <p
					class=" text-center uppercase font-semibold text-xl text-blue-800 {hideSidebar
						? 'hidden'
						: 'hidden md:block'}"
				>
					Archiving
				</p> -->
				</div>
				<!-- </div> -->
			</div>
			<Divider otherClasses="mx-6 mb-5 mt-3 bg-gray-200" />
			<SidePanel routeItems={$menuItems} {hideSidebar} />
		</aside>
		<section id="content" class="w-full h-full overflow-hidden">
			<Navbar
				user={$userInfo}
				bind:hideSidebar
				on:signout={() => (showAlert = true)}
				on:rightDrawer={(_) => ($hideRightDrawer = !$hideRightDrawer)}
			/>
			<section class="bg-[#f5e9eb78] w-full h-full flex-grow flex flex-col">
				<div
					class:hidden={!$activePage.showBreadCrumb}
					class="head-title pt-4 pb-4 px-2 md:px-4 2xl:px-0 lg:container lg:mx-auto"
				>
					<div class="left">
						<BreadCrumb options={$breadCrumb} {activeBreadCrumb} on:click={optionClicked} />
					</div>
				</div>
				<div class=" w-full h-full flex-grow overflow-hidden">
					<div class="w-full h-full">
						<slot />
					</div>
				</div>
			</section>
		</section>
	</div>

	<div class="lg:hidden relative z-[1000]">
		{#if rightDrawerOptions}
			<Drawer
				bind:hidden={$hideRightDrawer}
				transitionType="fly"
				transitionParams={rightDrawerTransitionParams}
				placement="right"
				title={rightDrawerOptions.title || 'Quick Actions'}
				width={'w-96'}
			>
				<div class="h-full flex flex-col overflow-y-hidden">
					<div class="flex items-center">
						<h5 class="text-base font-semibold text-gray-500">
							{rightDrawerOptions.title || 'Quick Actions'}
						</h5>
						<CloseButton on:click={(_) => ($hideRightDrawer = true)} />
					</div>
					<Divider />
					<div class="flex-grow overflow-y-auto pt-3">
						<svelte:component this={rightDrawerOptions.component} {...rightDrawerOptions.props} />
					</div>
				</div>
			</Drawer>
		{/if}
	</div>

	<AlertDialog
		bind:open={showAlert}
		message="Are you sure you want to sign out?"
		on:cancel={() => (showAlert = false)}
		on:yes={logout}
	/>

	<Dialog />
{:else}
	<div class="flex justify-center items-center">hii</div>
{/if}
