<template>
  <div class="commodity-card">
    <div class="card">
      <v-card elevation="5" outlined shaped>
        <v-list-item-title>Name</v-list-item-title>
        <v-list-item two-line>
          <v-list-item-content>
            <p class="minprice">MIN PRICE: 18</p>
            <p class="maxprice">MAX PRICE: 22</p>
            <p class="modalprice">MODAL PRICE: 20</p>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-button outlined rounded icon>
            <v-icon>mdi-heart</v-icon>
          </v-button>
          <!-- <CommodityGraph /> -->
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
// import CommodityGraph from '@/components/CommodityGraph';
export default {
  components: {
    //   CommodityGraph,
  },
};
</script>
<style lang="scss" scoped>
.card {
  width: 250px;
  margin: 5px;
}
</style>
