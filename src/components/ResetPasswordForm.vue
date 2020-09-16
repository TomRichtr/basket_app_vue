<template>
  <b-form @submit="onSubmit" v-if="show">
    <b-form-group
      id="input-group-1"
      label="Email address:"
      label-for="input-1"
      description="Further instruction will be sent on your email."
    >
      <b-form-input
        id="input-1"
        v-model="form.email"
        type="email"
        required
        placeholder="Enter email"
      ></b-form-input>
      <b-form-row>
        <b-col>
          <b-form-text
            text-variant="danger"
            v-if="errorHandlerForEmail"
            id="password-help-block"
            >{{ errorHandlerForEmail }}
          </b-form-text>
        </b-col>
      </b-form-row>
    </b-form-group>

    <b-form-row>
      <b-col
        ><b-button class="button-form" type="sumbit" variant="primary"
          >Reset</b-button
        >
      </b-col>
      <b-col
        ><b-button
          @click="onClickHide"
          class="button-form"
          type="reset"
          variant="danger"
          >Back to Log In</b-button
        >
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import { authAxiosInstance } from "../axios-auth";
import { apiKey } from "../axios-auth";
import { dbAxiosInstance } from "../axios-auth";

export default {
  props: ["hideSwitchForLogRes"],
  data() {
    return {
      errorHandlerForEmail: "",
      form: {
        email: "",
      },
      show: true,
    };
  },
  methods: {
    onClickHide() {
      this.$emit("hideRes");
    },
    onSubmit(evt) {
      evt.preventDefault();
      dbAxiosInstance
        .get('users.json?orderBy="email"&equalTo=' + `"${this.form.email}"`)
        .then((res) => {
          if (Object.keys(res.data).length === 0) {
            this.errorHandlerForEmail = "This email isn't registered!";
          } else {
            this.errorHandlerForEmail = "";
          }
        })
        .then(() => {
          if (this.errorHandlerForEmail === "") {
            this.$emit("hideRes");
            authAxiosInstance.post("accounts:sendOobCode?key=" + apiKey, {
              requestType: "PASSWORD_RESET",
              email: this.form.email,
            });
          } else {
            this.errorHandlerForEmail === "This email isn't registered!";
          }
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.email = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";
.button-form {
  width: 100%;
}
</style>
