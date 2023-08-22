<template>
	<div id="app" :class="weatherClass">
		<div class="main">
			<div class="search-box">
				<input
					@keyup.enter="searchWeather(city)"
					@input="handleSearchInput"
					v-model="city"
					type="text"
					class="search-input"
					placeholder="Search..."
				/>
				<SearchCityList />
			</div>
			<div v-if="!loading || weatherData" class="weather-wrap">
				<div class="location-box">
					<div class="location">
						{{ weatherData.name }},
						{{ weatherData.sys.country }}
					</div>
					<div class="date">
						{{ formatDate(weatherData.dt) }}
					</div>
				</div>

				<div class="weather-box">
					<div class="temperature">
						{{ convertToCelsius(weatherData.main.temp) }}°C
					</div>
					<div class="weather">
						<div>
							<p>
								{{ weatherData.weather[0].description }}
							</p>
							<img :src="weatherIcon" alt="Weather Icon" />
						</div>
						<div class="weather-cards">
							<div class="card-box">
								<div class="card">
									<p class="card-header">MAX</p>
									<P>{{ convertToCelsius(weatherData.main.temp_max) }}</P>
								</div>
								<div class="card">
									<p class="card-header">MIN</p>
									<p>
										{{ convertToCelsius(weatherData.main.temp_min) }}
									</p>
								</div>
								<div class="card">
									<p class="card-header">SUNRISE</p>
									<P>{{ getTime(weatherData.sys.sunrise) }}</P>
								</div>
								<div class="card">
									<p class="card-header">SUNSET</p>
									<p>
										{{ getTime(weatherData.sys.sunset) }}
									</p>
								</div>
							</div>
							<div class="card-box">
								<div class="card">
									<p class="card-header">WIND SPEED</p>
									<p>{{ weatherData.wind.speed }}km/h</p>
								</div>
								<div class="card">
									<p class="card-header">VISIBILITY</p>
									<p>
										{{ weatherData.visibility }}
									</p>
								</div>
								<div class="card">
									<p class="card-header">PREASURE</p>
									<p>
										{{ weatherData.main.pressure }}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--  -->
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SearchCityList from "@/components/SearchCityList.vue";

export default {
	name: "App",
	components: {
		SearchCityList,
	},
	data() {
		return {
			city: "",
			loading: false,
			defaultCity: "london",
		};
	},
	async created() {
		await this.searchWeather(this.defaultCity);
	},
	computed: {
		...mapState(["weatherData", "apiKey", "urlBase"]),
		weatherClass() {
			const weatherType = this.weatherData.weather[0].main.toLowerCase();
			return `weather-${weatherType}`;
		},
		weatherIcon() {
			const weatherType = this.weatherData.weather[0].main.toLowerCase();
			return require(`./assets/svg/${weatherType}.svg`); // Шлях до іконки відносно папки src
		},
	},
	methods: {
		...mapActions(["fetchWeather", "handleCityInput"]),
		async searchWeather(city) {
			try {
				await this.fetchWeather(city);
			} catch (error) {
				console.error("Error fetching weather:", error);
			}
			this.city = "";
		},

		handleSearchInput() {
			console.log(this.city);
			this.handleCityInput(this.city);
		},
		formatDate(epochTime) {
			const date = new Date(epochTime * 1000);
			const options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			return date.toLocaleDateString("en-US", options);
		},
		getTime(timestamp) {
			const date = new Date(timestamp * 1000);
			const hours = date.getHours();
			const minutes = date.getMinutes();
			return `${hours}:${minutes}`;
		},
		convertToCelsius(kelvin) {
			return (kelvin - 273.15).toFixed(0);
		},
	},
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

img {
	max-width: 200px;
}

body {
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

#app {
	background-size: cover;
	background-position: bottom;
	transition: 0.7s;
}

/* backgrounds */
.weather-clear {
	background-image: url(./assets/bg/clear.jpg);
}

.weather-clouds {
	background-image: url(./assets/bg/clouds.jpg);
}

.weather-rain {
	background-image: url(./assets/bg/rain.jpg);
}

.weather-thunderstorm {
	background-image: url(./assets/bg/thunderstorm.jpg);
}

.main {
	min-height: 100vh;
	padding: 20px;
	background: linear-gradient(
		to bottom,
		rgba(18, 18, 18, 0.259),
		rgba(255, 255, 255, 0.582)
	);
}

.search-box {
	width: 100%;
	margin-bottom: 30px;
}

.search-input {
	display: block;
	width: 100%;
	padding: 15px;
	color: #2a2828b3;
	font-size: 20px;
	appearance: none;
	border: none;
	outline: none;

	background-color: rgba(255, 255, 255, 0.3);
	border-radius: 30px;
	transition: 0.4s;
}

.search-input:focus {
	background-color: rgba(255, 255, 255, 0.6);
}

.location-box .location {
	color: #f0eeee;
	font-size: 32px;
	font-weight: 500;
	text-align: center;
	text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
	color: #f0eeee;
	font-size: 20px;
	font-style: italic;
	font-weight: 300;
	text-align: center;
}

.weather-box {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.weather-box .temperature {
	display: inline-block;
	padding: 10px 35px;
	color: #f0eeee;
	font-size: 102px;
	font-weight: 900;

	text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 20px;
	box-shadow: 3px 6px rgba(0, 0, 0, 0.2);
	margin: 20px 0;
}

.weather-box .weather {
	max-width: 700px;

	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 20px;
	box-shadow: 3px 6px rgba(0, 0, 0, 0.253);
	padding: 20px 40px;

	color: #f0eeee;
	font-size: 48px;
	font-weight: 700;
	text-shadow: 3px 6px rgba(0, 0, 0, 0.2);
}

.weather-cards {
	display: flex;
	flex-direction: column;
	row-gap: 20px;
}

.card-box {
	font-size: 16px;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	align-items: center;
	column-gap: 20px;
}

.card {
	padding: 10px;

	color: #686565;
	display: flex;
	flex-direction: column;
	row-gap: 10px;
}

.card-header {
	color: rgb(73, 79, 95);
}

@media (max-width: 425px) {
	.weather-cards {
		flex-direction: row;
		justify-content: space-between;
	}

	.card-box {
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
