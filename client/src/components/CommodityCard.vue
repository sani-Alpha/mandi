<template>
    <div class="commodity-card">
        <div class="e-card">
            <div class="e-card-header">Name</div>
            <div class="e-card-content">
                Details:-<br>
                <span>
                    <small>* Min Price -></small><br>
                    <small>* Max Price -></small><br>
                    <small>* Modal Price -></small><br>
                </span>
            </div>
            <div class="e-card-actions">
                <button class="e-card-btn">
                    <img class="btn-img" src="../assets/like.png" title="Like">
                </button>
            </div>
        </div>
        <!-- <div class="card">
            <info-card :frontType="'text'"
                :frontTitle='front.title'
                :frontData="front.message"
                :backType="'text'"
                :backTitle="back.title"
                :backData="back.message" />
        </div> -->
        <!-- <div class="card">
            <v-card elevation="2" outlined shaped>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="overline mb-1">Name</v-list-item-title>
                        <div class="headline mb-5">
                            <p>* MIN PRICE:</p>
                            <p>* MAX PRICE:</p>
                            <p>* MODAL PRICE:</p>
                        </div>
                    </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                    <v-button outlined rounded icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-button>
                </v-card-actions>
            </v-card>
        </div> -->
    </div>
</template>
<script>
// import InfoCard from 'vue-info-card';

export default {
  components: {

    // InfoCard,
  },
//   data() {
//     return {
//       front: {
//         title: 'Commodity',
//         message: 'Variety'
//       },
//       back: {
//         title: 'Daily Price',
//         message: `minPrice: 18, maxPrice: 22, modalPrice: 19.5`
//       },
//     };
//   },
};
</script>
<style lang="scss" scoped>
    .e-card {
        border: 2px black;
        max-width: 400px;
        width: 300px;
    }
    .e-card-actions {
        .btn-img {
            height: 18px;
            width: 18px;
        }
    }
    .card {
        width: 400px;
        margin: 10px;
    }
</style>