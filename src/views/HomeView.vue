<template>
  <MainHeader />
  <main>
    <ul
      class="session-list"
      v-for="session of selectedSessions"
      :key="session.session"
    >
      <li class="session-li-title">
        <p class="session-title">{{ session.title }}</p>
        <p class="session-count">
          <input
            class="count-of-session"
            type="number"
            min="0"
            :max="session.numberOf"
            v-model="session.count"
          />
        </p>
        <p class="number-of-prompts">
          there are {{ session.numberOf }} prompts available
        </p>
      </li>
    </ul>

    <pre>{{ this.selectedSessions }}</pre>
    <p class="result">your session has now {{ countPrompts }} prompts</p>
    <MainButton buttonTitle="Create Session" />
  </main>
</template>

<script>
// @ is an alias to /src
import MainHeader from "@/components/MainHeader.vue";
import MainButton from "@/components/MainButton.vue";

export default {
  name: "HomeView",
  data() {
    return {
      ApiURL: "http://localhost:4730",
      sessionTypes: [
        {
          id: 1,
          sessionTitle: "Reflexion am Morgen",
          session: "morning",
        },
        {
          id: 3,
          sessionTitle: "Reflexion der Woche",
          session: "week-reflection",
        },
        {
          id: 2,
          sessionTitle: "Reflexion am Abend",
          session: "evening",
        },
      ],
      selectedSessions: [],
    };
  },
  async created() {
    this.$store.dispatch(this.$store.getAllSessions());
    console.log(this.$store.state);
    //await this.getSessionTypes();
    //this.fillSessionList(this.sessionTypes);
  },
  components: {
    MainHeader,
    MainButton,
  },

  computed: {
    countPrompts() {
      let sum = 0;
      for (let i of this.selectedSessions) {
        sum += i.count;
      }

      return sum;
    },
  },

  methods: {
    async getSessionTypes() {
      const response = await fetch(this.ApiURL + "/sessionType/");
      this.sessionTypes = await response.json();
    },
    async getPromptsForSessionTypes() {
      const response = await fetch(this.ApiURL + "/sessionType/");
      this.sessionTypes = await response.json();
    },
    fillSessionList(sessionTypes) {
      this.selectedSessions = [];
      for (let sessionType of sessionTypes) {
        const session = {
          session: sessionType.id,
          title: sessionType.title,
          numberOf: sessionType.prompts.length,
          count: 0,
        };
        this.selectedSessions.push(session);
      }
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 2em;
  justify-content: center;
  background-color: var(--color-bg);
}
.session-list {
  width: 100%;
  background-color: var(--color-white);
  border: 2px solid var(--color-text);
}

.count-of-session {
  width: 3em;
}
.session-td-title {
  padding-right: 0.5em;
}

.session-count {
  width: 25px;
}

.session-title {
  font-weight: 600;
}

.number-of-prompts {
  text-align: right;
  font-size: 0.75em;
  color: var(--color-accent);
}

.result {
  align-self: center;
}
</style>
