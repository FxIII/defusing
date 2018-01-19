<template>
  <span :class="status">{{msg}}</span>
</template>

<script>
const http = require('http');
 
export default {
    mounted() {
        window.httpControl = this;
        const requestHandler = (request, response) => {
          console.log(request.url)
          if (request.url == "/favicon.ico"){
            response.statusCode = (404);
            response.end();
            return;
          }
          if (request.url == "/"){
            response.statusCode = (404);
            response.end();
            return;
          }
          if (request.url == "/reset"){
            this.bus.$emit("reset");
            this.send(response, "Thank you for using our services!");
            return;
          }
          if (request.url == "/start"){
            this.bus.$emit("start");
            this.send(response, 'Thank you for using our services!')
            return;
          }
          if (request.url == "/"+this.$store.config.httpControl.correctCode) {
            this.$emit("deactivate");
            this.send(response, 'Thank you for using our services!')
          }else{
            this.$emit("wrongCode");
            response.setHeader('Content-Type', 'text/html');
            this.send(response, 'Hacking detected. This incident will be reported.')
          }
        }
        const server = http.createServer(requestHandler)
        server.listen(this.$store.config.httpControl.port, (err) => {
          if (err) {
            this.status = "error"
            this.msg = err
            return console.log('something bad happened', err)
          }else{
            setTimeout(()=>{
              this.status = "ok";
              this.msg = "systems online";
            },2000)

          }
        })
    } ,
    props : ["bus"],
    data() {
        return {
          status: "setup",
          msg: "loading defensive systems..."
        }
    },
    methods:{
      send(response, msg){
        response.setHeader('Content-Type', 'text/html');
        response.end('<meta name="viewport" content="width=device-width, initial-scale=1.0">'+msg);
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
