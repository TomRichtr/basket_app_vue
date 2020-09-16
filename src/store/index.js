import Vue from "vue";
import Vuex from "vuex";
import { authAxiosInstance } from "../axios-auth";
import { dbAxiosInstance } from "../axios-auth";
import { apiKey } from "../axios-auth";
import { paths } from "../router/index";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    itemsCount: 0,
    editedItem: [],
    filteredItems: [],
    items: [],
    totalPayment: 0,
    email: "",
    filter: { category: null, sortBy: null, status: null, decription: "" },
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    storeUser(state, user) {
      state.email = user.email;
    },
    storeItems(state, items) {
      state.items = items;
      state.itemsCount = items === null ? 0 : Object.keys(items).length;
      state.totalPayment = items.reduce(
        (sum, item) => sum + parseInt(item.expectedExpense),
        0
      );
      let result = items;
      const categoryCondition = state.filter.category;
      const statusCondition = state.filter.status;
      const sortByCondition = state.filter.sortBy;
      const descriptionCondition =
        state.filter.description === undefined ? "" : state.filter.description;
      if (categoryCondition === "Cosmetics") {
        result = result.filter(function(item) {
          return item.category === "Cosmetics";
        });
      }
      if (categoryCondition === "Alcoholic Drinks") {
        result = result.filter(function(item) {
          return item.category === "Alcoholic Drinks";
        });
      }
      if (categoryCondition === "Non-alcoholic Drinks") {
        result = result.filter(function(item) {
          return item.category === "Non-alcoholic Drinks";
        });
      }
      if (categoryCondition === "Pastry") {
        result = result.filter(function(item) {
          return item.category === "Pastry";
        });
      }
      if (categoryCondition === "Fruit") {
        result = result.filter(function(item) {
          return item.category === "Fruit";
        });
      }
      if (categoryCondition === "Vegetables") {
        result = result.filter(function(item) {
          return item.category === "Vegetables";
        });
      }
      if (categoryCondition === "Fresh Meat") {
        result = result.filter(function(item) {
          return item.category === "Fresh Meat";
        });
      }
      if (categoryCondition === "Vacuumed Meat") {
        result = result.filter(function(item) {
          return item.category === "Vacuumed Meat";
        });
      }
      if (categoryCondition === "Pets") {
        result = result.filter(function(item) {
          return item.category === "Pets";
        });
      }
      if (categoryCondition === "Baking") {
        result = result.filter(function(item) {
          return item.category === "Baking";
        });
      }
      if (categoryCondition === "Others") {
        result = result.filter(function(item) {
          return item.category === "Others";
        });
      }
      if (statusCondition === "Bought items") {
        result = result.filter(function(item) {
          return item.checked === true;
        });
      }
      if (statusCondition === "Pending items") {
        result = result.filter(function(item) {
          return item.checked != true;
        });
      }
      if (sortByCondition === "A-Z") {
        result = result.sort((a, b) => {
          var descriptionA = a.description.toLowerCase();
          var descriptionB = b.description.toLowerCase();
          return descriptionA > descriptionB ? 1 : -1;
        });
      }
      if (sortByCondition === "Status") {
        result = result.sort((a, b) => {
          var statusA =
            a.checked === undefined
              ? "false"
              : a.checked.toString().toLowerCase();
          var statusB =
            b.checked === undefined
              ? "false"
              : b.checked.toString().toLowerCase();
          return statusA > statusB ? 1 : -1;
        });
      }
      if (sortByCondition === "Expected Expense") {
        result = result.sort((a, b) => {
          return parseInt(a.expectedExpense) > parseInt(b.expectedExpense)
            ? -1
            : 1;
        });
      }
      if (descriptionCondition !== "") {
        result = result.filter(function(item) {
          return item.description
            .toLowerCase()
            .includes(state.filter.description.toLowerCase());
        });
      }
      state.filteredItems = result;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    },
    editedItem(state, itemData) {
      state.editedItem = itemData;
    },
    resetFilters(state) {
      state.filteredItems = state.items;
    },
    storeFilter(state, filter) {
      state.filter = filter;
    },
  },
  actions: {
    resetBasket({ dispatch, state }) {
      if (!state.idToken) {
        return;
      }
      dbAxiosInstance
        .delete(`/${state.userId}.json` + "?auth=" + state.idToken)
        .then(() => {
          dispatch("fetchItems");
        });
    },
    resetFilters({ commit }) {
      commit("resetFilters");
    },
    filterBy({ commit, state }, filter) {
      commit("storeFilter", filter);
      commit("storeItems", state.items);
    },
    setAutoLogIn({ commit, dispatch }) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token) {
        router.push(paths.logRegUserPage);
      }
      const expirationDate = localStorage.getItem("expirationDate");
      const now = new Date();
      if (now >= expirationDate) {
        commit("clearAuthData");
      }
      commit("authUser", { token: token, userId: userId });
      dispatch("fetchUser");
      dispatch("fetchItems");
    },
    setClearAuthData({ commit }) {
      commit("clearAuthData");
    },
    signUp({ commit, dispatch }, authData) {
      authAxiosInstance
        .post("accounts:signUp?key=" + apiKey, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((res) => {
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId,
          });
          dispatch("storeUser", res.data);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + 43200000);
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch("fetchUser");
          router.push(paths.mainPage);
        });
    },
    logIn({ commit, dispatch }, authData) {
      authAxiosInstance
        .post("accounts:signInWithPassword?key=" + apiKey, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((res) => {
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId,
          });
          const now = new Date();
          const expirationDate = new Date(now.getTime() + 43200000);
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch("fetchUser");
          router.push(paths.mainPage);
        });
    },
    changeEmail({ state, dispatch }, authData) {
      authAxiosInstance
        .post("accounts:update?key=" + apiKey, {
          idToken: state.idToken,
          email: authData.email,
          returnSecureToken: true,
        })
        .then(() => {
          dispatch("fetchUser");
        });
    },
    changePassword({ state }, authData) {
      authAxiosInstance.post("accounts:update?key=" + apiKey, {
        idToken: state.idToken,
        password: authData.password,
        returnSecureToken: true,
      });
    },
    logOut({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationDate");
      router.replace(paths.logRegUserPage);
    },
    deleteAccount({ state, commit }) {
      const token = localStorage.getItem("token");
      authAxiosInstance
        .post("accounts:delete?key=" + apiKey, {
          idToken: token,
        })
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("expirationDate");
          router.push(paths.logRegUserPage);
          commit("clearAuthData");
        });
      dbAxiosInstance.delete(
        `users/${state.userId}.json` + "?auth=" + state.idToken
      );
      dbAxiosInstance.delete(`${state.userId}.json` + "?auth=" + state.idToken);
    },
    storeUser({ state, dispatch }, userData) {
      if (!state.idToken) {
        return;
      }
      dbAxiosInstance
        .put(`users/${state.userId}.json` + "?auth=" + state.idToken, {
          email: userData.email,
          idToken: state.idToken,
          idUser: state.userId,
        })
        .then(() => {
          dispatch("fetchUser");
        });
    },
    updateUser({ state, dispatch }, userData) {
      if (!state.idToken) {
        return;
      }
      dbAxiosInstance
        .patch(
          `users/${state.userId}.json` + "?auth=" + state.idToken,
          userData
        )
        .then(() => {
          dispatch("fetchUser");
        });
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      dbAxiosInstance
        .get(`users/${state.userId}.json` + "?auth=" + state.idToken)
        .then((res) => {
          const data = res.data;
          commit("storeUser", data);
        });
    },
    storeItems({ state, dispatch }, itemData) {
      if (!state.idToken) {
        return;
      }
      dbAxiosInstance
        .put(
          `/${state.userId}/${itemData.id}.json` + "?auth=" + state.idToken,
          { ...itemData, description: itemData.description.toUpperCase() }
        )
        .then(() => {
          dispatch("fetchItems");
        });
    },
    editItem({ commit }, itemData) {
      commit("editedItem", {
        id: itemData.id,
        category: itemData.category,
        description: itemData.description,
        note: itemData.note,
        expectedExpense: itemData.expectedExpense,
      });
    },
    updateItem({ state, dispatch }, itemData) {
      if (!state.idToken) {
        return;
      }
      dbAxiosInstance
        .patch(
          `/${state.userId}/${itemData.id}.json` + "?auth=" + state.idToken,
          { ...itemData, description: itemData.description.toUpperCase() }
        )
        .then(() => {
          dispatch("fetchItems");
        });
    },
    checkItem({ state, dispatch }, itemData) {
      if (!state.idToken) {
        return;
      }
      dbAxiosInstance
        .patch(
          `/${state.userId}/${itemData.id}.json` + "?auth=" + state.idToken,
          { checked: itemData.checkUpdate }
        )
        .then(() => {
          dispatch("fetchItems");
        });
    },
    deleteItem({ state, dispatch }, itemData) {
      if (!state.idToken) {
        return;
      }
      dbAxiosInstance
        .delete(
          `/${state.userId}/${itemData.id}.json` + "?auth=" + state.idToken
        )
        .then(() => {
          dispatch("fetchItems");
        });
    },
    fetchItems({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      dbAxiosInstance
        .get(`/${state.userId}.json` + "?auth=" + state.idToken)
        .then((res) => {
          const data = res.data;
          const items = [];
          for (let key in data) {
            const item = data[key];
            items.push(item);
          }
          commit("storeItems", items);
        });
    },
  },
  getters: {
    email: (state) => {
      return state.email;
    },
    items: (state) => {
      return state.items;
    },
    isAuthenticated: (state) => {
      return state.idToken !== null;
    },
    itemsCount: (state) => {
      return state.itemsCount;
    },
    editedItem: (state) => {
      return state.editedItem;
    },
    filteredItemsArray: (state) => {
      return state.filteredItems;
    },
    totalPayment: (state) => {
      return state.totalPayment;
    },
  },
});
