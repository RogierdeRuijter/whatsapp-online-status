<script>
	// TODO: move the logic to receive the total amount of votes from the websockets in this component
	// 	Currently this is not possible since the websockets break the tests, but when there is a fix for this move this in here
	export let totalAmountOfVotes;

	let milestone = '1';
	// TODO: base this on the milestone
	const total = 100;

	let progress = (totalAmountOfVotes / total) * 100

	const checkError = (response) => {
		if (response.status >= 200 && response.status <= 299) {
			return response;
		} else {
			throw Error(response.status);
		}
	};
	fetch('http://localhost:3000/milestones', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'GET'
		// TODO: figure out if credentials are needed for this API call
		// credentials: 'include', // This is used to set the cookie returned by the API
	}).then(checkError)
	.then((currentMilestone) => {
		milestone = currentMilestone
		});
</script>

<!-- IDEA: Increase a counter instead of a progress bar to visualize the contributuion more. 
			The ultimate goal is give the user the most satification in contributing -->
<!-- TODO: Add congratulations message here: We are 1 step closer to reaching our ultimate goal! Thanks for your contribution :D -->
<!-- TODO: Add share option: Share this petition with Friends and Family that want a more mental healthy internet -->

<h2>Milestones</h2>
<div class="align-center">
	<div>
		0
	</div>
	<div class="progress-bar-shell">
		<div class="progress-bar" style="--progress:{(progress + '%')}"></div>	
	</div>
	<div>
		{milestone}
	</div>
</div>

<style>
	.align-center {
		display: flex;
		align-items: center;
	}

	.progress-bar-shell {
		position: relative;
		width: 500px;
		height: 25px;
		border: 1px solid black;
	}

	.progress-bar {
		position: absolute;
		height: 25px;
		width: var(--progress, 0px);
		background-color: black;
	}
</style>
