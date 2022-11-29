<template>
  <button>{{ buttonTitle }}</button>
</template>
<script>
export default {
  name: "MainButton",
  props: {
    buttonTitle: {
      type: String,
      default: "ButtonTitle",
    },
  },
};
</script>
<style scoped>
button {
  all: unset;
  background-color: var(--color-accent);
  border: 2px solid var(--color-bg);
  border-radius: 10px;
  padding: 0.5em;
  color: var(--color-bg-active);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  text-align: center;
}

button:hover {
  background-color: var(--color-accent-active);
  border: 2px solid var(--color-bg);
}
</style>
