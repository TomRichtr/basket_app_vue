<template>
  <b-form @submit="onSubmit" v-if="show">
    <b-form-group
      id="email-label"
      label="Email address:"
      label-for="email"
      description="We'll never share your email with anyone else."
    >
      <b-form-input
        id="email"
        v-model="form.email"
        type="email"
        required
        @blur="validateEmail"
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

    <b-form-group
      id="password1-label"
      label="Password:"
      label-for="password1"
      @submit.stop.prevent
      required
    >
      <b-input
        type="password"
        v-model="form.password1"
        id="password1"
        aria-describedby="password-help-block"
        placeholder="Enter email"
      ></b-input>
      <b-form-text id="password-help-block">
        Your password must have between 8 to 15 characters which contain at
        least one numeric digit and a special character.
      </b-form-text>
    </b-form-group>
    <b-form-group
      id="password2-label"
      label="Confirm password:"
      label-for="password2"
      @submit.stop.prevent
      required
    >
      <b-input
        type="password"
        v-model="form.password2"
        id="password2"
        aria-describedby="password-help-block"
        placeholder="Enter password"
      ></b-input>
      <b-form-row>
        <b-col>
          <b-form-text
            text-variant="danger"
            v-if="errorHandler"
            id="password-help-block"
            >{{ errorHandler }}
          </b-form-text>
        </b-col>
      </b-form-row>
    </b-form-group>
    <b-form-row>
      <b-col>
        <b-button class="button-form" type="submit" variant="primary"
          >Submit</b-button
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
import { dbAxiosInstance } from "../axios-auth";
import { v4 as uuidv4 } from "uuid";

export default {
  props: ["hideSwitchForLogReg"],
  data() {
    return {
      form: {
        email: "",
        password1: "",
        password2: "",
      },
      show: true,
      errorHandler: "",
      errorHandlerForEmail: "",
    };
  },
  methods: {
    onClickHide() {
      this.$emit("hideReg");
    },
    onSubmit(evt) {
      evt.preventDefault();
      const paswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      const passwordTestEquality =
        this.form.password1 === this.form.password2 ? true : false;
      const passwordTestQuality = this.form.password2.match(paswd)
        ? true
        : false;
      if (passwordTestEquality === true && passwordTestQuality === true) {
        this.$store.dispatch("signUp", {
          email: this.form.email,
          password: this.form.password1,
          id: uuidv4(),
        });
      } else {
        this.errorHandler =
          !passwordTestEquality && !passwordTestQuality
            ? "Password doenst't match and it must contain a special character and a number!"
            : !passwordTestQuality
            ? "Password must contain a number and special character!"
            : !passwordTestEquality
            ? "Passwords don't match!"
            : "";
      }
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.email = "";
      this.form.password1 = "";
      this.form.password2 = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    validateEmail() {
      dbAxiosInstance
        .get('users.json?orderBy="email"&equalTo=' + `"${this.form.email}"`)
        .then((res) => {
          if (Object.keys(res.data).length === 0) {
            this.errorHandlerForEmail = "";
          } else {
            this.errorHandlerForEmail = "This email is taken!";
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";
.button-form {
  width: 100%;
  margin-top: $s-size;
}
</style>
