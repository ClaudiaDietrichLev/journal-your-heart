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
          sessionID: Number,
          sessionTitle: String,
        },
      ],
      prompts: [
        {
          promptID: Number,
          prompt: String,
          session: Number,
        },
      ],
      newSession: {
        ID: Number,
        actualDate: Date,
        type: Number,
        done: Boolean,

        prompts: [
          {
            promptID: Number,
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
  },
  actions: {
    async getAllSessionsTypes(state) {
      const response = await fetch(ApiURL + "/sessionType/");
      const result = await response.json();
      state.commit("getSessionTypes", result);
    },
    async getAllPrompts(state) {
      const response = await fetch(ApiURL + "/journaling-prompts/");
      const result = await response.json();
      console.log(result);
      state.commit("getPrompts", result);
    },
  },
  getters: {
    getNumberofPrompts: (state) => (id) => {
      return state.prompts.filter((prompt) => prompt.sessionType === id).length;
    },
  },
});

createApp(App).use(router).use(store).mount("#app");

//CSS Reset import
import "@/assets/css/normalize.css";
