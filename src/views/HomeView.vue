<template>
  <div class="mainpage">
    <MainHeader />
    <main>
      <ul class="session-list">
        <li
          v-for="session of selectSessionTypes"
          :key="session.id"
          class="session-li-title"
        >
          <div class="session-desc">
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
          </div>
          <p class="number-of-prompts">
            there are {{ session.numberOf }} prompts available
          </p>
        </li>
      </ul>
      <pre>{{ sessionTypes }}</pre>
      <p class="result">your session has now {{ countPrompts }} prompts</p>
      <MainButton
        @click="createSession(selectSessionTypes)"
        :disabled="isNoPromptsSelected"
        buttonTitle="Create Session"
      />
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import MainHeader from "@/components/MainHeader.vue";
import MainButton from "@/components/MainButton.vue";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "HomeView",

  data() {
    return {
      selectSessionTypes: [],
      prompts: [
        {
          session: Number,
          prompt: String,
          answered: Boolean,
        },
      ],
    };
  },
  async created() {
    await this.$store.dispatch("getSessionTypesFromApi");
    this.fillSelectSessionTypes();
    //this.fillSessionList(this.sessionTypes, this.sessionList);
  },

  components: {
    MainHeader,
    MainButton,
  },

  computed: {
    ...mapState(["sessionTypes", "newSession", "selectedSessions"]),
    countPrompts() {
      let sum = 0;
      for (let i of this.selectSessionTypes) {
        sum += i.count;
      }
      return sum;
    },

    isNoPromptsSelected() {
      return this.countPrompts === 0;
    },
  },

  methods: {
    ...mapActions(["getSessionsTypesFromApi"]),

    fillSelectSessionTypes() {
      this.selectSessionTypes = [];
      for (let session of this.sessionTypes) {
        const sessiontype = {
          id: session.id,
          title: session.title,
          numberOf: session.numberOf,
          count: 0,
        };
        this.selectSessionTypes.push(sessiontype);
      }
    },

    createSession(selectSessionTypes) {
      this.$store.commit("fillSelectSessionTypes", selectSessionTypes);
      this.$router.push({ name: "sessionprompts" });
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

.mainpage {
  margin: auto;
}
.session-list {
  width: 100%;
  padding: 0;
}

.count-of-session {
  width: 3em;
}
.session-li-title {
  list-style: none;
  width: 100%;
  background-color: var(--color-white);
  border: 2px solid var(--color-text);
  margin-block-start: 1em;
}

.session-count {
  width: 25px;
  padding-right: 3.5em;
}

.session-title {
  font-weight: 600;
  padding-left: 0.5em;
}

.number-of-prompts {
  text-align: right;
  font-size: 0.75em;
  color: var(--color-accent);
  padding-right: 0.5em;
}

.result {
  align-self: center;
}

.session-desc {
  display: flex;
  justify-content: space-between;
}
</style>
