<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {removeToken} from "@/utils/auth";
import store from "@/store";

export default {
  name: 'App',

  beforeDestroy() {
    // removeToken()

    this.$store.dispatch('user/logout')
    store.dispatch('user/resetToken')
  }
}
</script>
