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
        Password has been changed. You will be logged out in
        {{ dismissCountDown }} seconds, please log-in again with a new password.
      </p>
      <b-progress
        variant="dark"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
    <b-form-row class="title">
      <h5>Change password:</h5>
    </b-form-row>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-row>
        <b-col sm>
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
              placeholder="Enter password"
              required
            ></b-input>
            <b-form-text id="password-help-block">
              Your password must have between 8 to 15 characters which contain
              at least one numeric digit and a special character.
            </b-form-text>
          </b-form-group>
        </b-col>
        <b-col sm>
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
              required
              aria-describedby="password-help-block"
              placeholder="Enter password"
            ></b-input>
            <b-form-row>
              <b-col>
                <b-form-text v-if="errorHandler" id="password-help-block"
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
export default {
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      form: {
        password1: "",
        password2: "",
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
      // Reset our form values
      this.form.password1 = "";
      this.form.password2 = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
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
        const vm = this;
        this.$store.dispatch("changePassword", {
          password: this.form.password1,
        });
        this.showAlert();
        this.onReset(evt);
        setTimeout(function() {
          vm.onLogOut();
        }, 10000);
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
  margin-top: $s-size;
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
