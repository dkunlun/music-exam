<template>
  <div id="app">
    <button @click="$router.go(-1)">prev</button>
    <button @click="$router.go(1)">next</button>
    <div>
      <input type="text" v-model="name">
      <button @click="enter">enter</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-project',
    data () {
      return {
        name: ''
      }
    },
    methods: {
      enter() {
        this.$router.push({name: this.name})
      }
    }
  }
</script>

<style>
  /* CSS */
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  html,body, #app {
    width: 100vw;
    height: 100vh;
  }
</style>
