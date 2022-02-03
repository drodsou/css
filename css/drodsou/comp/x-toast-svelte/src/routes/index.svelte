<script>

let t = `toast 2`;




setTimeout(()=>{
  console.log('toast 3??')
  t = "toast 3";
}, 2000);

</script>
--
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={()=>document.querySelector('x-toast').show(`toast <b>${Date.now()}</b>`)}>show toast</button>

<p>Tostada: {t}</p>
<x-toast>{t}</x-toast>
