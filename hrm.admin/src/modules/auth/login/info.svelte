<script lang="ts">
  import { onMount } from 'svelte';
  import Typed from 'typed.js';
  import pic from "$lib/images/loginpic.png";

  let el: HTMLSpanElement;

  onMount(() => {
    const typed = new Typed(el, {
      strings: [
        "Welcome to Varaible-X Solutions",
        "Login to continue...",
        "Let's help you optimize HR tasks and goals <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' fillOpacity='0.7' stroke='#ffffff' fill='#ffffff' viewBox='0 0 448 512'><path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z'/></svg>",
        "Manage staff efficiently with ease <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' fillOpacity='0.7' stroke='#ffffff' fill='#ffffff' viewBox='0 0 448 512'><path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z'/></svg>",
        "Provide you with diverse Reports on staff <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' fillOpacity='0.7' stroke='#ffffff' fill='#ffffff' viewBox='0 0 448 512'><path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z'/></svg>",
        "Analytical Dashboard <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' fillOpacity='0.7' stroke='#ffffff' fill='#ffffff' viewBox='0 0 448 512'><path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z'/></svg>",
        "And More....."
      ],
      typeSpeed: 50,
      loop: true,
      backDelay: 4000
    });

    return () => {
      typed.destroy();
    };
  });

</script>

<div class="w-full bg-cover hidden lg:block relative max-w-md lg:max-w-2xl lg:w-7/12 mx-2 px-2">
  <div class='bg-pink-100/40 mx-auto h-8 w-fit max-w-3xl rounded-md px-4 mb-8'>
    <span bind:this={el} class='text-white/70 w-max my-auto text-center font-thin font-mono antialiased tracking-tight uppercase text-2xl break-words'></span>
    <nav>

    </nav>
  </div>
  <div class="flex flex-col items-center justify-center w-full h-full relative">
    <img src={pic} alt="pic" class='ml-4 mt-5' />
  </div>
</div>
