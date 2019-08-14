<template>
<div>
  <div class="incoming_msg">
    <div class="incoming_msg_img"> <img src="../../assets/bot.png" alt="sunil"> </div>
      <div class="received_msg">
          <div class="received_withd_msg">
              <slot name='bot'></slot>
          </div>
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
    img{ max-width:100%;}
    .chat_img {
    float: left;
    width: 11%;
    }
    .active_chat{ background:#ebebeb;}
    .incoming_msg_img {
    display: inline-block;
    width: 6%;
    }
    .received_msg {
    display: inline-block;
    padding: 0 10 0 10px;
    vertical-align: top;
    width: 92%;
    }
    .received_withd_msg p {
    background: #ebebeb none repeat scroll 0 0;
    border-radius: 3px;
    color: #646464;
    font-size: 14px;
    padding: 0px 10px 0px 10px;
    width: 90%;
    }
    .received_withd_msg { width: 45%;}
</style>
