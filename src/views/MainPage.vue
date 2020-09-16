<template>
  <div class="main-page-container">
    <AddForm></AddForm>
  </div>
</template>
<script>
import AddForm from "../components/AddForm";

export default {
  components: {
    AddForm,
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";
.main-page-container {
  margin-top: $xs-size;
  margin-left: $s-size;
  margin-right: $s-size;
}
</style>
