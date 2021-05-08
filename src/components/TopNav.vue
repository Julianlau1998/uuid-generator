<template>
  <div class="topNav">
    <h1>UUID Generator</h1>
    <h2>Generate a random UUID</h2>
  </div>
</template>

<script>
export default {
  name: 'TopNav'
}
</script>

<style scoped>
h1 {
  font-size: 3.5rem;
}
h2 {
  font-size: 2rem;
  margin-top: -1.5rem;
}
@media (max-width: 700px) {
  h1 {
    margin-top: 2.5rem;
    font-size: 2.7rem;
  }
  h2 {
    font-size: 1.1rem;
  }
}

</style>
