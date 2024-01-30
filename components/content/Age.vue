<template>
  <span>{{ age }}</span>
</template>

<script setup lang="ts">
const birthday = new Date("2004-01-15");
const age = Math.floor((new Date().getTime() - birthday.getTime()) / 31536000000);
</script>
