export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
        { defer: true, src: "https://api.pirsch.io/pa.js", id: "pianjs", "data-code": "F1VD94BqyIbT44Bz0Hnbu5koeVCuDt12" },
      ],
      meta: [
        {
          name: "description",
          content:
            "Hi! I'm Moritz, and this is my home page. Have a look around!",
        },
      ],
    },
  },
  modules: ["@nuxt/content"],
  content: {
    // `anchorLinks` (https://content.nuxtjs.org/api/configuration#anchorlinks) doesn't actually work
    anchorlinks: false, // Neither here,
    documentDriven: true,
    markdown: {
      // @ts-expect-error this prop is not typed
      anchorlinks: false, // nor here. Pretty sure this isn't my fault.
    },
  },
});
