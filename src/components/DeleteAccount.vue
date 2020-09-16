<template>
  <div class="user-edit-form-container">
    <b-form-row class="title">
      <h5>Delete account:</h5>
    </b-form-row>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-row>
        <b-col class="button-form-container">
          <b-button
            class="button-form"
            variant="danger"
            @click="$bvModal.show('deletion-confirmation-modal')"
            >Delete</b-button
          >
        </b-col>
      </b-form-row>
      <div>
        <b-modal id="deletion-confirmation-modal" hide-footer>
          <template v-slot:modal-title>Deletion Confirmation </template>
          <div class="d-block text-center">
            <h3>Are you sure you want to delete your account?</h3>
          </div>
          <b-form-row>
            <b-col>
              <b-button
                class="button-form-modale close-button"
                @click="$bvModal.hide('deletion-confirmation-modal')"
                >Close</b-button
              >
              <b-button
                class="button-form-modale"
                @click="onSubmit"
                variant="danger"
                >Delete</b-button
              >
            </b-col>
          </b-form-row>
        </b-modal>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch("deleteAccount");
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
  margin-bottom: $s-size;
}
.button-form {
  max-width: 300px;
  min-width: 250px;
  margin-top: $s-size;
  @media (max-width: $desktop-breakpoint) {
    width: 100%;
  }
}
.button-form-modale {
  width: 100%;
}

.close-button {
  margin-bottom: $xs-size;
}

.button-form-container {
  display: flexbox;
  text-align: center;
}
</style>
