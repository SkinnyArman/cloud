<template>
  <nav>
    <v-app-bar v-model="open" app color="white">
      <v-img
        class="mx-2"
        src="https://i.ibb.co/w4b9QFL/myLogo.jpg"
        max-height="120"
        max-width="120"
        contain
      ></v-img>

      <v-spacer></v-spacer>

      <v-btn plain>
        Brands
      </v-btn>

      <v-btn plain>
        Partners
      </v-btn>

      <v-btn plain>
        Contact Us
      </v-btn>

      <v-btn @click="btnAction" plain>
        <v-icon left>mdi-account</v-icon>
        {{whichBtnToShow}}
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      open: true,
    };
  },
  methods:{
    btnAction(){
      if (this.$store.getters.logState){
        this.$store.dispatch('logoutaction')
      } else {
        this.$router.push('/register')
      }
    }
  },
  computed:{
    whichBtnToShow(){
      if (this.$store.getters.logState){
        return 'Sign Out'
      } else {
        return 'Login'
      }
    }
  }
};
</script>
