<template>
  <div class="mainpage">
    <MainHeader />
    <main>
      <ul class="session-list">
        <li
          v-for="session of userSelection"
          :key="session.id"
          class="session-li-title"
        >
          <div class="session-desc">
            <p class="session-title">{{ session.sessionTitle }}</p>
            <p class="session-count">
              <input
                class="count-of-session"
                type="number"
                min="0"
                :max="session.countAllPrompt"
                v-model="session.selected"
              />
            </p>
          </div>
          <p class="number-of-prompts">
            there are {{ session.countAllPrompts }} prompts available
          </p>
        </li>
      </ul>

      <p class="result">
        your session has now
        {{ countSelectedPrompts }} prompts
      </p>
      <MainButton
        @click="createSession(selectSessionTypes)"
        :disabled="isNoPromptsSelected"
        buttonTitle="Select Prompts"
      />
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import MainHeader from "@/components/MainHeader.vue";
import MainButton from "@/components/MainButton.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",

  data() {
    return {};
  },
  created() {
    this.$store.dispatch("createUserSelection");
  },

  components: {
    MainHeader,
    MainButton,
  },

  computed: {
    ...mapState(["sessionTypes", "userSelection", "userSession"]),

    // count all how many prompts are selected.
    countSelectedPrompts() {
      let sum = 0;
      for (let n of this.userSelection) {
        sum += n.selected;
      }
      return sum;
    },

    isNoPromptsSelected() {
      return this.countSelectedPrompts === 0;
    },
  },

  methods: {
    // send listSessiontypes to store and go to sessionprompts route
    createSession() {
      this.$store.dispatch("prepareSession");

      this.$router.push({ name: "sessionprompts" });
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;

  padding: 2em;
  justify-content: center;
  background-color: var(--color-bg);
}

.mainpage {
  margin: auto;
  width: 500px;
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
