<template>
  <header>
    <h1>Journaling is writing your heart on paper</h1>
  </header>
</template>
<script>
export default {
  name: "MainHeader",
};
</script>
<style scoped>
header {
  background-color: var(--color-accent);
  padding: 2em;
}

h1 {
  margin: 0;
  text-align: center;
  color: var(--color-bg-active);
  text-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
