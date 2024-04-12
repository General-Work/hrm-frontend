<script lang="ts">
	import Navbar from '$cmps/layout/navbar.svelte';
	import { menuItems } from '$data/userStore';
	import { activePage, breadCrumb } from '$data/appStore';
	import BreadCrumb from '$cmps/ui/breadCrumb.svelte';
	import { goto } from '$app/navigation';
	import { Toaster } from 'svelte-french-toast';
	import AlertDialog from '$cmps/alerts/alertDialog.svelte';
	import SidePanel from '$cmps/layout/sidePanel.svelte';
	import logo from '$lib/images/logo_full.png';
	import Divider from '$cmps/ui/divider.svelte';
	import { logoutUser } from '$svc/auth.js';

	export let data;

	let hideSidebar = false;
	let showAlert = false;
	$: activeBreadCrumb = $breadCrumb[$breadCrumb.length - 1].title;

	function optionClicked({ detail }: any) {
		const { index, path } = detail;
		breadCrumb.removeFromFront(index);
		goto(path);
	}

	async function signOut() {
		await logoutUser();
		goto('/login');
	}
</script>

<Toaster
	toastOptions={{
		style: 'background: #363636; color: #fff;'
	}}
/>

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
	<section id="content" class="w-full h-full">
		<Navbar user={data.user} bind:hideSidebar on:signout={() => (showAlert = true)} />
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
				<div class="px-2 md:px-4 2xl:px-0 lg:container lg:mx-auto w-full h-full">
					<slot />
				</div>
			</div>
		</section>
	</section>
</div>

<AlertDialog
	bind:open={showAlert}
	message="Are you sure you want to sign out?"
	on:cancel={() => (showAlert = false)}
	on:yes={signOut}
/>
