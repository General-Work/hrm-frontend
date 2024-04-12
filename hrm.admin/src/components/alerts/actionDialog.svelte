<script lang="ts">
  import type { IModalSize } from "$cmps/ui/modal.svelte";
  import { Button, Modal } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  export let open = false;
  export let text = "";
  export let title = "";
  export let acceptText = "I accept";
  export let declineText = "Decline";
  export let size:IModalSize = 'sm'
  const dispatch = createEventDispatcher();
  let color: "red" | "green" | "blue" | "yellow" | "primary" = "primary";
</script>

<Modal
  {title}
  bind:open
  {color}
  {size}
  on:close={() => dispatch("close")}
  backdropClass="fixed inset-0 z-[1000] bg-gray-900 bg-opacity-30 dark:bg-opacity-80"
  dialogClass="fixed top-0 start-0 end-0 h-modal md:inset-0 md:h-full z-[1100] w-full p-4 flex"
>
  <div class="text-base leading-relaxed">
    {text}
  </div>
  <svelte:fragment slot="footer">
    <Button on:click={() => dispatch("accept")} {color}>{acceptText}</Button>
    <Button color="alternative" on:click={() => dispatch("close")}
      >{declineText}</Button
    >
  </svelte:fragment>
</Modal>
