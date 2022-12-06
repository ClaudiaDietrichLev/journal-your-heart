<template>
  <MainHeader />
  <main>
    <h3>these are the prompts for your session</h3>
    <ul class="prompt-list">
      <li
        v-for="prompt of newSessionPrompts"
        :key="prompt.id"
        class="prompt-li"
      >
        <div>
          <p class="prompt">{{ prompt.prompt }}</p>
        </div>
        <div class="x-button"><button class="small-button">x</button></div>
        <div class="sessiontype">{{ prompt.title }}</div>
      </li>
    </ul>

    <MainButton
      @click="$router.push({ name: 'sessionprompts' })"
      buttonTitle="Create Session"
    />
  </main>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import MainButton from "@/components/MainButton.vue";
import { mapState } from "vuex";
import randomInt from "random-int";

export default {
  name: "SessionPrompts",

  data() {
    return {
      id: 0,
      newSessionPrompts: [],
    };
  },
  async created() {
    await this.$store.dispatch("getPromptsFromApi");
    this.selectPrompts();
  },
  components: {
    MainHeader,
    MainButton,
  },

  computed: {
    ...mapState([
      "sessionTypes",
      "newSession",
      "selectSessionTypes",
      "prompts",
    ]),
  },

  methods: {
    splitPromptsBySession(session, prompts) {
      let promptsBySession = [];
      for (let prompt of prompts) {
        if (prompt.session === session.id) {
          let promptObject = {
            id: prompt.id,
            session: prompt.session,

            prompt: prompt.prompt,
            used: false,
          };
          promptsBySession.push(promptObject);
        }
      }
      return promptsBySession;
    },

    selectPrompts() {
      for (let sessionType of this.selectSessionTypes) {
        if (sessionType.count > 0) {
          let sessionPrompts = this.splitPromptsBySession(
            sessionType,
            this.prompts
          );
          console.log(sessionPrompts);
          console.log(sessionType.count);
          do {
            this.getRandomPromptForSession(sessionType, sessionPrompts);
          } while (sessionType.count > this.newSessionPrompts.length);
        }
      }
    },
    // Funktioniert nicht.... warum? Wie kann ich das object im Array finden?
    getRandomPromptForSession(session, promptsPerSession) {
      let randomNumber = randomInt(0, session.numberOf);
      if (promptsPerSession[randomNumber].used === false) {
        console.log(this.prompts.indexOf(promptsPerSession[randomNumber]));
        promptsPerSession[randomNumber].used = true;
        this.newSessionPrompts.push(promptsPerSession[randomNumber]);
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
.prompt-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0;
  column-gap: 1em;
}

.prompt-li {
  list-style: none;
  width: 100%;
  background-color: var(--color-white);
  border: 2px solid var(--color-text);
  margin-block-start: 1em;
  border-radius: 5px;
  position: relative;
}

.prompt {
  padding: 0.5em;
}

.x-button {
  position: absolute;
  top: 1px;
  right: 2px;
}

.small-button {
  all: unset;
  width: 1em;
  text-align: center;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  border-radius: 5px;
}

.small-button:hover {
  border: 1px solid var(--color-text);
  background-color: var(--color-accent);
  color: var(--color-white);
}

.sessiontype {
  position: absolute;
  font-size: 0.7em;
  color: var(--color-accent);
  text-align: right;
  bottom: 1px;
  right: 2px;
}
</style>
