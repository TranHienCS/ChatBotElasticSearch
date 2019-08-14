<template>
    
        <div class="input-group mb-3">
                <input  type="text" 
                        class="form-control" 
                        v-model="newMessenger" 
                        placeholder="New messenger" 
                        aria-label="Recipient's username" 
                        aria-describedby="basic-addon2"  
                        @keyup.enter="createNew">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"  @click="createNew">Send</button>
                </div>
        </div>
    
</template>

<script>
   import Sender from "../../helper/sender";
   export default {  
        data: function() {
            return{
                newMessenger: '',
                ans:''
            }
        },
        methods:{
            async createNew(){
                let objmessage={};
                objmessage.question=this.newMessenger;

                if(this.newMessenger=='') {
                    alert("Nhap tin!");
                    return false;
                }
                else{
                    this.$emit('addMessenger', {_newMessenger: this.newMessenger, _false: true});
                    this.newMessenger='';
                }
                this.ans = await Sender.sendMessage(objmessage);
                this.$emit('addBotMsg',{_newBotMsg:this.ans});
          }
     },   
}
</script>

<style>
   
</style>
