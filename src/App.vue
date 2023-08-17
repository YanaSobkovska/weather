<template>
	<div id="app">
		<div class="main">
			<div class="search-box">
				<input
					@keyup.enter="fetchWeather"
					v-model="city"
					type="text"
					class="search-input"
					placeholder="Search..."
				/>
			</div>
      <spinner :is-loading="loading"/>
      <div v-if="!loading && weatherDataCurrent" class="weather-wrap">
				<div class="location-box">
					<div class="location">
						{{ weatherDataLocation.name }}, {{ weatherDataLocation.country }}
					</div>
					<div class="date">
						<!-- {{ getFormattedDate(weatherDataCurrent.last_updated_epoch) }} -->
					</div>
				</div>

				<div class="weather-box">
					<div class="temperature">{{ weatherDataCurrent.temp_c }} °C</div>
					<!-- <div class="weather">{{ weatherDataCurrent.condition.text }}</div> -->
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
import axios from "axios";
import spinner from "./components/spinner.vue";

export default {
	name: "App",
	data() {
		return {
			apiKey: "b4a44c41b04e4f5ca87155314231708",
			urlBase: " http://api.weatherapi.com/v1",
			city: "",
			weatherDataLocation: {},
			weatherDataCurrent: {},
      loading: false
		};
	},
  components: {
    spinner
  },
	methods: {
		async fetchWeather() {
      this.loading = true
			const response = await axios.get(
				`${this.urlBase}/current.json?key=${this.apiKey}&q=${this.city}`
			);

			this.weatherDataLocation = response.data.location;
			this.weatherDataCurrent = response.data.current;
      setTimeout(() => {
        this.loading = false
      }, 2000)
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

body {
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

#app {
	background: url(./assets/background.jpg);
	background-size: cover;
	background-position: bottom;
	text-replace: 0.4s;
}

.main {
	min-height: 100vh;
	padding: 20px;
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.25),
		rgba(0, 0, 0, 0.35)
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
	color: #313131;
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

.weather-wrap {
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
	color: #f0eeee;
	font-size: 48px;
	font-weight: 700;
	text-shadow: 3px 6px rgba(0, 0, 0, 0.2);
}
</style>
