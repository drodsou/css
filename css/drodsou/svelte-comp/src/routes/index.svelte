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

<h1>x-toast</h1>

<x-toast></x-toast>
<button on:click={()=>document.querySelector('x-toast').show(`toast <b>${Date.now()}</b>`)}>show toast</button>


<h1>x-icon & Icon</h1>

<x-icon type={i}></x-icon>
<Icon type={i} />

