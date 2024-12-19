<template>
  <div id="navbar" @scroll="onScroll" :class="{ scrolled: scrolled, collapsed: collapsed }">
    <nav>
      <div id="top">
        <div id="branding">
          <img id="logo" src="/img/logo.png" />
          <header id="branding-mobile">
            <h1>mclrc.me</h1>
          </header>
          <header id="branding-desktop">
            <div id="left">
              <h1>Hi, I'm Moritz!</h1>
              <h2>Welcome to my ~.</h2>
            </div>
          </header>
        </div>
        <div id="hamburger-menu">
          <div>
            <span id="route-name">{{
              page.title.startsWith("/home") ? "~" : page.title
            }}</span>
            <button aria-label="hamburger menu" id="hamburger" @click="collapsed = !collapsed"></button>
          </div>
        </div>
      </div>
      <ul id="links">
        <ContentNavigation v-slot="{ navigation }">
          <li class="nav-entry" v-for="link of navigation" :key="link._path">
            <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
          </li>
        </ContentNavigation>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const scrolled = ref(false);
const collapsed = ref(true);
const scrollThreshold = 5;

const { page } = useContent();

const route = useRoute();

watch(
  () => route.fullPath,
  (_newRoute) => {
    collapsed.value = true;

    if (document.firstElementChild !== null)
      document.firstElementChild.scrollTop = 0;
  }
);

function onScroll() {
  if (document.firstElementChild !== null)
    scrolled.value = document.firstElementChild.scrollTop > scrollThreshold;
}
</script>

<style scoped lang="scss">
@import "@/assets/style/vars.scss";

$expand-collapse-anim-time: 0.2s;

#navbar {
  position: fixed;
  user-select: none;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  font-family: "Inconsolata";
  background-color: $bg-color;

  &.scrolled,
  &:not(.collapsed) {
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
  }

  nav {
    padding: 0 1rem;
    width: 100%;
    max-width: $max-content-width;
    margin: 0 auto;
  }
}

#top {
  height: $navbar-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

#branding {
  display: flex;
  align-items: center;
}

#hamburger-menu {
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #route-name {
    font-size: 1.1rem;
    font-weight: bold;
  }
}

#hamburger {
  background: none;
  border: none;
  outline: none;
  position: relative;
  height: 1.1rem;
  width: 2rem;
  padding: 1rem;
  box-sizing: content-box;
  margin: 0;
  margin-right: -$content-padding;

  cursor: pointer;

  &::before,
  &::after {
    display: block;
    position: absolute;
    content: "";
    height: 4px;
    width: 2rem;
    background-color: $text-color;
    transition: 0.3s;
    transform-origin: 51% 51%;
  }

  &::before {
    top: 1rem;
  }

  &::after {
    bottom: 1rem;
  }
}

#navbar:not(.collapsed) #hamburger {
  &::before {
    top: calc(50% - 2px);
    transform: rotate(225deg);
  }

  &::after {
    bottom: calc(50% - 2px);
    transform: rotate(-225deg);
  }
}

#logo {
  display: block;
  max-width: 2rem;
  margin-right: $content-padding;
}

#branding-mobile {
  h1 {
    font-size: 1.2rem;
  }
}

#branding-desktop {
  display: none;
  font-family: Inconsolata;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 2.5rem;
    margin: 0.3rem 0;
  }

  h2 {
    font-size: 1.5rem;
    margin: 0.3rem 0;
  }

  div {
    display: inline-block;
  }

  img {
    display: block;
    max-width: 20%;
    padding: 1rem;
  }
}

#navbar.collapsed #links {
  height: 0;

  a {
    opacity: 0;
  }
}

#links {
  transition: height $expand-collapse-anim-time;
  height: 30vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
  list-style: none;
  margin: 0;
  padding: 0 (4rem - $content-padding);// Hamburger icon width + padding - the negative padding on the right

  a {
    transition: $expand-collapse-anim-time;
    margin: 0.3rem 0;
    display: block;
    color: $text-color-2;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    font-size: 1.2rem;

    &::before,
    &::after {
      display: inline;
      position: absolute;
    }

    &.router-link-exact-active {
      color: $acc1-color;
    }

    &:not(.router-link-exact-active):hover {
      color: $text-color;

      &::before {
        left: -3ch;
        content: "cd ";
        color: $text-color-2;
      }
    }

    &.router-link-exact-active::before {
      content: "[";
      left: -1ch;
    }

    &.router-link-exact-active::after {
      content: "]$";
      right: -2ch;
    }
  }
}

@media only screen and (min-width: $breakpoint) {
  #navbar {
    position: relative;
  }

  #top {
    width: auto;
    height: auto;
  }

  #branding-mobile {
    display: none;
  }

  #branding-desktop {
    display: block;
  }

  #branding {
    margin-top: 8rem;
    margin-bottom: 1rem;
  }

  #logo {
    max-width: 5rem;
  }

  #hamburger-menu {
    display: none;
  }

  #navbar.collapsed #links,
  #navbar:not(.collapsed) #links {
    padding: $content-padding 0;
    height: auto;
    flex-direction: row;
    justify-content: flex-start;
    overflow: visible;
    font-size: 1.1rem;

    a {
      opacity: 1;
    }

    li:not(:last-child) {
      margin-right: 10ch;
    }
  }
}
</style>
