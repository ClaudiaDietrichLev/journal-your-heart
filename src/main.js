import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import randomInt from "random-int";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      // sessionTypes
      sessionTypes: [
        {
          id: 1,
          title: "start in the day",
          prompts: [
            {
              id: 1,
              prompt:
                "Was sind drei Dinge, für die ich heute Morgen dankbar bin?",
            },
            {
              id: 2,
              prompt:
                "Was sind drei Gefühle, die ich heute fühlen möchte? Was kann mich dabei unterstützen, diese Gefühle zu fühlen?",
            },
            {
              id: 3,
              prompt:
                "Wie möchte ich mich am Ende des Tages fühlen? Wie kann ich dafür sorgen?",
            },
            {
              id: 4,
              prompt:
                "Was ist heute meine Priorität? Warum ist das meine Priorität?",
            },
            {
              id: 5,
              prompt: "Was sind drei Dinge, die ich heute schaffen möchte?",
            },
            {
              id: 6,
              prompt: "Was möchte ich heute für mich tun?",
            },
            {
              id: 7,
              prompt: "Worauf freue ich mich heute?",
            },
            {
              id: 8,
              prompt:
                "Welchem Lebensbereich möchte ich heute besonders viel Zeit und Energie schenken? Warum genau diesem?",
            },
            {
              id: 9,
              prompt: "Wie kann ich mir heute etwas Gutes tun?",
            },
            {
              id: 10,
              prompt:
                "Woran darf ich mich im Laufe des Tages immer wieder erinnern?",
            },
            {
              id: 11,
              prompt:
                "Was habe ich gestern gemacht, worauf ich heute stolz bin?",
            },
            {
              id: 12,
              prompt:
                "Was sind zurzeit meine drei wichtigsten Ziele? Wie kann ich ihnen heute einen Schritt näher kommen?",
            },
            {
              id: 13,
              prompt: "Was braucht mein Körper heute?",
            },
            {
              id: 14,
              prompt:
                "Welche positiven Worte/positive Affirmation dürfen/darf mich heute durch meinen Tag begleiten?",
            },
            {
              id: 15,
              prompt: "Wer möchte ich heute für mich und andere sein?",
            },
          ],
        },
        {
          id: 2,
          title: "daily reflexion at the evening",
          prompts: [
            {
              id: 1,
              prompt: "Was war das Beste an meinem Tag heute?",
            },
            {
              id: 2,
              prompt: "Was ist etwas, das ich heute gelernt habe?",
            },
            {
              id: 3,
              prompt: "Was möchte ich vom heutigen Tag nicht vergessen?",
            },
            {
              id: 4,
              prompt:
                "Was ist eine gute/schöne/besondere Sache, die heute passiert ist?",
            },
            {
              id: 5,
              prompt:
                "Was sind zurzeit meine drei größten Ziele? Was habe ich heute gemacht, um ihnen einen Schritt näher zu kommen? Was kann ich morgen tun, um ihnen näher zu kommen?",
            },
            {
              id: 6,
              prompt: "Was sind drei Erfolge, die ich feiern kann?",
            },
            {
              id: 7,
              prompt: "Wie bin ich heute ich selber geblieben?",
            },
            {
              id: 8,
              prompt:
                "Wie viel Zeit habe ich heute mit den Personen verbracht, die mir am wichtigsten sind? Wie kann ich morgen (noch mehr) Zeit mit ihnen verbringen?",
            },
            {
              id: 9,
              prompt: "Wofür bin ich heute besonders dankbar?",
            },
            {
              id: 10,
              prompt:
                "Was ist wirklich wichtig und darf auf meiner To-Do Liste stehen bleiben?",
            },
            {
              id: 11,
              prompt:
                "Was bringt mich zurzeit nicht weiter und darf deshalb von der Liste gehen?",
            },
            {
              id: 12,
              prompt:
                "Wenn ich mein Leben so weiterlebe wie heute - würde ich dann zu der Version von mir werden, die ich sein möchte?",
            },
            {
              id: 13,
              prompt: "Was habe ich heute gut gemacht?",
            },
            {
              id: 14,
              prompt:
                "Wie kann ich morgen noch besser machen? Was kann ich morgen anders machen, damit der Tag noch besser wird?",
            },
          ],
        },
        {
          id: 3,
          title: "weekly reflexion",
          prompts: [],
        },
      ],

      userSelection: Array,

      userSession: Array,

      // auswahl: kategorie 1: 3 fragen, k2: 2 fragen, k3. 5 fragen

      // Fachlich: getroffene Auswahl des Users
      //

      sessions: Array,
      /*
      id: number,
      date: date,
      finished: bolean,
      sessionid: 
        [sessionId,
          prompts: 
            [id: number,
              answered: bolean]
        ]
        */
    };
  },
  mutations: {
    createUserSelection(state, result) {
      state.userSelection = result;
    },
    prepareSession(state, result) {
      state.userSessions = result;
    },
    saveSession(state, result) {
      state.sessions = result;
    },
  },
  actions: {
    //vorbereitung für die AuswahlSeite auf der User die Anzahl der Prompts wählen kann
    createUserSelection(state) {
      const userSelectionArray = [];
      this.state.sessionTypes.forEach((sessionType) => {
        userSelectionArray.push({
          sessionId: sessionType.id,
          sessionTitle: sessionType.title,
          countAllPrompts: sessionType.prompts.length,
          selected: 0,
        });
      });

      state.commit("createUserSelection", userSelectionArray);
    },
    //erste Prompts für die ausgewählten Sessions werden ausgewählt
    prepareSession(state) {
      const session = this.state.userSelection.map((selectedSessionType) => {
        return {
          id: selectedSessionType.sessionId,
          title: selectedSessionType.sessionTitle,
          count: selectedSessionType.selected,
          prompts: this.state.sessionTypes.find((sessionType) => {
            return sessionType.id === selectedSessionType.sessionId;
          }).prompts,
          selectedPrompts: [],
        };
      });

      for (let sessionType of session) {
        for (let i = 1; i <= sessionType.count; i++) {
          const randomNumber = randomInt(0, sessionType.prompts.length - 1);
          const selectedPrompt = sessionType.prompts[randomNumber];

          sessionType.selectedPrompts.push(selectedPrompt);
          sessionType.prompts.splice(
            sessionType.prompts.indexOf(selectedPrompt),
            1
          );
        }
      }
      state.commit("prepareSession", session);
    },
  },
});

createApp(App).use(router).use(store).mount("#app");

//CSS Reset import
import "@/assets/css/normalize.css";
