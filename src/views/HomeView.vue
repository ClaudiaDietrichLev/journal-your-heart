<template>
  <MainHeader />
  <main>
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="session of selectedSessions" :key="session.session">
        <td class="session-title">
          {{ session.title }}
        </td>
        <td class="session-count">
          <input
            class="count-of-session"
            type="number"
            v-model="session.count"
          />
        </td>
      </tr>
    </table>
    <pre>{{ this.selectedSessions }}</pre>
    <p>The session has now {{ countPrompts }} prompts</p>
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
    await this.getSessionTypes();
    this.fillSessionList(this.sessionTypes);
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
    fillSessionList(sessionTypes) {
      this.selectedSessions = [];
      for (let sessionType of sessionTypes) {
        const session = {
          session: sessionType.id,
          title: sessionType.sessionTitle,
          count: 0,
        };
        this.selectedSessions.push(session);
      }
      // for (i = 0, i < sessionTypes.length)
      //    selectedSessions[i].session = sessionTypes[i].id
      //  }
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
}
table {
  width: 100%;
}
td {
  border-bottom: 2px solid var(--color-text);
  padding-block: 0.5em;
}

.count-of-session {
  width: 3em;
}
.session-title {
}

.session-count {
  width: 25px;
}
</style>
