<template>
  <footer>
    <ul>
      <li>©{{ new Date().getFullYear() }} Moritz Clerc</li>
    </ul>
  </footer>
</template>

<style scoped lang="scss">
@import "@/assets/style/vars.scss";

footer {
  font-family: Inconsolata, sans-serif;
  color: $text-color-2;
  max-width: $max-content-width;
  padding: 0 $content-padding;
  display: block;
  margin: 0 auto;
  margin-bottom: 3rem;
}
ul {
  display: block;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}
</style>
