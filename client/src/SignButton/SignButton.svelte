<script>
	import {signedStore, genericErrorStore, alreadySignedErrorStore} from '../store.js';
	import FingerprintJS from '@fingerprintjs/fingerprintjs'
	
	// Here a boolean variable is needed because when the user resigns the petition after an error
	// We want to keep displaying the retry button and not go back to the sign button
	// This would happen if we would take the genericErrorStore to determine if the retry button should be shown
	let showRetryLabel = false;
	let loading = false;

	const checkError = (response) => {
		if (response.status >= 200 && response.status <= 299) {
			return response;
		} else {
			throw Error(response.status);
		}
	}

	const handleClick = async () => {
		loading = true;
		$genericErrorStore = false;
		
		const fpPromise = FingerprintJS.load();
		const fp = await fpPromise;
		const fingerprint = await fp.get();
		
		fetch('http://localhost:3000/sign', {
    	headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			credentials: 'include', // This is used to set the cookie returned by the API
			body: JSON.stringify({visitorId: fingerprint.visitorId})
		}).then(checkError)
			.then(() => {
				$genericErrorStore = false;
				$signedStore = true;
		}).catch((error) => {
				$signedStore = false;
				if (error.message === '403') {
					$alreadySignedErrorStore = true;
				} else {
					$genericErrorStore = true;
					showRetryLabel = true;
				}
		}).finally(() => {
				loading = false;
		});
	}
</script>

<button on:click={handleClick} disabled={$signedStore || $alreadySignedErrorStore|| loading }>
  {#if showRetryLabel}
		Retry
  {:else}
    Sign
  {/if}
</button>
