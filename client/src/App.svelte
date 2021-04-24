<script>
	import SignButton from './SignButton/SignButton.svelte';
	import { signedStore, errorStore } from './store.js'
</script>

<main>
	<p>This is a petition for creating an option within whatsapp to remove the online status</p>
	
	<SignButton />

	{#if $signedStore}
		<p class="bold">Thanks for signing the petition!</p>
	{/if}
	{#if $errorStore}
		<p class="bold">You are currently not able to sign the petition, because an error occured.</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.bold {
		font-weight: bold;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
