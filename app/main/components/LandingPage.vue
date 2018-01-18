<template>
  <div id="landing-page">
    <h1>{{ msg }}</h1>
    <httpControl :bus="bus"></httpControl><br>
    <usbControl :bus="bus"></usbControl><br>
    <transition :duration="{enter:125,leave:2000}"  name="fade">
     <timer v-if="running" :speed="speed" :bus="bus" ></timer>
    </transition>

  </div>
</template>

<script>
import Vue from 'vue'
import timer from './timer';
import httpControl from './httpControl';
import usbControl from './usbControl';
export default {
  mounted(){
    window.home=this;
    this.bus.$on("reset",this.reset);
  },
  name: 'landing-page',
  components: {
    timer,
    httpControl,
    usbControl,
  },
  data () {
    return {
      msg: 'Welcome to Your Smart Deflagration™ Control Panel',
      speed: 1,
      running: true,
      bus: new Vue(),
    }
  },
  methods:{
    reset(){
      this.running=true;
      this.speed=1;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
