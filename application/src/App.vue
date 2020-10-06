<template>
  <div id="app">
    <Game/>
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Game
  }
}
</script>

<style lang="scss">
  #app {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#0382FF, #80DFFF);
  }

  @font-face {
    font-family: 'Super Mario 256';
    src: url('./assets/fonts/supermario256.ttf') format('truetype'),
      url('./assets/fonts/supermario256.woff2') format('woff2'),
      url('./assets/fonts/supermario256.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }
</style>
