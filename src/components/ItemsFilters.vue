<template>
  <div class="form-container">
    <div :class="{ hidden: hide }">
      <b-form @reset="onReset" v-if="show" class="form">
        <b-form-row>
          <b-col sm class="filter-element-container">
            <b-form-select
              v-model="filters.sortBy"
              :options="sortBy"
              @change="filterBy"
            ></b-form-select>
          </b-col>
          <b-col sm class="filter-element-container">
            <b-form-select
              v-model="filters.category"
              :options="category"
              @change="filterBy"
            ></b-form-select>
          </b-col>
          <b-col sm class="filter-element-container">
            <b-form-select
              v-model="filters.status"
              :options="status"
              @change="filterBy"
            ></b-form-select>
          </b-col>
          <b-col sm class="filter-element-container">
            <b-form-input
              v-model="filters.description"
              @keydown.native="filterBy"
            ></b-form-input>
          </b-col>
          <b-col sm>
            <b-button
              class="button-form"
              type="reset"
              variant="warning"
              @click="onClickResetFilters"
              >Reset</b-button
            >
          </b-col>
        </b-form-row>
      </b-form>
    </div>
    <b-row class="hide-button-row">
      <b-col
        ><b-button
          @click="onClickHide"
          :class="[!hide ? 'hide-button-true' : 'hide-button-false']"
          style="background-color: #9ca3db;"
        >
          <font-awesome-icon
            class="hide-button-icon"
            :icon="['fa', 'chevron-up']"
            :class="{ hidden: hide }"
          />
          <font-awesome-icon
            class="hide-button-icon"
            :icon="['fa', 'chevron-down']"
            :class="{ hidden: !hide }"
          />

          {{ hide ? " Filter Items" : " Hide" }}</b-button
        ></b-col
      ></b-row
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        category: null,
        description: "",
        sortBy: null,
        status: null,
      },
      category: [
        { text: "Select a category", value: null },
        "Cosmetics",
        "Alcoholic Drinks",
        "Non-alcoholic Drinks",
        "Pastry",
        "Fruit",
        "Vegetables",
        "Fresh Meat",
        "Vacuumed Meat",
        "Pets",
        "Baking",
        "Others",
      ],
      sortBy: [
        { text: "Sort by", value: null },
        "Status",
        "A-Z",
        "Expected Expense",
      ],
      status: [
        { text: "All items", value: null },
        "Bought items",
        "Pending items",
      ],
      show: true,
      hide: false,
    };
  },
  methods: {
    filterBy() {
      this.$store.dispatch("filterBy", this.filters);
    },
    onClickResetFilters() {
      this.$store.dispatch("resetFilters");
    },
    onClickHide() {
      this.hide = !this.hide;
    },
    onReset(evt) {
      evt.preventDefault();
      this.filters.category = null;
      this.filters.description = "";
      this.filters.sortBy = null;
      this.filters.status = null;
      // Trick to reset/clear native browser form validation state
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
.form-group-container {
  margin: 0px;
}
.hidden {
  display: none;
}

.hide-button-row {
  text-align: right;
}

.hide-button-true {
  width: 100%;
  vertical-align: middle;
  margin-top: $s-size;
  margin-bottom: $s-size;
  padding: 0px;
  border: none;
}

.hide-button-false {
  width: 100%;
  vertical-align: middle;
  margin-bottom: $s-size;
  padding: 0px;
  border: none;
}

.hide-button-icon {
  padding: 0px;
  margin: 0px;
}
.form {
  padding: $s-size;
  background: lighten($color1, 20%);
  border-radius: $xs-size;
}
.filter-element-container {
  @media (max-width: $desktop-breakpoint) {
    margin-bottom: $xs-size;
  }
}
</style>
