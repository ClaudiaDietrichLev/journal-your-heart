<template>
  <MainHeader />
  <main>
    <h2>this are the prompts for your session</h2>
    <ul class="prompt-list">
      <li v-for="prompt of prompts" :key="prompt.id" class="prompt-li">
        <div class="session-desc">
          <p class="session-title">{{ prompt.question }}</p>
        </div>
      </li>
    </ul>
    <pre>{{ prompts }}</pre>

    <MainButton
      @click="$router.push({ name: 'sessionprompts' })"
      buttonTitle="Create Session"
    />
  </main>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import MainButton from "@/components/MainButton.vue";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import randomInt from "random-int";

export default {
  name: "SessionPrompts",

  data() {
    return {
      prompts: [
        {
          session: Number,
          question: String,
          answered: Boolean,
        },
      ],
    };
  },
  created() {
    this.selectPrompts(this.selectedSessions);
  },
  components: {
    MainHeader,
    MainButton,
  },

  computed: {
    ...mapState(["sessionTypes", "newSession", "selectedSessions"]),
  },

  methods: {
    ...mapActions(["getAllSessionsType"]),

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
    sessionWithCountOfPrompts(session) {
      return session.filter((count) => count.count > 0);
    },

    selectPrompts(selectedSessions) {
      let promptSession = this.sessionWithCountOfPrompts(selectedSessions);
      this.prompts = [];
      let max = 0;
      let count = 0;
      let i = 0;

      for (let singleSession of promptSession) {
        max = singleSession.numberOf;
        count = singleSession.count;
        this.getRandomPrompts(singleSession.session, count, max, i);
      }
    },
    getRandomPrompts(session, count, max, id) {
      for (let i = 0; i < count; i++) {
        id++;
        let randomNumber = randomInt(0, max);
        let promptObject = {};
        promptObject.id = id;
        promptObject.session = session;
        promptObject.answered = false;
        let indexSession = this.sessionTypes.findIndex(
          (element) => (element.id = session)
        );
        promptObject.question =
          this.sessionTypes[indexSession].prompts[randomNumber].question;
        this.prompts.push(promptObject);
      }
    },
  },
};
</script>

<style scoped>
main {
  margin: auto;
  padding: 2em;
  justify-content: center;
  background-color: var(--color-bg);
}
.prompt-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0;
  column-gap: 1em;
}

.count-of-session {
  width: 3em;
}
.prompt-li {
  list-style: none;
  width: 100%;
  background-color: var(--color-white);
  border: 2px solid var(--color-text);
  margin-block-start: 1em;
  border-radius: 5px;
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
