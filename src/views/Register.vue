<template>
  <v-container class="pa-0 ma-0" fill-height fluid>
    <v-row class="pa-0 ma-0">
      <v-col class="pa-0 ma-0 background" cols="5">
        <v-container fill-height fluid>
          <v-row class="white--text">
            <v-col align="center" cols="12">
              <h1>Welcome to Portfolio Management System !</h1>
              <span class="body-2">Create your account at PMS and start trading right away. Sign in to your account if you are already a member. </span>
            </v-col>
            <v-col align="center" cols="12">
              <v-btn dark depressed outlined rounded to="/login"
                     x-large>
                <span>Sign In</span>
              </v-btn>

            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col class="my-10" cols="7">
        <div class="d-flex align-content-center align-center justify-center">
          <h1 class="primary--text"><strong>Create account at PMS<span class="secondary--text"></span></strong>
          </h1>
        </div>
        <v-form  ref="loginForm" class="mx-4 mt-4 px-16">
          <v-text-field  v-model="register.email" :error-messages="registerEmailErrors"
                        autocomplete="on"
                        filled
                        label="E-mail.*"
                        placeholder="Enter your email here..."
                        prepend-inner-icon="mdi-email"
                        rounded
                        v-on:keyup.enter="signup"
                        @blur="$v.register.email.$touch()"
                        @input="$v.register.email.$touch()"
          ></v-text-field>
          <v-text-field v-model="register.phoneNo" :error-messages="phoneNoErrors" autocomplete="on"

                        filled
                        label="Phone No.*"
                        placeholder="Enter your phone number here..."
                        prepend-inner-icon="mdi-phone"
                        rounded
                        v-on:keyup.enter="signup"
                        @blur="$v.register.phoneNo.$touch()"
                        @input="$v.register.phoneNo.$touch()"

          ></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="register.name" :error-messages="registerNameErrors"  autocomplete="on"
                            filled
                            label="Full Name*"
                            placeholder="Enter your full name here..."
                            prepend-inner-icon="mdi-account"
                            rounded
                            v-on:keyup.enter="signup"
                            @blur="$v.register.name.$touch()"
                            @input="$v.register.name.$touch()"


              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="register.password"
                            :append-icon="register.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :error-messages="registerPasswordErrors"
                            :type="register.showPassword ? 'text' : 'password'"
                            autocomplete="on"
                            filled
                            label="Password*"
                            placeholder="Enter your password here..."
                            prepend-inner-icon="mdi-key"
                            rounded
                            @click:append="register.showPassword = !register.showPassword"
                            v-on:keyup.enter="signup"
                            @blur="$v.register.password.$touch()"
                            @input="$v.register.password.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="register.password_confirmation"
                            :append-icon="register.showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :error-messages="registerConfirmPasswordErrors"
                            :type="register.showConfirmPassword ? 'text' : 'password'"
                            autocomplete="on"
                            filled
                            label="Confirm Password*"
                            placeholder="Enter your confirm password here..."
                            prepend-inner-icon="mdi-key"
                            rounded
                            @click:append="register.showConfirmPassword = !register.showConfirmPassword"
                            v-on:keyup.enter="signup"
                            @blur="$v.register.password_confirmation.$touch()"
                            @input="$v.register.password_confirmation.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <h1 class="caption my-2">By signing up, I agree to PMS's Terms of Use and Privacy Policy.</h1>
          <div class="d-flex justify-center align-center">
            <v-btn color="primary" depressed rounded x-large
                   @click="signup">
              <span>Sign Up</span>
            </v-btn>

          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {required, sameAs, email} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";

export default {
  mixins: [validationMixin],
  name: "register",

  data() {
    return {
      register: {
        phoneNo: "",
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
        showPassword: false,
        showConfirmPassword: false,
      },
    }
  },
  validations: {
    register: {
      phoneNo: {required},
      email: {required, email },
      password: {required},
      password_confirmation: {required, sameAsPassword: sameAs('password')},
      name: {required},
    },
  },
  computed: {
    registerEmailErrors() {
      const errors = [];
      if (!this.$v.register.email.$dirty) return errors;
      !this.$v.register.email.required && errors.push('Email is required.');
      !this.$v.register.email.email && errors.push('Incorrect format e.g something@mail.com');
      return errors;
    },
    registerNameErrors() {
      const errors = [];
      if (!this.$v.register.name.$dirty) return errors;
      !this.$v.register.email.required && errors.push('Name is required.');
      return errors;
    },
    phoneNoErrors() {
      const errors = [];
      if (!this.$v.register.phoneNo.$dirty) return errors;
      !this.$v.register.phoneNo.required && errors.push('Phone No. is required.');

      return errors;
    }, registerPasswordErrors() {
      const errors = [];
      if (!this.$v.register.password.$dirty) return errors;
      !this.$v.register.password.required && errors.push('Password is required.');
      return errors;
    },
    registerConfirmPasswordErrors() {
      const errors = [];
      if (!this.$v.register.password_confirmation.$dirty) return errors;
      !this.$v.register.password_confirmation.required && errors.push('Confirm Password is required.');
      !this.$v.register.password_confirmation.sameAsPassword && errors.push('Confirm Password is not same as password.');
      return errors;
    },
  },
  methods: {
    signup() {
      this.$v.register.phoneNo.$touch();
      this.$v.register.email.$touch();
      this.$v.register.password.$touch();
      this.$v.register.password_confirmation.$touch();
      this.$v.register.name.$touch();
      const temp = this;
      this.$store.dispatch('loginOrRegister', {
        route: "register",
        data: {
          phoneNo: temp.register.phoneNo,
          email: temp.register.email,
          password: temp.register.password,
          password_confirmation: temp.register.password_confirmation,
          name: temp.register.name,
        }
      }).then(function (response) {
        temp.$store.commit('SET_USER', response.data.data);
        temp.$router.push("/");
      }).catch(function (error) {
        console.log(error);
      });


    }
  }
}

</script>

<style lang="scss" scoped>
.background {
  background-color: #1347ae !important;
}
</style>
