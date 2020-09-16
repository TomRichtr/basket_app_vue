<template>
  <div class="item-list-container" v-if="itemsCount != 0">
    <p class="mark-down">Click on an item to mark it as bought.</p>
    <b-row>
      <b-col
        :id="item.id"
        sm="4"
        md="3"
        lg="2"
        :key="item.id"
        v-for="item in items"
      >
        <b-popover :target="item.id" triggers="hover" placement="top">
          <template v-slot:title>{{ item.category }}</template>
          <p>Note: {{ item.note }}</p>
          <p>Might costs: {{ item.expectedExpense }}</p>
          <p class="popover-markdown">Click on item to mark it as bought.</p>
        </b-popover>
        <div class="controls-container">
          <font-awesome-icon
            class="fa"
            :icon="['fa', 'pen-square']"
            size="lg"
            @click="editItem(item)"
          />
          <font-awesome-icon
            class="fa"
            :icon="['fa', 'times-circle']"
            size="lg"
            @click="deleteItem(item.id)"
          />
        </div>
        <b-alert
          :class="classCategory(item.category)"
          show
          class="item-body-container"
        >
          <div
            @click="checkItem(item)"
            class="item-body"
            :id="[item.checked ? 'checked' : '']"
          >
            <p class="description-paragraph">{{ item.description }}</p>
          </div>
        </b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ items: "filteredItemsArray", itemsCount: "itemsCount" }),
  },
  created() {
    this.$store.dispatch("fetchItems");
  },
  methods: {
    deleteItem(id) {
      this.$store.dispatch("deleteItem", { id: id });
    },
    checkItem(item) {
      const checker = item.checked === true ? false : true;
      this.$store.dispatch("checkItem", { id: item.id, checkUpdate: checker });
    },
    editItem(item) {
      this.$store.dispatch("editItem", {
        id: item.id,
        category: item.category,
        description: item.description,
        note: item.note,
        expectedExpense: item.expectedExpense,
      });
      this.$emit("editItem");
    },
    classCategory(category) {
      if (category === "Cosmetics") {
        return "cosmetics";
      }
      if (category === "Alcoholic Drinks") {
        return "alcoholic-drinks";
      }
      if (category === "Non-alcoholic Drinks") {
        return "non-alcoholic-drinks";
      }
      if (category === "Pastry") {
        return "pastry";
      }
      if (category === "Fruit") {
        return "fruit";
      }
      if (category === "Vegetables") {
        return "vegetables";
      }
      if (category === "Fresh Meat") {
        return "fresh-meat";
      }
      if (category === "Vacuumed Meat") {
        return "vacuumed-meat";
      }
      if (category === "Pets") {
        return "pets";
      }
      if (category === "Baking") {
        return "baking";
      }
      if (category === "Others") {
        return "others";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";

.popover-markdown {
  font-style: italic;
  font-size: $xs-size;
  padding: 0px;
  margin: 0px;
}
.item-body-container {
  border-radius: $xs-size;
}
#checked {
  background: fade-out($color: green, $amount: 0.3);
}
.controls-container {
  text-align: right;
  position: relative;
  top: 3px;
  :hover {
    cursor: pointer;
  }
  .fa {
    color: $color1;
    margin-left: $xs-size/2;
    :hover {
      cursor: pointer;
      color: darken($color1, 20%);
    }
  }
}
.item-body {
  display: flex;
  justify-content: space-around;
  margin-top: 0px;
  overflow: hidden;
  align-items: center;
  height: $xl-size * 1.3;
  border-radius: $xs-size;
  vertical-align: middle;
  &:hover {
    cursor: pointer;
  }
}
.description-paragraph {
  margin: 0px;
  color: black;
  text-align: center;
  font-size: $xs-size * 1.8;
}
.item-list-container {
  padding: $xs-size;
  background: lighten($color1, 20%);
  border-radius: $xs-size;
}
.cosmetics {
  background: url("../assets/cosmetics.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.alcoholic-drinks {
  background: url("../assets/alcoholic-drinks.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.non-alcoholic-drinks {
  background: url("../assets/non-alcoholic-drinks.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.pastry {
  background: url("../assets/pastry.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.fruit {
  background: url("../assets/fruit.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.vegetables {
  background: url("../assets/vegetables.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.fresh-meat {
  background: url("../assets/fresh-meat.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.vacuumed-meat {
  background: url("../assets/sausage.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.pets {
  background: url("../assets/pets.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.baking {
  background: url("../assets/baking.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.others {
  background: url("../assets/others.jpg");
  background-size: cover;
  padding: 0px;

  div {
    background: fade-out($color: white, $amount: 0.3);
    padding: $xs-size;
  }
}
.mark-down {
  margin: 0px;
  padding: 0px;
  font-size: $xs-size;
  text-align: right;
  color: fade-out($color: black, $amount: 0.5);
}
</style>
