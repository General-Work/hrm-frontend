<script>
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import error from "$lib/images/error.png";
  import Button from "$cmps/ui/button.svelte";

  function goBack() {
    if (browser) window.history.back();
  }
</script>

<div class="w-screen h-screen">
  <div class="w-full h-full flex flex-col">
    <div class="flex justify-center pt-24 2xl:pt-52">
      <img src={error} alt="" class="w-[500px]"/>
    </div>
    <p class="text-6xl text-center font-medium text-red-600 py-6">
      Error {$page.status}!!!
    </p>
    <p class="text-3xl text-center">{$page.error?.message}</p>
    <div class="px-4 flex justify-center mt-6">
      <Button label="Go Back" leadingIcon="bx:arrow-back" color="primary" on:click={goBack}/>
    </div>
  </div>
</div>
