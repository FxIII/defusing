<template>
  <div id="landing-page">
    <h1>{{ msg }}</h1>
    <httpControl :bus="bus"></httpControl><br>
    <usbControl :bus="bus"></usbControl><br>
    <div class="warning">{{ warningMsg }}</div>
    <transition :duration="{enter:125,leave:2000}" name="fade">
     <timer v-if="running" :speed="speed" :bus="bus" @undeflow="byebye"></timer>
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
    this.bus.$on("wrongCode",this.makeThingsWorse);
    this.bus.$on("deactivate",this.deactivate);
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
      warningLevel:0,
      running: true,
      bus: new Vue(),
    }
  },
  methods:{
    reset(){
      this.running=true;
      this.warningLevel=0;
    },
    makeThingsWorse(){
      if (this.warningLevel <0 ) return; // don't bother if already deactivated
      this.warningLevel +=1
    },
    deactivate(){
      this.warningLevel = -1
    },
    byebye(){
    },
  },
  computed:{
    speed(){
      if (this.warningLevel < 0) return 0;
      var speeds = [1,5,10];
      var capSpeed = 10;
      var speed = speeds[this.warningLevel]
      return (speed === undefined) ? capSpeed : speed
    },
    warningMsg(){
      if (this.warningLevel <= 0) return "";
      return `WARNING! Hack detected - Defensive Level ${this.warningLevel}: SpeedUP ${this.speed}X`;
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
.warning{
  min-height:1.2em;
  line-height:1.2;
  font-weight: bold;
  color:red;
}
</style>
