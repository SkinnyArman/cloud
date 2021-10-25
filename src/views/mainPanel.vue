<template>
  <v-main>
    <dashboard-header></dashboard-header>
    <dashboard-nav></dashboard-nav>

    <v-layout>
      <v-container class="mt-8 ml-3">
        <select-server @select-server="getServer($event)"></select-server>
        <server-location
          @server-location="getLocation($event)"
        ></server-location>
        <server-type @server-type="getType($event)"></server-type>
        <server-size @server-price="getPrice($event)"></server-size>
        <app-footer
          @deploy-server="submit($event)"
          :price="serverPrice"
        ></app-footer>

        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                Click Me
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 white--text primary">
                Settings Required
              </v-card-title>

              <v-card-text class="mt-5">
                <p class="black--text">
                  You should select all the settings required for setting up a
                  new server
                </p>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  ALRIGHT
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-container>
    </v-layout>
  </v-main>
</template>

<script>
import DashboardNav from "../components/dashboardNav.vue";
import SelectServer from "../components/SelectServer.vue";
import ServerLocation from "../components/ServerLocation.vue";
import ServerType from "../components/ServerType.vue";
import ServerSize from "../components/ServerSize.vue";
import AppFooter from "../components/AppFooter.vue";
import DashboardHeader from "../components/DashboardHeader.vue";

export default {
  components: {
    DashboardNav,
    ServerLocation,
    SelectServer,
    ServerType,
    ServerSize,
    AppFooter,
    DashboardHeader,
  },
  data() {
    return {
      server: null,
      serverPrice: null,
      serverSize: null,
      serverCity: null,
      serverCountry: null,
      serverType: null,
      serverSettings: null,
      serverQuantity: null,
      totalPrice: null,
      dialog: false,
      clicked: false,
    };
  },
  methods: {
    getPrice(value) {
      this.serverPrice = value.month;
      this.serverSize = value.capacity;
    },
    getServer(value) {
      console.log(value);
      this.server = value;
    },
    getLocation(value) {
      this.serverCity = value.city;
      this.serverCountry = value.country;
    },
    getType(value) {
      this.serverType = value[0].title;
      this.serverSettings = value[1];
    },
    submit(quantity) {
      this.serverQuantity = quantity;
      this.totalPrice = quantity * this.serverPrice;
      if (
        this.server != null &&
        this.serverPrice != null &&
        this.serverSize != null &&
        this.serverCity != null &&
        this.serverCountry != null &&
        this.serverType != null &&
        this.serverSettings != null
      ) {
        const serverData = {
          server: this.server,
          serverPrice: this.serverPrice,
          serverSize: this.serverSize,
          serverCity: this.serverCity,
          serverCountry: this.serverCountry,
          serverType: this.serverType,
          serverSettings: this.serverSettings,
          serverQuantity: quantity,
          totalPrice: this.totalPrice,
        };
        this.$store.dispatch("setServer", serverData);
        this.clicked = false;
        const userId = localStorage.getItem("userId");
        fetch(
          `https://armancloud-cdc8f-default-rtdb.firebaseio.com/${userId}.json`,
          {
            method: "POST",
            body: JSON.stringify({
              server: this.server,
              serverPrice: this.serverPrice,
              serverSize: this.serverSize,
              serverCity: this.serverCity,
              serverCountry: this.serverCountry,
              serverType: this.serverType,
              serverSettings: this.serverSettings,
              serverQuantity: quantity,
              totalPrice: this.totalPrice,
            }),
          }
        );
        this.$router.push("panel/success");
      } else {
        this.dialog = true;
      }
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
* {
  font-family: "Roboto";
}
.submitBtn {
  position: absolute;
  bottom: 0;
  right: 0;
}
.deploy {
  position: absolute;
  bottom: 50px;
  right: 0;
}
.v-container {
  position: relative;
}
.app-footer {
  z-index: -1;
}
</style>
