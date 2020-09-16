<template>
  <div class="form-container">
    <div :class="{ hidden: hide }">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="form">
        <b-form-row>
          <b-col sm>
            <b-form-group
              id="form-category-label"
              label="Category:"
              label-for="form-category"
              description="Mandatory"
            >
              <b-form-select
                id="form-category"
                v-model="form.category"
                :options="category"
                placeholder="Pick a category"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="form-description-label"
              label="Description (max 50 chars.):"
              label-for="form-description"
              description="Mandatory"
            >
              <b-form-input
                id="form-description"
                v-model="form.description"
                required
                placeholder="Enter description"
              ></b-form-input>
              <b-form-text v-if="errorDescription">{{
                errorDescription
              }}</b-form-text>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="form-note-label"
              label="Note (max 500 chars.):"
              label-for="form-note"
            >
              <b-form-textarea
                id="form-note"
                style="height:61px;"
                rows="1"
                v-model="form.note"
                placeholder="Enter note"
              ></b-form-textarea>
              <b-form-text v-if="errorNote">{{ errorNote }}</b-form-text>
            </b-form-group>

            <b-form-group
              id="form-expected-expenses-label"
              label="Expected Expenses:"
              label-for="form-expected-expenses"
            >
              <b-form-input
                id="form-expected-expenses"
                type="number"
                v-model="form.expectedExpense"
                placeholder="Enter note"
              ></b-form-input>
              <b-form-text v-if="errorExpense">{{ errorExpense }}</b-form-text>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-button class="button-form" type="submit" variant="primary">{{
              toEdit ? "Confrim Changes" : "Add"
            }}</b-button>
          </b-col>
          <b-col>
            <b-button class="button-form" type="reset" variant="warning"
              >Reset form</b-button
            >
          </b-col>
          <b-col>
            <b-button class="button-form" variant="danger" @click="resetBasket"
              >Reset basket</b-button
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

          {{ hide ? " Add an item or reset your basket" : " Hide" }}</b-button
        ></b-col
      ></b-row
    >
    <ItemsFilters> </ItemsFilters>
    <ItemsList @editItem="pupolateFormWithEditItemData"></ItemsList>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import ItemsList from "./ItemsList";
import ItemsFilters from "../components/ItemsFilters";

export default {
  components: {
    ItemsList,
    ItemsFilters,
  },
  data() {
    return {
      form: {
        category: null,
        description: "",
        note: "",
        expectedExpense: 0,
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
      show: true,
      hide: true,
      toEdit: false,
      errorDescription: false,
      errorNote: false,
      errorExpense: false,
    };
  },
  methods: {
    resetBasket() {
      this.$store.dispatch("resetBasket", []);
    },
    onClickHide() {
      this.hide = !this.hide;
    },
    onReset(evt) {
      evt.preventDefault();
      this.toEdit = false;
      // Reset our form values
      this.form.category = null;
      this.form.description = "";
      this.form.note = "";
      this.form.expectedExpense = 0;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (this.form.description.length >= 50) {
        this.errorDescription =
          "Maximum length of description is 50 characters.";
      } else {
        this.errorDescription = false;
      }
      if (this.form.note.length >= 500) {
        this.errorNote = "Maximum length of note is 500 characters.";
      } else {
        this.errorNote = false;
      }
      if (this.form.expectedExpense < 0) {
        this.errorExpense = "Expected expense can't be negative.";
      } else {
        this.errorExpense = false;
      }
      if (!this.errorDescription && !this.errorNote && !this.errorExpense) {
        if (this.toEdit === false) {
          this.$store.dispatch("storeItems", {
            ...this.form,
            id: uuidv4(),
          });
          this.onReset(evt);
        } else {
          this.$store.dispatch("updateItem", {
            ...this.form,
            id: this.$store.getters.editedItem.id,
          });
          this.onReset(evt);
          this.toEdit = false;
        }
      } else {
        return;
      }
    },
    pupolateFormWithEditItemData() {
      this.hide = false;
      this.toEdit = true;
      this.form.category = this.$store.getters.editedItem.category;
      this.form.description = this.$store.getters.editedItem.description;
      this.form.note = this.$store.getters.editedItem.note;
      this.form.expectedExpense = this.$store.getters.editedItem.expectedExpense;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";

.hidden {
  display: none;
}
.button-form {
  width: 100%;
  height: 100%;
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
</style>
