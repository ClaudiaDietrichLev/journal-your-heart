import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      sessionTypes: [
        {
          sessionID: Number,
          sessionTitle: String,
          prompts: [
            {
              question: String,
              lastUsed: null,
            },
          ],
        },
      ],
      newSession: {
        ID: Number,
        actualDate: Date,
        type: Number,
        done: Boolean,
        sessionType: [
          {
            sessionID: Number,
            sessionTitle: String,
            prompts: [
              {
                question: String,
                answered: Boolean,
              },
            ],
          },
        ],
      },
      ApiUrl: "http://localhost:4730",
    };
  },
  mutations: {
    increment(state) {
      console.log(state);
    },
  },
  actions: {
    async getAllSessions() {
      const response = await fetch(this.ApiURL + "/sessionType/");

      const result = await response.json();
      console.log(result);
    },
  },
});

createApp(App).use(router).use(store).mount("#app");

//CSS Reset import
import "@/assets/css/normalize.css";
