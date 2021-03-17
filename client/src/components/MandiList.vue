<template>
  <div class="commodities container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="search-wrapper">
          <input
            class="form-control"
            type="text"
            v-model="searchQuery"
            placeholder="Search for Commodities"
          />
        </div>
      </div>
    </div>
    <br>
    <div class="columns is-multiline">
      <div class="row is-one-quarter">
        <div class="commodity-card" v-for="i in filteredResources" :key="i._id">
          <v-card width="250px" elevation="5" outlined shaped>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  <strong>{{ i.arrival_date }}</strong>
                </div>
                <v-list-item-title class="headline mb-1">
                  <strong>{{ i.commodity }}</strong>
                </v-list-item-title>
                <div class="data is-4">
                  <p>Min-Price: {{ i.min_price }}</p>
                  <p>Max-Price: {{ i.max_price }}</p>
                  <p>Modal-Price: {{ i.modal_price }}</p>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-button outlined rounded icon>
                <v-icon>mdi-heart</v-icon>
              </v-button>
              <CommodityGraph />
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommodityGraph from "@/components/CommodityGraph";
// import router from "../router";
import axios from "axios";

export default {
  name: "MandiList",
  components: {
    CommodityGraph,
  },
  beforeMount() {
    let record;
    axios
      .get("/api/mandi")
      .then((response) => {
        record = response.data;
        this.item = record;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      searchQuery: "",
      item: [],
    };
  },
  computed: {
    filteredResources() {
      if (this.searchQuery) {
        return this.item.filter((i) => {
          return i.commodity
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        });
      } else return this.item;
    },
  },
};
</script>

<style lang="scss" scoped>
.commodities {
  margin-top: 100px;
  margin-left: 50px;
  text-align: center;
}

.commodity-card {
  margin: 8px;
}
</style>
