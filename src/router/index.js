import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import EditUserPage from "../views/EditUserPage";
import MainPage from "../views/MainPage";
import LogRegUserPage from "../views/LogRegUserPage";

Vue.use(VueRouter);

export const paths = {
  mainPage: "/main-page",
  editUserPage: "/edit-user",
  logRegUserPage: "/",
};

const routes = [
  {
    path: paths.mainPage,
    name: "mainPage",
    component: MainPage,
    beforeEnter(to, from, next) {
      if (store.state.idToken != "") {
        next();
      } else {
        next(paths.logRegUserPage);
      }
    },
  },
  {
    path: paths.editUserPage,
    name: "editUserPage",
    component: EditUserPage,
    beforeEnter(to, from, next) {
      if (store.state.idToken != "") {
        next();
      } else {
        next(paths.logRegUserPage);
      }
    },
  },
  {
    path: paths.logRegUserPage,
    name: "logRegUserPage",
    component: LogRegUserPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
