<template>
  <div class="input-group mt-3 pb-4">
    <div class="input-group-prepend w-25">
      <select id="type" class="form-control w-100" v-model="entity">
        <option value="" selected disabled hidden></option>
        <option v-for="items in listEntitiess" v-bind:key="items" :value="items">{{items}}</option>
      </select>
    </div>

    <input
      :disabled="entity==''"
      type="text"
      v-model="valEntity"
      class="form-control"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
export default {
    props:{
      listEntitiess: Array
    },
    data(){
        return{
            entity:'',
            valEntity:'',
            
        }
    },
    methods:{
        add(){
            this.$emit('inputEntity',{en: this.entity,valEn: this.valEntity});
            this.entity='';
            this.valEntity='';
        }
    }
    
}
</script>

