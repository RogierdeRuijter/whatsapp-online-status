<script>
	import {
		signedStore,
		genericErrorStore,
		alreadySignedErrorStore,
	} from "../store.js";
	import FingerprintJS from "@fingerprintjs/fingerprintjs";
	import Canvas from "../Canvas/Canvas.svelte";

	// Here a boolean variable is needed because when the user resigns the petition after an error
	// We want to keep displaying the retry button and not go back to the sign button
	// This would happen if we would take the genericErrorStore to determine if the retry button should be shown
	let showRetryLabel = false;
	let loading = false;

	// TODO: Move this to its own file
	function shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	let currentIndex = 0;
	let imageNames = [
		"fiets_crew.jpeg",
		"hand.jpeg",
		"hond.jpeg",
		"kat.jpeg",
		"lidl.jpeg",
		"muis.jpeg",
		"padestoelen.jpeg",
		"rat.jpeg",
		"siddharta.jpeg",
		"skaten.jpeg",
		"smiley.jpeg",
		"straat.jpeg",
		"talking.jpeg",
		"toren.jpeg",
		"verfen_joost.jpeg",
		"verfen_rogier.jpeg",
		"vrouw.jpeg",
	];

	imageNames = shuffle(imageNames);

	let src = "images/" + imageNames[0];

	const checkError = (response) => {
		if (response.status >= 200 && response.status <= 299) {
			return response;
		} else {
			throw Error(response.status);
		}
	};

	const handleClick = async () => {
		loading = true;
		$genericErrorStore = false;
		
		// TODO: get canvas here and export it to data url and sent it to the backend
		// canvas.toDataURL() 
		// Maybe we need to raise the state to get canvas object here

		const fpPromise = FingerprintJS.load();
		const fp = await fpPromise;
		const fingerprint = await fp.get();

		fetch("http://localhost:3000/sign", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			credentials: "include", // This is used to set the cookie returned by the API
			body: JSON.stringify({ visitorId: fingerprint.visitorId }),
		})
			.then(checkError)
			.then(() => {
				$genericErrorStore = false;
				$signedStore = true;
			})
			.catch((error) => {
				$signedStore = false;
				if (error.message === "403") {
					$alreadySignedErrorStore = true;
				} else {
					$genericErrorStore = true;
					showRetryLabel = true;
				}
			})
			.finally(() => {
				loading = false;
			});
	};

	const nextImage = () => {
		currentIndex = currentIndex + 1;

		if (currentIndex === imageNames.length - 1) {
			currentIndex = 0;
		}

		src = "images/" + imageNames[currentIndex];
	};
</script>

<div style="display: flex; align-items: center; justify-content: space-around">
	<div style="display: flex; align-items: center;">
		<Canvas />
		<div style="margin-left: 20px">
			<div>Inspiration</div>
			<img {src} width="400" />
			<!-- // TODO: move inspo to its own component and write some tests -->
			<div><button on:click={nextImage}>More inspo</button></div>
		</div>
	</div>
</div>
<button
	on:click={handleClick}
	disabled={$signedStore || $alreadySignedErrorStore || loading}>
	{#if showRetryLabel}Retry{:else}Sign{/if}
</button>
