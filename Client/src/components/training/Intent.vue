<template>
    <div class="input-group w-100">
         <div class="input-group-prepend w-25">
            <p class="input-group-text w-100 ">Intent</p>
        </div>

        <select id="s_intent" class="form-control " v-model="intent" @click="getIntent">
            <option id ="intent" value ="" selected disabled hidden> {{trainingIntent}}</option>
            <option v-for="item in listIntent" v-bind:key="item" :value="item">{{item}}</option>
        </select>
    </div>
</template>

<script>
export default {
    props:{
        listIntent: Array,
        trainingIntent: String,
    },
    data: function(){
        return{
            intent:'',
           
        }
    },
    // mounted(){
    //     console.log(this.trainingIntent)
    //     var element = document.getElementById("s_intent");
    //     if(this.trainingIntent!==""){
    //         element.value = "this.trainingIntent";
    //         console.log(1);
    //     }
    //     else{
    //         console.log(2);
    //     }
    // },
    methods:{
        checkQuestion(){
            if((this.trainingIntent!=='')&&(typeof this.trainingIntent!=='undefined')){
                console.log(1);
                check= true;
               // return true;
            }   
            else {
                console.log(2);
                //return false;
            }
        },

        getIntent(){
            this.$emit('get_intent', this.intent);
        },
        // SelectElement(){    
        //     console.log(this.trainingIntent)
        //     var element = document.getElementById("s_intent");
        //     if(this.trainingIntent!==""){
        //         element.value = this.trainingIntent;
        //         console.log(1);
                
        //     }
        //     else{
        //         console.log(2);
        //     }
        // }

        
    }
}
</script>
<style>

</style>


