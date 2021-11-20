<template>
  <div id="app">
    <!-- <topNav /> -->
    <router-view/>
    <div id="adsgoeshere" style="background: #000000; padding-top:60px; text-align: center;" v-html="adsenseContent"></div>
  </div>
</template>

<script>
// import topNav from './components/TopNav.vue'
export default {
  components: {
    // topNav
  },
  data () {
    return {
       adsenseContent: ''
    }
  },
  mounted () {
    this.adsenseContent = document.getElementById('divadsensedisplaynone').innerHTML
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #94a8bd;
}
body {
  background-color: rgb(0, 0, 0);
  margin: -0.5rem 0 0 1rem;
}
</style>
