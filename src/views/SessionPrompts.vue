<template>
  <MainHeader />
  <main>
    <h3>these are the prompts for your session</h3>
    <ul class="prompt-list">
      <li
        v-for="prompt of newSessionPrompts"
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
        <div class="sessiontype">{{ prompt.sessionTitle }}</div>
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
      usedPrompts: [],
      actualPrompts: [],
      sessionIndex: Number,
      indexActualPrompts: Number,
      indexUsedPrompts: Number,
      selectedSessionIndex: Number,
    };
  },
  created() {
    this.selectPrompts();
  },
  components: {
    MainHeader,
    MainButton,
  },

  computed: {
    ...mapState(["sessiontypes", "sessions", "listSessiontypes"]),
  },

  methods: {
    selectPrompts() {
      this.usedPrompts = [];

      for (let sessiontype of this.listSessiontypes) {
        if (sessiontype.selected > 0) {
          this.usedPrompts.push({
            session: sessiontype.sessionId,
            prompts: new Set(),
          });
          this.actualPrompts.push({
            session: sessiontype.sessionId,
            prompts: new Set(),
          });

          this.sessionIndex = this.usedPrompts.findIndex(
            (session) => session.session === sessiontype.sessionId
          );

          this.indexActualPrompts = this.actualPrompts.findIndex(
            (session) => session.session === sessiontype.sessionId
          );

          const promptsSession = this.sessiontypes.find(
            (session) => session.id === sessiontype.sessionId
          ).prompts;

          do {
            this.getRandomPromptForSession(sessiontype);
          } while (
            sessiontype.selected >
            this.actualPrompts[this.indexActualPrompts].prompts.size
          );
          this.fillPromptsList(sessiontype, promptsSession);
        }
      }
    },

    fillPromptsList(session, promptsSession) {
      this.newSessionPrompts = [];
      for (let actualPrompt of this.actualPrompts[
        this.indexActualPrompts
      ].prompts.entries()) {
        const actualIndex = promptsSession.findIndex(
          (prompt) => prompt.id === actualPrompt[0]
        );

        const sessionPrompt = {
          id: session.sessionId + "-" + promptsSession[actualIndex].id,
          sessionId: session.sessionId,
          sessionTitle: session.sessionTitle,
          promptId: promptsSession[actualIndex].id,
          prompt: promptsSession[actualIndex].prompt,
        };
        this.newSessionPrompts.push(sessionPrompt);
      }
    },

    getRandomPromptForSession(session) {
      const randomNumber = randomInt(0, session.numberPrompts - 1);

      if (!this.usedPrompts[this.sessionIndex].prompts.has(randomNumber)) {
        this.usedPrompts[this.sessionIndex].prompts.add(randomNumber);

        this.actualPrompts[this.indexActualPrompts].prompts.add(randomNumber);
      }
    },

    deletePrompt(prompt) {
      console.log(prompt);

      this.indexUsedPrompts = this.usedPrompts.findIndex(
        (session) => session.session === prompt.sessionId
      );
      this.selectedSessionIndex = this.listSessiontypes.findIndex(
        (session) => session.sessionId === prompt.sessionId
      );

      if (
        this.usedPrompts[this.indexUsedPrompts].prompts.size <
        this.listSessiontypes[this.selectedSessionIndex].numberPrompts
      ) {
        this.indexActualPrompts = this.actualPrompts.findIndex(
          (session) => session.session === prompt.sessionId
        );
        this.actualPrompts[this.indexActualPrompts].prompts.delete(
          prompt.promptId
        );
        const promptsSession = this.sessiontypes.find(
          (session) => session.id === prompt.sessionId
        ).prompts;
        do {
          this.getRandomPromptForSession(
            this.listSessiontypes[this.selectedSessionIndex]
          );
        } while (
          this.listSessiontypes[this.selectedSessionIndex].selected >
          this.actualPrompts[this.indexActualPrompts].prompts.size
        );
        this.fillPromptsList(
          this.listSessiontypes[this.selectedSessionIndex],
          promptsSession
        );
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
