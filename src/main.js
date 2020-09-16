import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./scss/styles.scss";
import "normalize.css/normalize.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faShoppingBasket,
  faChevronUp,
  faChevronDown,
  faCheckSquare,
  faTrashAlt,
  faPenSquare,
  faWindowClose,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { BootstrapVue } from "bootstrap-vue";
import { DropdownPlugin, TablePlugin } from "bootstrap-vue";

Vue.filter("currency", (value) => {
  return "CZK " + value.toLocaleString();
});

Vue.use(BootstrapVue);
Vue.use(DropdownPlugin);
Vue.use(TablePlugin);
library.add([
  faShoppingBasket,
  faChevronUp,
  faChevronDown,
  faCheckSquare,
  faTrashAlt,
  faPenSquare,
  faWindowClose,
  faTimesCircle,
]);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
