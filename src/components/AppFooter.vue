<template>
  <v-card flat height="50px">
    <v-footer v-bind="localAttrs" :padless="padless">
      <v-card
        elevation="5"
        outlined
        width="100%"
        class="white lighten-1 text-center"
      >
        <!-- <v-card-text>
            something about him
        </v-card-text>

        <v-divider class="primary"></v-divider> -->

        <v-card-text class="primary--text">
          <h2>Summary: {{ price * quantity }}$</h2>
        </v-card-text>

        <div class="footer-input">
          <v-btn
            @click="quantity == 1 ? (quantity = 1) : quantity--"
            small
            tile
            color="primary"
            >-</v-btn
          >
          <input :value="quantity" type="number" />
          <v-btn
            @click="quantity == 10 ? (quantity = 10) : quantity++"
            small
            tile
            color="primary"
            >+</v-btn
          >
        </div>
        <v-btn @click="deploy" color="primary" class="deploy">Deploy Now</v-btn>

      </v-card>
    </v-footer>

    <v-row align="center" justify="center" class="ma-12"> </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["price"],
  methods:{
    deploy(){
      this.$emit('deploy-server',this.quantity)
    }
  },
  data: () => ({
    quantity: 1,
    localAttrs: { fixed: true },
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
    items: ["default", "absolute", "fixed"],
    padless: true,
    variant: "default",
  }),
};
</script>

<style scoped>
@media screen and (min-width: 1300px) {
  .footer-input {
    position: absolute;
    bottom: 15%;
    right: calc(100vw - 400px);
  }
  .deploy{
  position: absolute;
  right: 1%;
  bottom: 15%;
}
}
.v-btn {
  margin-bottom: 1px;
}

input {
  text-align: center;
  width: 50px;
  border: 1px solid #aeb6d5;
  outline: 1px solid #1976d2;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
