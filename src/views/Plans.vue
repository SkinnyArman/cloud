<template>
  <v-main>
    <dashboard-header></dashboard-header>
    <dashboard-nav></dashboard-nav>
    <v-container class="ml-5 mr-5 mt-15 pa-5">
      <p class="display-2">Servers Made By You</p>
      <v-card elevation="7" class="pa-3" width="90%">
        <base-spinner v-if="isLoading"></base-spinner>
        <div v-if="!isLoading && servers.length>0">
          <v-layout v-for="server in servers" :key="server.serverCity" row wrap class="pa-3">
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Server</div>
              <div>{{server.server}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Server Type</div>
              <div>{{server.serverType}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Server Size</div>
              <div>{{server.serverSize}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Server Location</div>
              <div>{{server.serverCity}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Quantity</div>
              <div>{{server.serverQuantity}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="text-left mt-2">
                <v-chip
                color="green"
                  class="white--text"
                  >Online</v-chip
                >
              </div>
            </v-flex>
          </v-layout>
        </div>
        <div v-else-if="!isLoading && servers.length<1">
        You Haven't deployed any servers yet!
        </div>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import DashboardNav from "../components/dashboardNav.vue";
import BaseSpinner from "../components/BaseSpinner.vue";
import DashboardHeader from "../components/DashboardHeader.vue"

export default {
  components: {
    DashboardNav,
    BaseSpinner,
    DashboardHeader
  },

  data() {
    return {
      isLoading: true,
      servers: [],
    };
  },
  created() {
    const userId = localStorage.getItem("userId");
    fetch(`https://armancloud-cdc8f-default-rtdb.firebaseio.com/${userId}.json`)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        for (let i in resp) {
          this.servers.push(resp[i]);
        }
        this.isLoading = false;
      });
  },
};
</script>
