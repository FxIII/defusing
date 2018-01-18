<template>
  <span :class="status">{{msg}}</span>
</template>

<script>
const usb = require('usb');


export default {
    mounted() {
    	window.usbControl = this;
    	usb.on("attach",this.attached);
    	setTimeout(()=>{
              this.status = "ok";
              this.msg = "Ultimate Selfdestruct Bombing® active";
            },2500)
    	
    } ,
    props : ["bus"],
    data() {
        return {
          status: "setup",
          msg: "Ultimate Selfdestruct Bombing® loading..."
        }
    },
    methods:{
      attached(device){
        var id = this.getID(device);
        this.$store.config.usb.seenDevices[id]=true
      	if (this.$store.config.usb.correctUSB){
      		if (this.$store.config.usb.correctUSB == id){
      			this.$emit("deactivate");
      		}else{
      			this.$emit("wrongCode");
      		}
      	}
      },
      getID(device){
	    var 
		vid = device.deviceDescriptor.idVendor,
		pid = device.deviceDescriptor.idProduct;
    	return [vid,pid].map((i)=>("0000"+i.toString(16).toUpperCase()).slice(-4)).join(":");
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
