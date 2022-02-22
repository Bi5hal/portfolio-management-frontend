<template>
  <v-app>
    <navigation-bar/>
    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </v-app>
</template>

<script>

import NavigationBar from "./components/NavigationBar";
import ConfirmDialog from "./components/ComfirmDialog";

export default {
  name: "New",
  components: {ConfirmDialog, NavigationBar},
  mounted() {
    this.$root.confirm = this.$refs.confirm.open;
  }
}
</script>

<style scoped>

</style>