<template>
    <div> 
        <div v-for="i in ArrayMessenger" :key="i.id" >        
            <app-item-messenger @itemscrollBar="_scrollBar" v-if="i.flag"  >
                <p  slot="user">{{i.mess}}  </p>
            </app-item-messenger>
            
            <app-chat-bot @itemscrollBar="_scrollBar" v-else>
                <p slot="bot">{{i.mess}}</p>
            </app-chat-bot>
        </div>       
    </div>   
</template>

<script>
    import ItemMessenger from "./ItemMessenger";
    import ItemChatBot from "./ItemChatBot";
    export default{
        props: {ArrayMessenger: Array,
                scrollBar: Function,
                },
       
        components:{
            appItemMessenger: ItemMessenger,
            appChatBot: ItemChatBot,
        },
        methods:{
            _scrollBar(){
                this.$emit('scrollBar');
            }
        }      
    }

</script>

<style>
   
</style>
