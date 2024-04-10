<script lang="ts">
  import { clickOutsideAction, hotKeyAction } from "svelte-legos"
  import { createEventDispatcher } from "svelte"
  import { searchResult, quickActions, recentSearches, search } from "$svc/command"
	// import toast from "svelte-french-toast";
	import { goto } from "$app/navigation";
	// import { routeParameters, type IPageAction } from "$data/appStore";
	import debounce from "lodash/debounce";

  const dispatch = createEventDispatcher()

  let searchInput: string = ""
  let busy = false

  const close = () => dispatch("close")
  async function doSearch(input: string) {
    busy = true
    try {
      let ret = await search(input)
      console.log({ret})
    } finally {
      busy = false
    }
  }
  const searchWithTerm = debounce(doSearch, 300)
  $: searchWithTerm(searchInput)

  // const handle = (entry: IPageAction) => (e) => {
  //   if (!entry.action?.name) {
  //     toast.error(`No known action for ${entry.title}`)
  //     return
  //   }   
  //   if (entry.action.name.startsWith("/")) { // possibly navigation
  //     routeParameters.set({ url: entry.action.name, props: entry.action.props})
  //     goto(entry.action.name)
  //     close()
  //     return
  //   }
  //   toast.error(`No known action for ${entry.title}`)
  // }
</script>



<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="relative z-20 pallete" role="dialog" aria-modal="true" use:hotKeyAction={{ code: "Escape", cb: () => dispatch("close")}}>
  <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"></div>

  <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
    <!--
      Command palette, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 scale-95"
        To: "opacity-100 scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    -->
    <div class="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all" use:clickOutsideAction on:clickoutside={close}>
      <div class="relative">
        <iconify-icon icon="ion:search-outline" class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-900 text-opacity-40 text-2xl" />
        <input type="text" bind:value={searchInput} class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 focus:ring-0 sm:text-sm" placeholder="Search...">
      </div>

      <!-- Default state, -->
      <ul class="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto">
        {#if busy}
          <li>
            <div class="w-full h-full grid items-center justify-center p-5">
              <iconify-icon
                class="text-[#cbc3fa]"
                icon="svg-spinners:blocks-shuffle-3"
                style="font-size: 50px;"
              />
            </div>          
          </li>
        {:else if $searchResult.length}
          <ul class="max-h-96 overflow-y-auto p-2 text-sm text-gray-700">
            {#each $searchResult as entry}
              <li class="flex">
                <button class="group flex cursor-pointer select-none items-center rounded-md px-3 py-2 hover:bg-gray-900 hover:bg-opacity-5 w-full text-left" on:click={handle(entry)}>
                  <iconify-icon icon={entry.icon} class="text-3xl text-gray-900 text-opacity-40 group-hover:text-opacity-100 group-hover:text-teal-600"/>
                  <span class="ml-3 flex-auto truncate text-opacity-40 group-hover:text-opacity-100 group-hover:text-teal-600">{entry.title}</span>

                </button>
              </li>
            {/each}
          </ul>
        {:else}
          <div class="px-6 py-14 text-center sm:px-14" class:hidden={!searchInput}>
            <iconify-icon icon="et:search" class="text-orange-500 text-3xl"/>
            <p class="mt-4 text-sm text-gray-900">We couldn't find any actions with this term. Please try again.</p>
          </div>
        {/if}
        {#if $recentSearches.length}
        <li class="p-2">
          <h2 class="mb-2 mt-4 px-3 text-xs font-semibold text-gray-900">Recent searches</h2>
          <ul class="text-sm text-gray-700">
            {#each $recentSearches as entry}
            <li class="group flex select-none items-center rounded-md px-3 py-2 hover:bg-gray-900 hover:text-gray-900 hover:bg-opacity-5 cursor-pointer">
              <iconify-icon icon={entry.icon} class="text-3xl"/>
              <span class="ml-3 flex-auto truncate">{entry.title}</span>
              {#if entry.subTitle}
              <span class="ml-3 hidden flex-none text-gray-500 group-hover:block">{entry.subTitle}</span>
              {/if}
            </li>
            {/each}
          </ul>
        </li>
        {/if}
        {#if $quickActions.length}
        <li class="p-2">
          <h2 class="sr-only">Quick actions</h2>
          <ul class="text-sm text-gray-700">
            {#each $quickActions as entry}
            <li class="group flex cursor-pointer select-none items-center rounded-md px-3 py-2 hover:bg-gray-900 hover:bg-opacity-5">
              <iconify-icon icon={entry.icon} class="text-3xl text-gray-900 text-opacity-40 group-hover:text-opacity-100 group-hover:text-teal-600"/>
              <span class="ml-3 flex-auto truncate text-opacity-40 group-hover:text-opacity-100 group-hover:text-teal-600">{entry.title}</span>
              {#if entry.hotKey}
                <span class="ml-3 flex-none text-xs font-semibold text-gray-500 group-hover:text-teal-600">
                  {#if entry.hotKey.ctrl}<kbd class="font-sans">⌘</kbd>{/if}
                  {#if entry.hotKey.shift}<kbd class="font-sans">⇧</kbd>{/if}
                  {#if entry.hotKey.alt}<kbd class="font-sans">⎇</kbd>{/if}
                  {#if entry.hotKey.meta}<kbd class="font-sans">◆</kbd>{/if}
                  <kbd class="font-sans">{entry.hotKey.key}</kbd>
                </span>
              {/if}
            </li>
            {/each}
          </ul>
        </li>
        {/if}

      </ul>
    </div>
  </div>
</div>
