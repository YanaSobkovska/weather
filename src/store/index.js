import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey: "52893b27bedcb7285aca836f12f2a4fb",
    urlBase: "https://api.openweathermap.org/data/2.5/",
    weatherData: null,
  },
  getters: {},
  mutations: {
    setWeatherData(state, data) {
      state.weatherData = data;
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
  },
  modules: {},
  plugins: [createPersistedState()],
});
