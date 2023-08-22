import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		apiKeyGoogleApi: "AIzaSyDZNT1E8g3Tr08sWw9FK-hrIsS2k3Hb1kE",
		apiKey: "52893b27bedcb7285aca836f12f2a4fb",
		urlBase: "https://api.openweathermap.org/data/2.5/",
		previousCity: "",
		searchResults: [],
		weatherData: null,
	},
	getters: {},
	mutations: {
		setWeatherData(state, data) {
			state.weatherData = data;
		},
		setSearchResults(state, results) {
			state.searchResults = results;
		},
	},
	actions: {
		async fetchWeather({ commit, state }, city) {
			try {
				const response = await axios.get(
					`${state.urlBase}weather?q=${city}&appid=${state.apiKey}`
				);
				commit("setWeatherData", response.data);
			} catch (error) {
				console.error("Error fetching weather:", error);
			}
		},
		async handleCityInput({ state, commit }, city) {
			if (city.length > 2 && city !== state.previousCity) {
				state.previousCity = city;
				try {
					const response = await axios.get(
						`https://maps.googleapis.com/maps/api/geocode/json`,
						{
							params: {
								address: city,
								key: state.apiKeyGoogleApi,
							},
						}
					);
					commit("setSearchResults", response.data.results);
				} catch (error) {
					console.error("Error fetching search results:", error);
				}
			} else if (city.length <= 2) {
				commit("setSearchResults", []);
			}
		},
	},
	modules: {},
	plugins: [createPersistedState()],
});
