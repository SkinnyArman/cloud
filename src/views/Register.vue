<template>
  <v-main>
    <v-layout>
      <v-flex lg12 class="item">
        <v-card elevation="7" :loading="isLoading" tile class="maindiv">
          <v-card-title class="justify-center">
            <v-img
              src="https://i.ibb.co/w4b9QFL/myLogo.jpg"
              max-height="120"
              max-width="120"
              contain
            ></v-img>
          </v-card-title>
          <v-card-subtitle>Create an account right now!</v-card-subtitle>

          <v-btn
            plain
            tile
            @click="changeMode('signup')"
            :class="{ active: mode === 'signup' }"
            >Sign up</v-btn
          >
          <v-btn
            plain
            tile
            @click="changeMode('login')"
            :class="{ active: mode === 'login' }"
            >Login</v-btn
          >
          <v-form
            v-if="mode == 'signup'"
            @submit.prevent="submitForm"
            ref="form"
            class="pl-5 pr-5 pb-5"
          >
            <v-text-field
              prepend-icon="mdi-account"
              required
              v-model="name"
              :error-messages="nameErrors"
              label="Name"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>

            <v-text-field
              prepend-icon="mdi-account"
              required
              v-model="lastname"
              label="Last Name"
              :error-messages="lastNameErrors"
              @input="$v.lastname.$touch()"
              @blur="$v.lastname.$touch()"
            ></v-text-field>

            <v-text-field
              prepend-icon="mdi-email"
              label="Email Address"
              v-model="email"
              required
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>

            <v-text-field
              prepend-icon="mdi-lock"
              label="Password"
              required
              type="password"
              v-model="password"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              :error-messages="passwordErrors"
            ></v-text-field>

            <v-text-field
              prepend-icon="mdi-lock"
              label="Repeat Password"
              required
              type="password"
              v-model="repeatPassword"
              :error-messages="repeatPasswordErrors"
              @input="$v.repeatPassword.$touch()"
              @blur="$v.repeatPassword.$touch()"
            ></v-text-field>

            <v-row class=" justify-center">
              <v-col class="mt-2 " cols="12" sm="6" md="4">
                <v-btn
                  tile
                  class="white--text"
                  color="#2565C7"
                  :loading="isLoading"
                  @click="submitForm"
                  >{{ this.mode == "signup" ? "Sign Up" : "Login" }}</v-btn
                >
              </v-col>
            </v-row>
          </v-form>

          <form
            v-if="mode == 'login'"
            ref="form"
            @submit.prevent="submitForm"
            class="pa-5"
          >
            <v-text-field
              prepend-icon="mdi-email"
              label="Email Address"
              v-model="loginemail"
              :error-messages="emailErrors"
            ></v-text-field>

            <v-text-field
              prepend-icon="mdi-lock"
              label="Password"
              required
              v-model="loginpassword"
              type="password"
              :error-messages="passwordErrors"
            ></v-text-field>

            <v-row class=" justify-center">
              <v-col class="mt-2" cols="12" sm="6" md="4">
                <v-btn
                  tile
                  class="white--text"
                  color="#2565C7"
                  :loading="isLoading"
                  @click="submitForm"
                  >{{ this.mode === "signup" ? "Sign Up" : "Get in" }}</v-btn
                >
              </v-col>
            </v-row>
          </form>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- ERROR DIALOG -->

    <!-- <v-row justify="center">
      <v-dialog v-model="vpnError" max-width="290">
        <v-card class="errorDiv">
          <v-card-title class="text-h5">
            (sigh...) Turn on your VPN!
          </v-card-title>
          <v-card-text class="text-left">
            This app has been developed with Google's Firebase service which at
            time does NOT support IPs coming from Iran. If that's the case, turn
            on your VPN and try signing up or logging in again!
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              plain
              text-center
              @click="closeDialog"
            >
              Alright
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row> -->

    <!--ACTUAL ERROR DIALOG-->
    <v-dialog v-model="vpnError" width="500">
      <v-card>
        <v-card-title class="text-h5 white--text primary">
          (sigh...) Turn on your VPN!
        </v-card-title>

        <v-card-text class="mt-5">
          <p class="black--text">
            This app has been developed with Google's Firebase service which at
            time does NOT support IPs coming from Iran. If that's the case, turn
            on your VPN and try signing up or logging in again!
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="vpnError = false">
            ALRIGHT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="emailError" width="500">
      <v-card>
        <v-card-title class="text-h5 white--text primary">
          Invalid Email or Password!
        </v-card-title>

        <v-card-text class="mt-5">
          <p class="black--text">
            Check your details again!
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="emailError = false">
            ALRIGHT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      isLoading: false,
      name: "",
      lastname: "",
      email: "",
      mode: "signup",
      password: null,
      repeatPassword: null,
      active: "true",
      formIsValid: false,
      loginemail: "",
      loginpassword: null,
      vpnError: false,
      emailError: false,
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10),
    },
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
    lastname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10),
    },
    email: { required, email },
  },
  mixins: [validationMixin],
  methods: {
    async submitForm() {
      this.formIsValid = true;
      this.vpnError = false;
      if (this.mode == "signup") {
        if (this.$v.$invalid) {
          this.formIsValid = false;
          return;
        }
        this.isLoading = true;

        await this.$store.dispatch("signup", {
          email: this.email,
          password: this.password,
          name: this.name,
          lastName: this.lastname,
        });

        if (this.$store.getters.fetchErrorType == 1) {
          this.vpnError = true;
        } else if (this.$store.getters.fetchErrorType == 400) {
          this.emailError = true;
        } else {
          this.$router.push("./panel");
        }
        //   this.emailError = true;
        // } else if (this.$store.getters.fetchErrorType == 0) {
        //   this.vpnError = true;
        // } else {

        this.isLoading = false;

        // the else statement below does the thing for logging in
      } else {
        this.formIsValid = true;
        this.isLoading = true;

        await this.$store.dispatch("login", {
          email: this.loginemail,
          password: this.loginpassword,
        });

        setTimeout(() => {
         if (this.$store.getters.fetchErrorType == 1) {
          this.vpnError = true;
        } else if (this.$store.getters.fetchErrorType == 400) {
          this.emailError = true;
        } else {
          this.$router.push("./panel");
        }
        }, 2000); 

        this.isLoading = false;
      }
    },
    changeMode(mode) {
      this.mode = mode;
    },
    setName(value) {
      this.name = value;
      this.$v.name.$touch();
    },

  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;

      !this.$v.name.minLength &&
        errors.push("Name must be at least 3 characters long");

      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");

      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];

      if (!this.$v.lastname.$dirty) return errors;

      !this.$v.lastname.minLength &&
        errors.push("Last name must be at least 3 characters long");

      !this.$v.lastname.maxLength &&
        errors.push("Last name must be at most 10 characters long");

      !this.$v.lastname.required && errors.push("Last name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;

      !this.$v.password.minLength &&
        errors.push("Password must be at least 6 characters long");

      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;

      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("Password should be identical");

      return errors;
    },
  },
};
</script>

<style scoped>
.v-main {
  background-image: url("download.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  position: relative;
}
.v-layout {
  position: relative;
}
.maindiv {
  justify-self: center;
  position: absolute;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  min-width: 350px;
}
.active {
  background-color: #651fff;
  color: white;
}
.errorDiv {
  max-width: 400px;
}
</style>
