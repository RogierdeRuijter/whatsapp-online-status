<script>

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
	}).then(checkError);
</script>

<div>

</div>

<style></style>
