<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <header class="header">
      <nav class="nav">
        <RouterLink
          to="/"
          class="btn"
        >
          Circular Progress Bar
        </RouterLink>
        <RouterLink
          to="/chart"
          class="btn"
        >
          Chart
        </RouterLink>
      </nav>
    </header>
  
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
}

.header {
  padding-inline: 1rem;
}

.nav {
  margin-left: auto;
  padding-block: 1rem;
  width: fit-content;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.main {
  display: grid;
  place-content: center;
}
</style>
