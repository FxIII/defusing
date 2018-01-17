<template>
  <div class="timer" @click="manage">
    <div class="block">
        <p class="digit">{{ hours | two_digits }}</p>
        <p class="text">Hours</p>
    </div>
    <div class="block">
        <p class="digit">{{ minutes | two_digits }}</p>
        <p class="text">Minutes</p>
    </div>
    <div class="block">
        <p class="digit">{{ seconds | two_digits }}</p>
        <p class="text">Seconds</p>
    </div>
    <div class="block">
        <p class="digit">{{ cents | two_digits }}</p>
        <p class="text">Cents</p>
    </div>
    </div>
</template>

<script>
export default {
    mounted() {
        window.timer = this;
        this.bus.$on("start",this.start)
        this.bus.$on("reset",this.reset)
    } ,
    props : ["length","speed","bus"],

    data() {
        return {
            left: this.length,
            lastTime: null,
            runner: null,
            downcap: 0,
        }
    },
    methods:{
      manage(e){
        if (e.shiftKey){
          this.bus.$emit("reset")
        }else{
          this.bus.$emit("start")
        }
      },
      reset(){
        this.stop();
        this.left = this.length;
      },
      start(){
        if (this.runner !== null) return;
        this.lastTime = (new Date()).getTime() / 1000;
        this.runner = setInterval(()=>{
          var lastTime = this.lastTime;
          var currentTime =  (new Date()).getTime() / 1000;
          var dt = currentTime - lastTime;
          this.consume(dt*this.speed);
          this.lastTime = currentTime;
        },45);
      },
      consume(delta){
        this.left -= delta;
        if (this.left < this.downcap){
          this.left = this.downcap
          this.$emit("underflow")
        }
      },
      stop(){
        clearInterval(this.runner);
        this.runner= null;
      }
    },

    computed: {
    cents() {
        return Math.trunc((this.left)*100) % 100;
    },
    seconds() {
        return Math.trunc(this.left) % 60;
    },

    minutes() {
        return Math.trunc((this.left) / 60) % 60;
    },

    hours() {
        return Math.trunc((this.left) / 60 / 60) % 24;
    },

    days() {
        return Math.trunc((this.left) / 60 / 60 / 24);
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:400);
.timer{
    display: flex;
    justify-content: center;
}
.block {
    display: flex;
    flex-direction: column;
    margin: 20px;
}

.text {
    color: #1abc9c;
    font-size: 40px;
    font-family: 'Roboto Condensed', serif;
    font-weight: 40;
    margin-top:10px;
    margin-bottom: 10px;
    text-align: center;
}

.digit {
    color: #36495d; /* #ecf0f1;*/
    font-size: 150px;
    font-weight: 400;
    font-family: 'Roboto', serif;
    margin: 10px;
    text-align: center;
}
</style>
