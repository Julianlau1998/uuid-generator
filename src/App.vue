<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
       adsenseContent: '',
       iOS: false
    }
  },
  created () {
    this.iOS = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    this.$store.state.iOS = this.iOS
  }
}
</script>

<style>
html {
  background-color: #2a343c;
}
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
