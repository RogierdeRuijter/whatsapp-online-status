<script>
	import {signedStore, errorStore} from '../store.js';
	import FingerprintJS from '@fingerprintjs/fingerprintjs'

  let showRetryLabel = false;
	let loading = false;

	const checkError = (response) => {
		if (response.status >= 200 && response.status <= 299) {
			return response.json();
		} else {
			throw Error(response.statusText);
		}
	}

	const handleClick = async () => {
		loading = true;
		$errorStore = false;
		
		const fpPromise = FingerprintJS.load();
		const fp = await fpPromise;
		const fingerprint = await fp.get();
		
		fetch('http://localhost:3000/sign', {
			// TODO: Add back in when content type bug is resolved
    	headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({visitorId: fingerprint.visitorId})
		}).then(checkError)
			.then(() => {
			$errorStore = false;
			$signedStore = true;
		}).catch(() => {
			$signedStore = false;
			$errorStore = true;
			showRetryLabel = true;
		}).finally(() => {
			loading = false;
		});
	}
</script>

<button on:click={handleClick} disabled={$signedStore || loading}>
  {#if showRetryLabel}
    Retry
  {:else}
    Sign
  {/if}
</button>
