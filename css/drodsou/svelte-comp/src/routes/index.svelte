<script>

import Icon from '../lib/icon.svelte';


let i = `forbidden`;

setTimeout(()=>{
  i = "arrow-right";
}, 1000);

</script>

<style>
  /* x-icon {
    fill: teal;
    width: 40px;
  } */

</style>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<!-- ICON: <x-icon type="forbidden"></x-icon> -->
ICON:<x-icon type={i}></x-icon>
<button on:click={()=>document.querySelector('x-toast').show(`toast <b>${Date.now()}</b>`)}>show toast</button>

<hr/>

<Icon type={i} />

