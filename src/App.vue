<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions} from "vuex";
export default {
  name: 'App',
  methods:{
    ...mapActions(['GetCategory'])
  },
  created(){
    this.GetCategory()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100%;
}
</style>
