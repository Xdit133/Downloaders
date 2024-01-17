document.addEventListener('DOMContentLoaded', function() {
	const fetchButton = document.getElementById('fetchTikTok');
	const loadingSpinner = document.querySelector('.loading-spinner');

	fetchButton.addEventListener('click', function() {
		const igUrlInput = document.getElementById('tiktokUrl');
		const tiktokContent = document.getElementById('tiktok-content');

		function formatK(num) {
			return new Intl.NumberFormat('en-US', {
				notation: 'compact',
				maximumFractionDigits: 1
			}).format(num);
		}

		loadingSpinner.style.display = 'block';
		fetch('https://skizo.tech/api/igdl', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'https://skizo.tech'
				},
				body: JSON.stringify({
					url: igUrlInput.value
				})
			})
			.then(response => response.json())
			.then(data => {
				loadingSpinner.style.display = 'none';
				if (data.data?.media?.length) {
					igContent.innerHTML = "";
					for (var x = 0; x < data.data.media.length; x++) {
						igContent.innerHTML += `<img src="${data.data.media[x]}" width="100%" height="25%"></img><br>`;
					}
				} else {
					igContent.innerHTML = `
        <iframe src="${data.data.media}" width="100%" height="200px" frameborder="50"></iframe>
        <h5 class="card-title">${formatK(data.data.caption)}</h5>
        <p class="card-text download-buttons">
          <button class="btn btn-success" onclick="window.open('${data.data.media}', '_blank')">SD</button>
        </p>
      `;
				}
			})
			.catch(error => {
				loadingSpinner.style.display = 'none';
				igContent.innerHTML = `ah sorry I couldn't find it`
				console.error('Error fetching Instagram data:', error);
			});
	});
});