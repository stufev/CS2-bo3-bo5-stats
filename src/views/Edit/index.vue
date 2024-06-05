<template>
  <div class="edit">
    <h1>edit {{ id }}</h1>
  </div>
</template>

<script setup>
defineProps({
  id: Number
});
</script>

<style lang="scss" scoped>
.edit {
  background-color: #161616;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>