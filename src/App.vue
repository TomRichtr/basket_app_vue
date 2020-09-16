<template>
  <div class="app">
    <Header v-if="user"></Header>
    <transition name="slide" mode="out-in"
      ><router-view></router-view
    ></transition>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: { Header },
  created() {
    this.$store.dispatch("setAutoLogIn");
  },
  computed: {
    user() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style lang="scss">
@import "./scss/variables.scss";

body {
  font-family: "Grandstander", cursive;
}

.slide-enter-active {
  animation: slide-in 500ms ease-out forwards;
}
.slide-leave-active {
  animation: slide-out 500ms ease-out forwards;
}
@keyframes slide-in {
  from {
    transform: translateY (-30px);
    opacity: 0;
  }
  to {
    transform: translateY (0);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY (0);
    opacity: 1;
  }
  to {
    transform: translateY (-30px);
    opacity: 0;
  }
}
</style>
