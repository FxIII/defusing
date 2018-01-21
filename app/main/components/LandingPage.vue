<template>
  <div id="landing-page">
    <div id="main"  :class="{fadeOutUp:!running}">
     <img src="../assets/logo.png">
     <h1>{{ msg }}</h1>
     <beeper :speed="beep" :bus="bus" ></beeper>
     <httpControl :bus="bus"></httpControl><br>
     <usbControl :bus="bus"></usbControl><br>
     <div class="warning">{{ warningMsg }}</div>
     <timer :speed="speed" :bus="bus" @underflow="byebye"></timer>
    </div>
    <div class="overlay" :class="{off:running}" @click="bus.$emit('reset')" >
        {{ boomMsg }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import timer from './timer';
import httpControl from './httpControl';
import usbControl from './usbControl';
import beeper from './beeper';
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
    beeper,
  },
  data () {
    return {
      msg: 'Welcome to Your Smart Deflagration™ Control Panel',
      boomMsg: 'Bridge destoryed',
      warningLevel:0,
      running: true,
      speeds: [1,5,10],
      beeps: [2,5,5],
      bus: new Vue(),
    }
  },
  methods:{
    reset(){
      this.running=true;
      this.warningLevel=0;
    },
    makeThingsWorse(){
      if (this.warningLevel < 0 ) return; // don't bother if already deactivated
      this.warningLevel +=1
    },
    deactivate(){
      this.warningLevel = -1
    },
    byebye(){
      setTimeout(()=>this.running=false,1000);
      this.running= false;
    },
  },
  computed:{
    speed(){
      if (this.warningLevel < 0) return 0;
      var capSpeed = 10;
      var speed = this.speeds[this.warningLevel]
      return (speed === undefined) ? capSpeed : speed
    },
    beep(){
      return this.beeps[this.speeds.indexOf(this.speed)];
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
@import url("../assets/vue2-animate.min.css");
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
.warning{
  min-height:1.2em;
  line-height:1.2;
  font-weight: bold;
  color:red;
}
.overlay{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.9);
    color: red;
    font-size: 12em;
    font-family: Roboto;
    transition: 600ms;
    margin-top:0%;
    opacity:1;
}
.overlay.off{
  margin-top:100%;
  opacity: 0;
}
</style>
