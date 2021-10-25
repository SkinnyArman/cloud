<template>

    <v-app>
      
      <router-view></router-view>
     

    </v-app>

</template>

<script>
// import HomeNav from './components/HomeNav.vue'

export default {
  components:{
    
    
  },
  name: 'App',

  data: () => ({
    //
  }),
  //auto login
  beforeCreate(){
    if (localStorage.getItem('token')){
      console.log('userexists')
      console.log(this.$store.getters.logState)
      this.$store.commit('setUser',{localId:localStorage.getItem('userId'),userToken:localStorage.getItem('token'),userName:localStorage.getItem('userName')
      })
      
    }
  }
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Asap:wght@500&family=Bebas+Neue&display=swap');

*{
  font-family: 'Bebas Neuwe',sans-serif;
}

</style>
