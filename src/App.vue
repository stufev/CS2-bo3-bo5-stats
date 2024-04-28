<template>
  <Header/>
  <RouterView/>
  <Footer/>
</template>

<script setup>
import {RouterLink, RouterView} from 'vue-router'
import Header from "./components/Header/index.vue"
import Footer from "./components/Footer/index.vue"
</script>


<style scoped>

</style>
