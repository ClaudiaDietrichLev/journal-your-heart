<template>
  <MainHeader />
  <p></p>
  <MainButton buttonTitle="Create Session" />
</template>

<script>
// @ is an alias to /src
import MainHeader from "@/components/MainHeader.vue";
import MainButton from "@/components/MainButton.vue";

export default {
  name: "HomeView",
  components: {
    MainHeader,
    MainButton,
  },
};
</script>
