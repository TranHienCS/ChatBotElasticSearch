<template>
<div class="bg-info">
    <div class="card ">
        <div class="card-header p-3 mb-2 bg-primary text-white" >
            CHAT BOT
        </div>
        <div class="card-body scroll_bar" id="scroll_bar" >        
            <app-send :ArrayMessenger='arrayMessenger' @scrollBar="scrollBar" ></app-send>                         
        </div>
        <div class="card-footer text-muted">
            <app-new-messenger @addMessenger="addUser" @addBotMsg ="addBot" > </app-new-messenger>
         </div>
    </div>
    
    </div>
</template>

<script>

import Sender from '../../helper/sender';
import Send from "./Send";
import NewMessenger from "./NewMessenger";


export default {
    
    data: function() {
        return{
            arrayMessenger: [{
                mess:'HI',
                flag: false,
            }],
            arrayChatBot:[],
            // audio = new Audio(),
        }
    },
    components:{
      appSend: Send,
      appNewMessenger: NewMessenger,
    },
    // mounted: function() {
            
    // },
    methods:{
      addUser(_messenger){   
        this.arrayMessenger.push({mess:_messenger._newMessenger, flag:_messenger._false});
      },  
      
      scrollBar(){
        var chatWindow = document.getElementById("scroll_bar");
        chatWindow.scrollTop = chatWindow.scrollHeight;
      },
      addBot(msg){
          this.arrayMessenger.push({mess:msg._newBotMsg, flag:false});
          var audio = new Audio(require('../../assets/msgAudio.mp3'))
          audio.play();
      },
    }
    
}
</script>


<style scoped>
.card{
    position: absolute;
    top: 60px;
    left: 30%;
    right: 30%;  
    height: 90%
}
.scroll_bar{
    overflow:auto;
}

</style>
