<template>
  <div class="header-container">
    <b-navbar
      class="header"
      toggleable="lg"
      type="dark"
      style="background-color: #9CA3DB;"
    >
      <font-awesome-icon
        class="header-icon"
        :icon="['fa', 'shopping-basket']"
        size="2x"
      />
      <router-link class="navbar-brand" :to="mainPagePath">Basket </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="totalPayment != 0"
            >Payment: {{ totalPayment | currency }}</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-dropdown-divider></b-dropdown-divider>
          <b-nav-item>Logged as: {{ email }} </b-nav-item>
          <router-link class="nav-link" :to="editUserPath"
            >User Settings</router-link
          >

          <button
            class="nav-link log-out-button"
            :to="mainPagePath"
            @click="onLogOut"
          >
            Log Out
          </button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { paths } from "../router/index";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ totalPayment: "totalPayment", email: "email" }),
  },
  data() {
    return {
      mainPagePath: paths.mainPage,
      shoppingListsPath: paths.editBasketListPage,
      storeListPath: paths.shopsListPage,
      editUserPath: paths.editUserPage,
    };
  },
  methods: {
    onLogOut() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";

.header-container {
  margin-right: $s-size;
  margin-left: $s-size;
  margin-top: $s-size;
  margin-bottom: $s-size;
}

.header {
  border-radius: $xs-size;
}

.header-icon {
  color: white;
  margin-right: $s-size;
}
.nav-link {
  color: black;
}
.language-item {
  text-align: center;
}

.log-out-button {
  text-align: left;
  background: none;
  border: none;
  &:hover {
    background: none;
  }
}
</style>
