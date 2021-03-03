<template>
  <div class="container">
    <v-btn outlined rounded icon @click="overlay = !overlay">
      <v-icon>mdi-chart-line</v-icon>
    </v-btn>
    <v-overlay :value="overlay" :opacity="opacity">
      <div class="card">
        <v-card class="mt-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :value="value"
              color="white"
              line-width="2"
              padding="8"
              radius="1"
            />
          </v-sheet>
        </v-card>
      </div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "CommodityGraph",
  data: () => ({
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    overlay: false,
    opacity: 0.9,
    absolute: true,
  }),
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 2000);
    },
  },
};
</script>

<style>
.card {
    height: 100px;
    width: 100px,
  }
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
