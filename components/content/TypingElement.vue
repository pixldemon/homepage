<template>
  <p class="typing-element">
    Most of all, I love
    <span>{{ currentText }}</span>
  </p>
</template>

<script>
export default {
  name: "TypingElement",
  created() {
    this.phraseIndex = Math.floor((this.phrases.length - 1) * Math.random());
    this.write();
  },
  methods: {
    write() {
      if (this.charIndex == 0 && this.currentText !== "") {
        this.currentText = this.currentText.slice(
          0,
          this.currentText.length - 1
        );
        setTimeout(
          this.write.bind(this),
          this.minDelay + Math.random() * (this.maxDelay - this.minDelay)
        );
      } else if (this.charIndex < this.phrases[this.phraseIndex].length) {
        this.currentText += this.phrases[this.phraseIndex].charAt(
          this.charIndex
        );
        this.charIndex++;
        setTimeout(
          this.write.bind(this),
          this.minDelay + Math.random() * (this.maxDelay - this.minDelay)
        );
      } else {
        this.charIndex = 0;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        setTimeout(this.write.bind(this), 2000);
      }
    },
  },
  data() {
    return {
      minDelay: 30,
      maxDelay: 50,
      phraseIndex: 0,
      charIndex: 0,
      currentText: "",
      phrases: [
        "Linux",
        "making games",
        "web dev",
        "tinkering with hardware",
        "Rust",
        "TypeScript",
        "custom keyboards",
        "learning new tech"
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/style/vars.scss";

.typing-element {
  font-family: 'Red Hat Mono', monospace;
  font-weight: 400;
  font-size: 16px;
  line-height: 1 !important;
  display: flex;
  align-items: flex-end;
  flex-wrap: nowrap;
  white-space: nowrap;

  span {
    margin-left: 0.7ch;
    white-space: nowrap;
    color: $acc1-color;
  }

  &::after {
    display: inline-block;
    content: "";
    width: 10px;
    height: 1.2rem;
    margin: 0 0.2rem;
    background-color: $text-color;
  }
}
</style>
