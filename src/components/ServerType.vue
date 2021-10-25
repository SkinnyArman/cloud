<template>
  <v-layout class="mt-6">
    <v-row>
      <v-col cols="12" :style="{ fontSize: '32px' }"><p class="display-1">Select Server Type</p></v-col>

      <v-col v-for="(item, index) in items" :key="index+10" xs="12" sm="6" md="4" lg="3" xl="3">
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-card
                color="white"
                class="black--text"
                elevation="2"
                outlined
                tile
                dark
                v-bind="attrs"
                v-on="on"
                @click="selectType(index)"
              >
                <v-row>
                  <v-col cols="5">
                    <v-img contain height="80px" :src="item.src"></v-img>
                  </v-col>

                  <v-col
                    class="d-flex flex-column justify-center align-center"
                    cols="7"
                  >
                    <div>
                      <v-card-title class="text-no-wrap"
                        ><strong>{{ item.title }}</strong></v-card-title
                      >
                    </div>

                    <div v-if="selected == index">{{settings}}</div>
                  </v-col>
                </v-row>
                <div class="check" v-if="selected == index"></div>
              </v-card>
            </template>
            <v-list>
              <v-list-item @click="selectSettings(option)" v-for="(option) in item.versions" :key="option+100">
                <v-list-item-title  >{{ option }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>
  </v-layout>
  
</template>

<script>
export default {
  methods:{
    selectType(index){
      this.selected=index
      this.settings=''
    },
    selectSettings(value){
      this.settings=value
      this.$emit('server-type',[this.items[this.selected],this.settings])
    },
  },
  data: () => ({
    settings:'',
    selected: 0,
    items: [
      {
        title: "AlmaLinux",
        src: "https://i.ibb.co/q07MGGS/icon-alma.png",
        versions: ["6 x64", "9 x64"],
      },
      {
        title: "Cent OS",
        versions: ["8 x64", "8 Stream x64", "7 x64", "7 x64"],
        src: "https://i.ibb.co/PjYTb6Q/icon-centos.png",
      },
      {
        title: "Debian",
        versions: ["11 x64", "10 x64", "9 x64"],
        src: "https://i.ibb.co/wLy3Y6x/icon-debian.png",
      },
      {
        title: "Fedora",
        versions: ["35 x64", "34 x64", "33 x64"],
        src: "https://i.ibb.co/vqvnZwm/icon-fedora.png",
      },
      {
        title: "FreeBSD",
        versions: ["13.0 x64", "12.2 x64", "11.4 x64"],
        src: "https://i.ibb.co/wKf2B0Z/icon-freebsd.png",
      },
      {
        title: "OpenBSD",
        versions: ["6.8 x64", "6.9 x64", "7 x64"],
        src: "https://i.ibb.co/jvSmkMM/icon-openbsd.png",
      },
      {
        title: "Rocky Linux",
        src: "https://i.ibb.co/HY7LJNW/icon-rockylinux.png",
        versions: ["15 x64", "16 x64"],
      },
      {
        title: "Ubuntu",
        versions: [
          "21.04 x64",
          "20.10 x64",
          "20.04 x64",
          "18.04 x64",
          "16.04 x64",
        ],
        src: "https://i.ibb.co/5K2HQ01/icon-ubuntu.png",
      },
      {
        title: "VzLinux",
        src: "https://i.ibb.co/yW51fVg/icon-vzlinux.png",
        versions: ["8 x64", "8 x32"],
      },
      {
        title: "Windows",
        versions: ["2019 x64", "2016 x64", "2012 R2 x64"],
        src: "https://i.ibb.co/5kQWxp9/icon-windows.png",
      },
    ],
  }),
};
</script>

<style scoped>
.v-card {
  position: relative;
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
