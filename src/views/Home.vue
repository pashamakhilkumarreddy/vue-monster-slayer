<template>
  <div class="columns">
    <h1 class="has-text-centered">{{mainTitle}}</h1>
  </div>
</template>
<script>
export default {
  name: 'Home',
  metaInfo: {
    title: 'Home',
  },
  data() {
    return {
      titleTxt: 'Welcome to Monster Slayer',
      mainTitle: '',
      intervalId: null,
    };
  },
  mounted() {
    this.updateMainTitle();
  },
  methods: {
    updateMainTitle() {
      let i = 0;
      const updateTitle = () => {
        if (i < this.titleTxt.length) {
          this.mainTitle += this.titleTxt[i];
          i += 1;
        }
      };
      this.intervalId = setInterval(updateTitle, 150);
    },
  },
  destroyed() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-family: 'NotoSansBoldItalic';
  font-size: 3.5rem;
}
</style>
