window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(
		'.temperature-description'
	);
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature');
	const temperatureSpan = document.querySelector('.temperature span');
	let dailySummary = document.querySelector('.daily-summary');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			console.log(position);

			const proxy = 'https://cors-anywhere.herokuapp.com/';

			const api = `${proxy}https://api.darksky.net/forecast/50c97ee00419a56fa234933f594e1b98/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);

					const { temperature, summary, icon } = data.currently;

					//Set DOM Elements from API

					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
					dailySummary.textContent = data.daily.summary;

					//Formula for Celsius
					let celsius = (temperature - 32) * (5 / 9);
					setIcons(icon, document.querySelector('#icon'));

					//Change temp from Cel/Farenheight

					temperatureSection.addEventListener('click', () => {
						if (temperatureSpan.textContent === 'F') {
							temperatureSpan.textContent = 'C';
							temperatureDegree.textContent = Math.floor(celsius);
						} else {
							temperatureSpan.textContent = 'F';
							temperatureDegree.textContent = temperature;
						}
					});
				});
		});
	}

	function setIcons(icon, iconId) {
		const skycons = new Skycons({ color: 'white' });
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconId, Skycons[currentIcon]);
	}
});
