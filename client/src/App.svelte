<script>
	let signed = false;
	let error = false;
	let showRetryLabel = false;
	let loading = false;

	function handleClick() {
		loading = true;
		error = false;

		fetch('http://localhost:3000/sign', {
			method: "POST"
		}).then(() => {
			error = false;
			signed = true;
		}).catch(() => {
			signed = false;
			error = true;
			showRetryLabel = true;
		}).finally(() => {
			loading = false;
		});
	}
</script>

<main>
	<p>This is a petition for creating an option within whatsapp to remove the online status</p>
	
	<button on:click={handleClick} disabled={signed || loading}>
		{#if showRetryLabel}
			Retry
		{:else}
			Sign
		{/if}
	</button>

	{#if signed}
		<p class="bold">Thanks for signing the petition!</p>
	{/if}
	{#if error}
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
