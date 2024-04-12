<script lang="ts">
  export let href: string | null = null;
</script>

<a
  class="font-medium py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex cursor-pointer"
  {href}
  on:click><slot /></a
>
