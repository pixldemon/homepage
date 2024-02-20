<template>
  <!-- Not having a manually created default layout with a single root node generates a warning -->
  <div id="wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: "https://mclrc.me" + route.path,
    },
  ],
}))
</script>
