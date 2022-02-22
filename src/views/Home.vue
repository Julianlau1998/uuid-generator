<template>
  <div class="home">
    <generator />
  </div>
</template>

<script>
import generator from '../components/Generator.vue'
export default {
  name: 'Home',
  metaInfo: {
      title: 'UUID Generator',
      titleTemplate: '%s | Generater random UUIDs. Generate up to 5000 UUIDs at once and download the list of UUIDs as a PDF.',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    },
  components: {
    generator
  }
}
</script>
