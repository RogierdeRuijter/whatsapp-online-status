<script>
	function handleClick(event) {
		fetch('http://localhost:3000/sign', {
			method: "POST"
		}).then(response => {
			console.log(response);
		})
	}
</script>

<main>
	<p>This is a petition for creating an option within whatsapp to remove the online status</p>
	<button on:click={handleClick}>Sign</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
