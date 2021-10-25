<template>
  <v-main>
    <home-nav></home-nav>

    <v-layout class="mt-5 pa-10">
      <v-container>
        <v-row>
          <v-flex
            class="align-self-center "
            v-animate-css="'slideInLeft'"
            md8
            lg6
          >
            <h1 :style="{ color: '#0D47A1' }">
              Cloud services have never been this much convenient
            </h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
              eligendi illum nihil, dolores aliquid quos consequuntur debitis
              possimus corporis provident dolorem, modi quam ullam vel saepe
              quaerat? Accusamus, non velit.
            </p>

            <v-btn
              tile
              class="white--text"
              color="#2565C7"
              router
              to="./register"
            >
              {{
                this.$store.getters.logState
                  ? "GO TO DASHBOARD"
                  : "SIGN UP NOW!"
              }}
            </v-btn>
          </v-flex>

          <v-flex
            v-animate-css="'fadeIn'"
            md4
            lg6
            class="mt-10 hidden-sm-and-down "
          >
            <v-img
              contain
              max-height="500"
              max-width="500"
              src="https://i.ibb.co/G7VLHBc/home-V3-01.png"
            />
          </v-flex>
        </v-row>
      </v-container>
    </v-layout>
    <validation-provider></validation-provider>
  </v-main>
</template>

<script>
import HomeNav from '../components/HomeNav.vue'

export default {
  components:{
    HomeNav
  },
  data() {
    return {
      open: true,
    };
  },
  methods: {
    topButtonAction() {
      if (this.$store.getters.logState) {
        this.logout();
      } else {
        this.$router.push("/register");
      }
    },
    logout() {
      this.$store.dispatch("logoutaction");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
h1 {
  font-family: "Poppins";
  letter-spacing: 1.5px;
  font-size: 3rem;
}
</style>
