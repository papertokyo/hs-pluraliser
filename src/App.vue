<template>
  <div id="app"><PluralChecker /><!-- <EdibleParts /> --></div>
</template>

<script>
import EdibleParts from './components/EdibleParts'
import PluralChecker from './components/PluralChecker'

export default {
  name: 'App',
  components: {
    EdibleParts,
    PluralChecker
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: left;
}
#header {
}
</style>
