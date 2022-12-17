<template>
  <div class="mainpage">
    <MainHeader />
    <main>
      <article class="prompt-card">
        <div class="prompt">
          <p>{{ prompt }}</p>
          <p class="session-title">{{ session }}</p>
        </div>
      </article>
      {{ isEndOfSession }}
      {{ numberOfPrompt }}

      <div class="nav" v-show="!isEndOfSession">
        <MainButton @click="skipPrompt()" buttonTitle="skip" />
        <MainButton @click="nextPrompt()" buttonTitle="next" />
      </div>
      <div class="nav-end" v-show="isEndOfSession">
        <MainButton @click="saveSession()" buttonTitle="finish session" />
      </div>
    </main>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import MainButton from "@/components/MainButton.vue";
import { mapState } from "vuex";

export default {
  name: "StartSession",

  data() {
    return {
      numberOfPrompt: 0,
      isEndOfSession: false,
    };
  },
  mounted() {
    if (this.numberOfPrompt === this.sessions.prompts.length) {
      this.isEndOfSession = true;
    }
  },
  updated() {
    if (this.numberOfPrompt === this.sessions.prompts.length) {
      this.isEndOfSession = true;
    }
  },
  components: {
    MainHeader,
    MainButton,
  },

  computed: {
    ...mapState(["sessions"]),
    session() {
      return this.sessions.prompts[this.numberOfPrompt].sessionTitle;
    },
    prompt() {
      return this.sessions.prompts[this.numberOfPrompt].prompt;
    },
  },

  methods: {
    saveSession() {
      this.$store.commit("saveSession", this.sessions);
      this.$router.push({ name: "home" });
    },
    nextPrompt() {
      if (this.numberOfPrompt < this.sessions.prompts.length - 1) {
        this.isEndOfSession = false;
        this.sessions.prompts[this.numberOfPrompt].answered = true;
        this.numberOfPrompt++;
      } else {
        this.isEndOfSession = true;
      }
    },
    skipPrompt() {
      if (this.numberOfPrompt < this.sessions.prompts.length - 1) {
        this.isEndOfSession = false;
        this.numberOfPrompt++;
      } else {
        this.isEndOfSession = true;
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
.start-session {
  font-size: 2em;
}

.mainpage {
  margin: auto;
  width: 500px;
}
.prompt-card {
  padding: 0;
  column-gap: 1em;
}

.prompt {
  padding: 2em;
  width: 100%;
  background-color: var(--color-white);
  border: 2px solid var(--color-text);
  margin-block-start: 1em;
  border-radius: 5px;
  position: relative;
  font-size: 2em;
}

.session-title {
  font-size: 0.5em;
  color: var(--color-accent);
  text-align: right;
  bottom: 1px;
  right: 2px;
}

.nav {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.nav-end {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}
</style>
