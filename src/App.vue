<template>
  <div id="app">
    <TopBar :msg="top_bar_msg"></TopBar>
    <Content></Content>
  </div>
</template>

<script>
import TopBar from './components/TopBar'
import Content from './components/Content'

export default {
  name: 'App',
  components: {
    TopBar,
    Content
  },
  data() {
      return {
          top_bar_msg: "welcome"
      }
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
