<template>
    <v-navigation-drawer
    width="200px"
    app
    class="deep-purple accent-4"
  >
    <v-layout column align-center>
      <v-flex class="mt-5">
        <v-avatar size="100">
          <img
            color="white"
            src="https://i.ibb.co/r4PmQ1h/img-258083.png"
          />
        </v-avatar>
        <p class="white--text subheading mt-1">{{name}}</p>
      </v-flex>
    </v-layout>

    <v-list>
      <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
        <v-list-item-action>
          <v-icon x-large class="white--text">{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="white--text">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-spacer></v-spacer>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="logout" dark block>
            Logout
          </v-btn>
        </div>
      </template>
  </v-navigation-drawer>
</template>
<script>
export default{
  data() {
    return {
      items: [
        { title: "Deploy", icon: "mdi-view-dashboard", route: "/panel" },
        {title:"My Plans", icon:"mdi-application-parentheses", route:"/plans"},
        { title: "Billing", icon: "mdi-cash", route: "/billing" },
        { title: "Support", icon: "mdi-gavel", route: "/support" },
        { title: "Account", icon: "mdi-account-wrench", route: "/account" },
      ],
    };
  },
  methods:{
    logout(){
      this.$store.dispatch('logoutaction')
      this.$router.replace('/')
    }
  },
  computed:{
    name(){
      return localStorage.getItem('userName')
    }
  }
}
</script>