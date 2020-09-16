<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="email1-label"
        label="Email address:"
        label-for="email1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="email1"
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
        id="password-label"
        label="Password:"
        label-for="password"
        @submit.stop.prevent
        required
      >
        <b-input
          type="password"
          v-model="form.password"
          id="password"
          aria-describedby="password-help-block"
          placeholder="Enter password"
        ></b-input>
      </b-form-group>
      <b-form-row>
        <b-col>
          <b-button class="button-form" type="submit" variant="primary"
            >Submit</b-button
          >
        </b-col>
        <b-col
          ><b-button
            @click="onClickHideForReg"
            class="button-form"
            type="reset"
            variant="danger"
            >Register</b-button
          >
        </b-col>
      </b-form-row>
    </b-form>
    <b-row class="reset-link-container">
      <b-col>
        <button @click="onClickHideForRes" class="reset-password-link">
          Have you forget your password? Click here.
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { dbAxiosInstance } from "../axios-auth";

export default {
  props: ["hideSwitchForLogReg"],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
      errors: "",
      errorHandlerForEmail: "",
    };
  },
  methods: {
    onClickHideForReg() {
      this.$emit("hideLogIn");
    },
    onClickHideForRes() {
      this.$emit("hideRes");
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch("logIn", {
        email: this.form.email,
        password: this.form.password,
      });
      this.$store.dispatch("updateUser", {
        email: this.form.email,
      });
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.email = "";
      this.form.password = "";
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
            this.errorHandlerForEmail = "This email isn't registered!";
          } else {
            this.errorHandlerForEmail = "";
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
}
.reset-link-container {
  text-align: center;
  margin-top: $s-size;
}
.reset-password-link {
  background: none;
  border: none;
  color: #6c757d;
  padding: 0px;
  &:hover {
    color: #6610f2;
    background: none;
  }
}
</style>
