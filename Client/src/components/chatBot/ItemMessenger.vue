<template>
<div> 
   <div class="outgoing_msg ">
        <div class="sent_msg ">
        <slot name="user"></slot>
        </div>
  </div>
</div>
</template>

<script>
    export default{
        props: {itemscrollBar: Function},       
        mounted(){
            this.$emit('itemscrollBar');
        }, 
    
    }
</script>

<style>
  .sent_msg  {
    background: #05728f none repeat scroll 0 0;
    border-radius: 3px; 
    font-size: 14px;
    color:#fff;
    padding: 0px 10px 0px 10px;
    width:92%;
  }
  .outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
  .sent_msg {
    float: right;
    width: 45%;
  }

</style>
