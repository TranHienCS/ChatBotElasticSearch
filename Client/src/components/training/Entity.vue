<template>
 
  <div class="input-group pb-4">
    <button type="button" class="btn btn-light" @click="reEntity()">
      <i class="fa fa-window-close"></i>
    </button>
    <div class="input-group-prepend form-control" >
     {{entity}}
    </div>
    <div class="input-group-prepend form-control ">
     {{ValEntity}}
    </div>
    
  </div>
</template>

<script>
export default {
  props: ["entity", "ValEntity" ],
  data() {
    return {
      
    };
  },
  methods:{
      reEntity(){
          this.$emit('reEntity',this.entity);
      }
  }
};
</script>

