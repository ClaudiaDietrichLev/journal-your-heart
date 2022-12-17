<template>
  <div class="mainpage">
    <MainHeader />
    <main>
      <h3>these are the prompts for your session</h3>
      <ul class="prompt-list">
        <li
          v-for="prompt of promptList"
          :key="prompt.id"
          class="prompt-li"
          ref="prompt"
        >
          <div>
            <p class="prompt" ref="prompt">{{ prompt.prompt }}</p>
          </div>

          <div class="x-button">
            <button @click.prevent="deletePrompt(prompt)" class="small-button">
              x
            </button>
          </div>
          <div class="sessiontype">{{ prompt.title }}</div>
        </li>
      </ul>
      <MainButton
        @click="saveSession(this.userSessions)"
        buttonTitle="Save Session"
      />
    </main>
  </div>
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
      promptList: [],
      isNoPrompt: false,
    };
  },
  created() {
    this.preparePrompts();
  },
  components: {
    MainHeader,
    MainButton,
  },

  computed: {
    ...mapState(["sessionTypes", "userSessions", "sessions"]),
  },

  methods: {
    preparePrompts() {
      this.promptList = [];
      this.userSessions.forEach((session) => {
        session.selectedPrompts.forEach((prompt) => {
          this.promptList.push({
            id: session.id + "-" + prompt.id,
            sessionId: session.id,
            title: session.title,
            promptId: prompt.id,
            prompt: prompt.prompt,
          });
        });
      });
    },

    deletePrompt(prompt) {
      const selectedSession = this.userSessions.find(
        (session) => session.id === prompt.sessionId
      );

      const randomNumber = randomInt(0, selectedSession.prompts.length - 1);
      const selectedPrompt = selectedSession.prompts[randomNumber];
      const deletedPrompt = selectedSession.selectedPrompts.find(
        (element) => element.id === prompt.promptId
      );

      selectedSession.selectedPrompts.splice(
        selectedSession.prompts.indexOf(deletedPrompt),
        1
      );
      selectedSession.selectedPrompts.push(selectedPrompt);
      selectedSession.prompts.splice(
        selectedSession.prompts.indexOf(selectedPrompt),
        1
      );

      this.preparePrompts();
    },

    saveSession(userSessions) {
      this.$store.commit("prepareSession", userSessions);

      const session = {
        // generate id
        id: 1,
        date: new Date(),
        finished: false,
        prompts: [],
      };
      for (let userSession of userSessions) {
        userSession.selectedPrompts.forEach((selectedPrompt) => {
          const prompt = {
            sessionTitle: userSession.title,
            prompt: selectedPrompt.prompt,
            answered: false,
          };

          session.prompts.push(prompt);
        });
      }
      this.$store.commit("saveSession", session);
      this.$router.push({ name: "startsession" });
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
  width: 500px;
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
