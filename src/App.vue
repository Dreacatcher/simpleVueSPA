<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import { dev, test, stage, prod } from './tools/global'
export default {
  name: 'App',
  beforeCreate() {
    console.log(process.env.NODE_ENV)
    let ENV = process.env.NODE_ENV
    if (ENV === 'development') { // 本地环境
      window.globalConfig = dev
    } else if (ENV === 'test') { // 测试环境
      window.globalConfig = test
    } else if (ENV === 'stage') { // 预生产环境
      window.globalConfig = stage
    } else if (ENV === 'production') { // 生产环境
      window.globalConfig = prod
    } else {
      window.globalConfig = dev
    }
  }
}
</script>

<style scoped lang='less'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
