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
          numberOf: Number,
        },
      ],
      prompts: [
        {
          id: Number,
          session: Number,
          prompt: String,
        },
      ],

      selectSessionTypes: [],

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

    getPrompts(state, result) {
      state.prompts = result;
    },

    fillSelectSessionTypes(state, result) {
      state.selectSessionTypes = result;
    },
  },
  actions: {
    async getSessionTypesFromApi(state) {
      const response = await fetch(ApiURL + "/sessionType/");
      const result = await response.json();

      state.commit("getSessionTypes", result);
    },

    async getPromptsFromApi(state) {
      const response = await fetch(ApiURL + "/prompts/");
      const result = await response.json();

      state.commit("getPrompts", result);
    },
  },
  getters: {
    sessionTypes() {
      return this.state.sessionTypes;
    },
  },
});

createApp(App).use(router).use(store).mount("#app");

//CSS Reset import
import "@/assets/css/normalize.css";
