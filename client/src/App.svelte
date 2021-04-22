<script>
	let signed = false;
	let error = false;
	// TODO: Add error handling here
	function handleClick() {
		signed = false;
		error = false;

		fetch('http://localhost:3000/sign', {
			method: "POST"
		}).then(() => {
			signed = true;
		}).catch(() => {
			error = true;
		});
	}
</script>

<main>
	<p>This is a petition for creating an option within whatsapp to remove the online status</p>
	<button on:click={handleClick} disabled={signed}>
		{#if !error}
			Sign
		{:else}
			Retry
		{/if}
	</button>
	{#if signed}
		<p>Thanks for signing the petition!</p>
	{/if}
	{#if error}
		<p>You are currently not able to sign the petition, because an error occured.</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
