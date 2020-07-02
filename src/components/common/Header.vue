<template>
  <header class="header">
    <nav class="pure-menu pure-menu-horizontal" role="navigation" aria-label="main navigation">
      <a href="#" class="pure-menu-heading pure-menu-link">
        <img src="../../assets/images/icons/logo.png" alt="Logo" decoding="async" loading="lazy"
          importance="high" />
      </a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link to="/" class="pure-menu-link">Home</router-link>
        </li>
        <li class="pure-menu-item">
          <router-link to="/game" class="pure-menu-link">Game</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'Header',
};
</script>
<style lang="scss" scoped>
  .header {
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.2);
  }

  .pure-menu-heading.pure-menu-link {
    padding-top: 0;
    padding-bottom: 0;
  }

  .pure-menu-link {
    font-size: 1.2rem;
  }

  .pure-menu-link:hover {
    background-color: #1768ac5c;
  }
</style>
