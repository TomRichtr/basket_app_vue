<template>
  <div class="edit-user-page-container">
    <EditUserEmail></EditUserEmail>
    <EditUserPassword></EditUserPassword>
    <DeleteAccount></DeleteAccount>
  </div>
</template>

<script>
import EditUserEmail from "../components/EditUserEmail";
import EditUserPassword from "../components/EditUserPassword";
import DeleteAccount from "../components/DeleteAccount";
export default {
  components: { EditUserEmail, EditUserPassword, DeleteAccount },
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";
.edit-user-page-container {
  margin-top: $xs-size;
  margin-left: $s-size;
  margin-right: $s-size;
}
</style>
