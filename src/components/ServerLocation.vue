<template>
  <v-layout class="mt-5">
    <v-container fluid style="margin: 0px; padding: 0px; width: 100%">
      <v-row>
        <v-col cols="12">
          <v-btn-toggle tile color="deep-purple accent-3" group>
            <v-btn @click="location = 'all'" value="left">
              All
            </v-btn>

            <v-btn @click="location = 'America'" value="center">
              America
            </v-btn>

            <v-btn @click="location = 'Europe'" value="right">
              Europa
            </v-btn>

            <v-btn @click="location = 'Asia'" value="justify">
              Asia
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col
          v-for="(item, index) in computedServerInfo"
          :key="item.city"
          xs="12"
          sm="6"
          md="4"
          lg="3"
          @click="selectThisLocation(item, index)"
        >
          <div class="location-card">
            <v-col cols="6">
              <!-- for some reason i had problems simply binding image src to local direction -->
              <v-img :src="picLocation(item.country)"></v-img>
            </v-col>

            <v-col @click="doTheConsole" class="country-name" cols="6">
              <div>
                <strong>{{ item.city }}</strong>
              </div>
              <div>{{ item.country }}</div>
            </v-col>

            <div class="check" v-if="selected == item.city"></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  beforeCreate() {
    fetch("https://mocki.io/v1/53375e76-ec02-414d-998e-e4af3ef02f2a")
      .then((res) => res.json())
      .then((resp) =>
        resp.forEach((item) => {
          this.serverInfo.push(item);
        })
      );
  },
  data() {
    return {
      serverInfo: [],
      location: "all",
      selected: null,
    };
  },
  methods: {
    doTheConsole() {
      console.log(this.serverInfo);
    },
    getFlag(item) {
      return `./${item.country}.svg`;
    },
    selectThisLocation(value) {
      console.log(value);
      this.selected = value.city;
      this.$emit("server-location", value);
    },
    picLocation(item) {
      if (item == "Australia") {
        return "https://i.ibb.co/DrZKhQ3/Australia.png";
      } else if (item == "Canada") {
        return "https://i.ibb.co/rGDVkww/Canada.png";
      } else if (item == "Germany") {
        return "https://i.ibb.co/XLy8pcP/Germany.png";
      } else if (item == "Japan") {
        return "https://i.ibb.co/WWG8L6n/Japan.png";
      } else if (item == "Mexico") {
        return "https://i.ibb.co/195syFq/Mexico.png";
      } else if (item == "Netherlands") {
        return "https://i.ibb.co/t81xk5V/Netherlands.png";
      } else if (item == "Singapore") {
        return "https://i.ibb.co/QM5kF2b/Singapore.png";
      } else if (item == "South Korea") {
        return "https://i.ibb.co/ns5pNyv/South-Korea.png";
      } else if (item == "United States") {
        return "https://i.ibb.co/FWXnY8P/United-States.png";
      } else if (item == "Sweden") {
        return "https://i.ibb.co/NTrHsXx/Sweden.png";
      } else if (item == "England") {
        return "https://i.ibb.co/cC0SkS5/england.png";
      } else if (item == "France") {
        return "https://i.ibb.co/XLCwZVM/france.png";
      } else {
        return null;
      }
    },
  },
  computed: {
    computedServerInfo() {
      return this.serverInfo.filter((item) => {
        if (this.location == "all") {
          return item;
        } else {
          return item.continent === this.location;
        }
      });
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 0;
}
.mycard {
  border: 1px solid black;
}
.location-card {
  display: flex;
  position: relative;
  box-shadow: 0 2px 10px rgb(0 0 0 / 30%);
  cursor: pointer;
}
.v-img {
  height: 100%;
  width: 20%;
}
.country-name {
  display: flex;
  flex-direction: column;
  margin: 0;
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
