<template>
  <div class="log-reg-background">
    <div
      class="reg-log-box"
      :class="[
        { hidden: hideSwitchForLogReg },
        { hidden: hideSwitchForLogRes },
      ]"
    >
      <LogInForm
        :hideSwitchForLogReg="hideSwitchForLogReg"
        @hideLogIn="onClickHideRegLog"
        @hideRes="onClickHideLogRes"
      >
      </LogInForm>
    </div>
    <div class="reg-log-box" :class="[{ hidden: !hideSwitchForLogReg }]">
      <RegForm
        @hideReg="onClickHideRegLog"
        :hideSwitchForLogReg="hideSwitchForLogReg"
      ></RegForm>
    </div>
    <div class="reg-log-box" :class="{ hidden: !hideSwitchForLogRes }">
      <ResetPasswordForm
        @hideRes="onClickHideLogRes"
        :hideSwitchForLogRes="hideSwitchForLogRes"
      ></ResetPasswordForm>
    </div>
  </div>
</template>

<script>
import LogInForm from "../components/LogInForm";
import RegForm from "../components/RegForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default {
  components: {
    LogInForm,
    RegForm,
    ResetPasswordForm,
  },
  created() {
    this.$store.dispatch("setClearAuthData");
  },
  data() {
    return {
      hideSwitchForLogReg: false,
      hideSwitchForLogRes: false,
    };
  },
  methods: {
    onClickHideRegLog() {
      this.hideSwitchForLogReg = !this.hideSwitchForLogReg;
    },
    onClickHideLogRes() {
      this.hideSwitchForLogRes = !this.hideSwitchForLogRes;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";
.log-reg-background {
  background: url("../assets/log-reg-background.jpg");
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
}

.reg-log-box {
  background: fade-out($color: white, $amount: 0.3);
  border-radius: $xs-size;
  padding: $m-size;
  min-width: 350px;
  max-width: 500px;
  margin-left: $m-size;
  margin-right: $m-size;
}

.hidden {
  display: none;
}
</style>
