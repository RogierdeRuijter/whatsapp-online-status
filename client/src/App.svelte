<script>
	import SignButton from './SignButton/SignButton.svelte';
	import { signedStore, genericErrorStore, alreadySignedErrorStore } from './store.js'
	import websocketStore from "svelte-websocket-store";

	const initialValue = { };
	export const myStore = websocketStore("ws://localhost:8080", initialValue);

	// send JSON to websocket server
	// $myStore = { content: "to be saved", other_values: "all" };

	// receive JSON from server (push)
	let response = $myStore;
	console.log('response');
	console.log(response);

	var allcookies = document.cookie;
	var arrayb = allcookies.split(";");
	$signedStore = arrayb[0].includes('signed=true');
</script>

<main>
	<p>This is a petition for creating an option within whatsapp to remove the online status</p>
	
	<SignButton />

	{#if $signedStore}
		<p class="bold">Thanks for signing the petition!</p>
	{/if}
	{#if $genericErrorStore}
		<p class="bold">You are currently not able to sign the petition, because an error occured.</p>
	{/if}
	{#if $alreadySignedErrorStore}
		<p class="bold">You have already signed the petition, you can't sign it again, you sneaky bastard :)</p>
	{/if}

	<p>Total amount of votes: {$myStore.count}</p>
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
