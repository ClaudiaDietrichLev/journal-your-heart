<template>
  <div class="mainpage">
    <MainHeader />
    <main>
      <article>
        <h3>Start your new Session</h3>
        <p>grap your journal and press Start for your individuell session</p>
      </article>

      <MainButton
        class="start-session"
        @click="startNewSession()"
        buttonTitle="Start Session"
      />
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
    return {};
  },
  created() {},
  components: {
    MainHeader,
    MainButton,
  },

  computed: {
    ...mapState(["sessions"]),
  },

  methods: {
    startNewSession() {
      this.$router.push({ name: "prompts" });
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
