<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
var fs = require("fs");
var gui = require('nw.gui');

function getConfig(){
  var path = gui.App.dataPath + "/config.json";
  console.log(path)
  try {
  var contents = fs.readFileSync(path);
  var jsonContent = JSON.parse(contents);
  return jsonContent;
  }catch (err) {
    return {
      httpControl:{
        port: 3000,
        correctCode: 155387 
      },
      timer:{
        length:900
      }
    }
  } 
}

function storeConfig(config){
  var path = gui.App.dataPath + "/config.json";
  fs.writeFileSync(path,JSON.stringify( config , null, 4 ));
}

export default {
  name: 'defusing',
  created(){
    this.$store.config = getConfig();
    gui.Window.get().on('close',()=>{
      storeConfig(this.$store.config);
      gui.Window.get().close(true);})
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
