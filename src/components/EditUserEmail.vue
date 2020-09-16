<template>
  <div class="user-edit-form-container">
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="dark"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>
        Email has been changed. You will be logged out in
        {{ dismissCountDown }} seconds, please log-in again with a new email.
      </p>
      <b-progress
        variant="dark"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
    <b-form-row class="title">
      <h5>Change email address:</h5>
    </b-form-row>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-row>
        <b-col sm>
          <b-form-group
            id="email1-label"
            label="Email address:"
            label-for="email1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="email1"
              v-model="form.email1"
              type="email"
              required
              @blur="validateEmail"
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm>
          <b-form-group
            id="email2-label"
            label="Confirm email address:"
            label-for="email2"
          >
            <b-form-input
              id="email"
              v-model="form.email2"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
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
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col class="button-form-container">
          <b-button class="button-form" type="submit" variant="primary"
            >Submit</b-button
          >
        </b-col>
      </b-form-row>
    </b-form>
  </div>
</template>

<script>
import { dbAxiosInstance } from "../axios-auth";

export default {
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      form: {
        email1: "",
        email2: "",
      },
      show: true,
      errorHandler: "",
    };
  },
  methods: {
    onLogOut() {
      this.$store.dispatch("logOut");
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.email1 = "";
      this.form.email2 = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (this.errorHandler === "") {
        if (this.form.email1 === this.form.email2) {
          const vm = this;
          vm.$store.dispatch("changeEmail", {
            email: this.form.email1,
          });
          vm.$store.dispatch("updateUser", {
            email: this.form.email1,
          });
          vm.showAlert();
          vm.onReset(evt);
          setTimeout(function() {
            vm.onLogOut();
          }, 10000);
        } else {
          const vm = this;
          vm.errorHandler = "Emails don't match!";
        }
      } else {
        this.errorHandler = "This email is taken!";
      }
    },
    validateEmail() {
      dbAxiosInstance
        .get('users.json?orderBy="email"&equalTo=' + `"${this.form.email1}"`)
        .then((res) => {
          if (Object.keys(res.data).length === 0) {
            this.errorHandler = "";
          } else {
            this.errorHandler = "This email is taken!";
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";

.title {
  margin-bottom: $xs-size;
}

.user-edit-form-container {
  padding: $s-size;
  background: lighten($color1, 20%);
  border-radius: $xs-size;
}
.button-form {
  max-width: 300px;
  min-width: 250px;
  margin-top: $s-size;
  @media (max-width: $desktop-breakpoint) {
    width: 100%;
  }
}

.button-form-container {
  display: flexbox;
  text-align: center;
}
</style>
