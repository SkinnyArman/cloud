<template>
  <nav>
    <v-app-bar v-model="open" color="white">
      <v-img
        class="mx-2"
        src="https://i.ibb.co/w4b9QFL/myLogo.jpg"
        max-height="120"
        max-width="120"
        contain
      ></v-img>

      <v-spacer></v-spacer>

      <v-btn @click="navigateToHome" plain>
        Main Page
      </v-btn>

      <v-btn @click="signout" plain>
        <v-icon left>mdi-account-arrow-right</v-icon>
        Sign Out
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
  methods: {
    signout() {
      this.$store.dispatch("logoutaction");
      this.$router.replace("/");
    },
    navigateToHome() {
      this.$router.replace("/");
    },
  },
};
</script>
