<template>
  <footer class="footer">
    <div class="content has-text-centered has-text-weight-bold">
      <p>
        &copy; Vue Monster Slayer
      </p>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
};
</script>
<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  font-size: 1.1rem;
  width: 100vw;
  padding: 1.2rem;
  border-top: 2px solid #ddd;
  background: #fff;
}
</style>
