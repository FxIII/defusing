<template></template>

<script>
const Tone = require('Tone');
export default {
    mounted() {
    	window.beeper = this;
    	this.synth = new Tone.Synth().toMaster();
    	this.synth.envelope.attack = 0;
    	this.synth.envelope.decay = 0;
    	this.synth.envelope.sustain = 1;
    	this.synth.envelope.release = 0.01;
    	this.bus.$on("second",this.tick);
    	this.bus.$on("reset",this.stopBeep);
    } ,
    props : ["bus","speed"],
    data() {
        return {
        }
    },
    methods:{
    	tick(time){
    		var second = Math.floor(time);
    		if (second % this.speed === 0) this.beep();
    		if (second === 0) this.longBeep();
    	},
    	beep(){
    		this.synth.triggerAttackRelease("B5", 0.1);
    	},
    	longBeep(){
    		this.synth.triggerAttack("B5");
    	},
    	stopBeep(){
    		this.synth.triggerRelease();
    	}
    },
    computed: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ok {
  color:#1abc9c;
}
.setup{
  color: #dbcb15;
}
</style>
