<template>
  <div class="container">
    <div>
      <h1 class="title">games minisite based on domain</h1>
    </div>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'

export default {
  async asyncData({ $sanity }) {
  },
}
</script>

<style>
.container {
  margin: 2rem;
  min-height: 100vh;
}
.title {
  margin: 2rem 0;
}
</style>