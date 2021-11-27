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
  overflow-x: hidden;
  background-color: transparent;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}

/* Hide scrollbar for Chrome, Safari and Opera */
#app::-webkit-scrollbar {
  display: none;
  height: 0;
  width: 0;
  opacity: 0;
  background-color: transparent;
  width: 0 !important;
}

/* Hide scrollbar for IE, Edge and Firefox */
#app {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  -webkit-overflow-scrolling: touch;
  background-color: transparent;
}
</style>
