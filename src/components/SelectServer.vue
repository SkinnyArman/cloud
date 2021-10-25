<template>
  <v-row >
    <v-col cols="12" :style="{ fontSize: '32px' }"><p class="display-1">Select Server</p></v-col>
    <v-col
      v-for="(item, index) in cards"
      :key="index+10"
      xl="3"
      lg="3"
      md="3"
      xs="12"
      sm="6"
      @click="selectServer(index)"
      class="cart"
    >
      <v-card elevation="8" outlined tile>
        <v-card-actions class="justify-center ">
          <v-col>
            <v-card-actions class="justify-center">
              <v-img
                :src="item.link"
                contain
                max-height="150px"
                max-width="150px"
              ></v-img>
            </v-card-actions>
            <v-card-title class="justify-center text-no-wrap">{{ item.title }}</v-card-title>
          </v-col>
        </v-card-actions>

        <div class="ribbon-wrapper-1" v-if="server == index">
          <div class="ribbon-1">Selected</div>
        </div>

      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
* {
  font-family: "Poppins";
}
.check {
  position: absolute;
  top: 0;
  right: 0;
}
.cart{
  cursor: pointer;
}

.ribbon-wrapper-1 {
  width: 106px;
  height: 108px;
  overflow: hidden;
  position: absolute;
  top: -6px;
  right: -6px; }

.ribbon-1 {
  font: bold 15px Sans-Serif;
  line-height: 18px;
  color: #333;
  text-align: center;
  text-transform: uppercase;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  position: relative;
  padding: 7px 0;
  left: -11px;
  top: 26px;
  width: 150px;
  background-color: #6daaab;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px; }

.ribbon-1:before, .ribbon-1:after {
  content: "";
  border-top: 4px solid #4e7c7d;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  position: absolute;
  bottom: -4px; }

.ribbon-1:before {
  left: 0; }

.ribbon-1:after {
  right: 0; }

.v-card:hover{
  transform: scale(1.05);
}
.v-card{
  transition: transform 0.2s linear;

}

/* 
.scaled{
  transform: scale(1.05);
}
.cart{
    transition: transform 1s linear;
} */
</style>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: "High Frequency",
          link: "https://i.ibb.co/60RjBgC/server.png",
        },
        {
          title: "Cloud Compute",
          link: "https://i.ibb.co/PQbBgck/server2.png",
        },
        { title: "Bare Metal", link: "https://i.ibb.co/JFDLZH3/server3.png" },
        {
          title: "Dedicated Cloud",
          link: "https://i.ibb.co/sWtmHfs/tothestars.png",
        },
      ],
      server: "",
    };
  },
  methods: {
    selectServer(value) {
      this.server = value;
      // console.log(this.cards[value].title)
      this.$emit('select-server',this.cards[value].title)
    },
  },
};
</script>
