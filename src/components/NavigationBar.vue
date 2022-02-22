<template>
  <v-app-bar app flat color="blue" elevation="0">
    <v-btn text to="/" depressed dark><h2>Portfolio Management System</h2></v-btn>
    <v-spacer></v-spacer>
    <v-btn  to="/"  text  depressed>Home</v-btn>
    <v-btn  to="/about"  text depressed>About</v-btn>
    <v-btn to="/transaction" dark depressed color="orange">Buy/Sell Stock</v-btn>
    <v-btn  @click="logout"  text depressed>Logout</v-btn>

  </v-app-bar>
</template>

<script>
import { mapState} from "vuex";

export default {
  name: "NavigationBar",
  data() {
    return {}
  },
  computed: {
    ...mapState(['showNavigationDrawer'])
  },
  methods:{
    logout(){
      let temp=this;
      this.$store.dispatch('logout').then(function(response){
        if(response.status === 200){
          temp.$router.push('/login');
        }
      }).catch(function(error){
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>

</style>