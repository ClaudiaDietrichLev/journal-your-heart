import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";

const ApiURL = "http://localhost:4730";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      sessionTypes: [
        {
          id: Number,
          title: String,
          prompts: [{ question: String }],
        },
      ],
      selectedSessions: [],

      newSession: {
        ID: Number,
        actualDate: Date,
        done: Boolean,
        prompts: [
          {
            session: Number,
            question: String,
            answered: Boolean,
          },
        ],
      },
    };
  },
  mutations: {
    getSessionTypes(state, result) {
      state.sessionTypes = result;
    },
    fillSessionList(state, result) {
      state.selectedSessions = result;
    },
  },
  actions: {
    async getDataFromApi(state) {
      const response = await fetch(ApiURL + "/sessionType/");
      const result = await response.json();

      state.commit("getSessionTypes", result);
    },
  },
});

createApp(App).use(router).use(store).mount("#app");

//CSS Reset import
import "@/assets/css/normalize.css";
