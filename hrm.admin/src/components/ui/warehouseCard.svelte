<script>
  import { Avatar } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let name = "";
  export let initial = "";
  const dispatch = createEventDispatcher();
</script>

<div class="shadow bg-white">
  <div class="px-4 py-10 flex flex-col gap-6">
    <div class="flex justify-center">
      <div class="flex flex-col gap-3">
        <div class="flex justify-center">
          <Avatar size="lg" class="text-xl">{initial}</Avatar>
        </div>
        <p>{name}</p>
      </div>
    </div>
    <div class="flex justify-center gap-3">
      <button
        on:click={() => dispatch("edit")}
        class="bg-blue-300 text-sm hover:bg-blue-500 px-3 rounded-[4px] py-0.5 hover:text-white"
        >Edit</button
      >
      <button
        on:click={() => dispatch("manage")}
        class="bg-teal-300 text-sm hover:bg-teal-500 px-3 rounded-[4px] hover:text-white"
        >Manage</button
      >
      <button
        on:click={() => dispatch("close")}
        class="bg-red-300 text-sm hover:bg-red-500 px-3 rounded-[4px] hover:text-white"
        >Close</button
      >
    </div>
  </div>
</div>
