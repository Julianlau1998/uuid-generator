<template>
  <div id="app">
    <topNav />
    <router-view/>
  </div>
</template>

<script>
import topNav from './components/TopNav.vue'
export default {
components: {
  topNav
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
