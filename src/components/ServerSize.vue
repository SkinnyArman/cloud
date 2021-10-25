<template>
  <v-layout class="mt-5">
    <v-row>
      <v-col cols="12"><p class="display-1">Select Server Size</p></v-col>
      <v-col
        v-for="(item, index) in serverSizes"
        :key="item.capacity"
        xs="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          elevation="1"
          class="text-center d-flex flex-column justify-center align-center cart"
          outlined
          @click="selectSize(index)"
        >
          <h3 class="mt-5">
            <strong>{{ item.capacity }}GB NVMe</strong>
          </h3>
          <br />
          <h3 class="primary--text">${{ item.month }}/Month</h3>
          <p class="grey--text" :style="{ fontSize: '15px' }">
            {{ item.hour }}/Hour
          </p>

          <div
            :style="{
              height: '2px',
              width: '65px',
              backgroundColor: '#1976d2',
            }"
          ></div>
          <br />
          <p>
            <strong>{{ item.cpi }}</strong> CPU
          </p>
          <p>
            <strong>{{ item.memory }}GB</strong> Memory
          </p>
          <p>
            <strong>{{ item.bandwidth }}TB</strong> Bandwidth
          </p>

          <div class="check" v-if="selected == index"></div>
        </v-card>

      </v-col>
    </v-row>


  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      selected: 0,
      serverSizes: [
        {
          capacity: 32,
          month: 6,
          hour: 0.0009,
          cpu: 1,
          memory: 1,
          bandwidth: 1,
        },
        {
          capacity: 64,
          month: 12,
          hour: 0.0018,
          cpu: 1,
          memory: 2,
          bandwidth: 2,
        },
        {
          capacity: 80,
          month: 18,
          hour: 0.0027,
          cpu: 2,
          memory: 2,
          bandwidth: 3,
        },
        {
          capacity: 128,
          month: 24,
          hour: 0.0036,
          cpu: 2,
          memory: 4,
          bandwidth: 3,
        },
        {
          capacity: 256,
          month: 48,
          hour: 0.071,
          cpu: 3,
          memory: 8,
          bandwidth: 4,
        },
        {
          capacity: 384,
          month: 96,
          hour: 0.143,
          cpu: 4,
          memory: 16,
          bandwidth: 5,
        },
        {
          capacity: 448,
          month: 144,
          hour: 0.214,
          cpu: 6,
          memory: 24,
          bandwidth: 6,
        },
      ],
      items: ["default", "absolute", "fixed"],
      padless: false,
      variant: "default",

    };
  },
  methods:{
      selectSize(index){
      this.selected = index
      const plan= this.serverSizes[this.selected]
      this.$emit('server-price',plan)
      }
  },
   computed: {
      localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
          attrs.absolute = false
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
    }
};
</script>

<style scoped>
.cart {
  transition: transform 0.3s linear;
  position: relative;
}
.cart:hover {
  transform: scale(1.05);
}
.check {
  position: absolute;
  height: 10px;
  width: 10px;
  top: 0;
  right: 0;

  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 25px 25px 0;
  border-color: transparent #3afe60 transparent transparent;
}
</style>
