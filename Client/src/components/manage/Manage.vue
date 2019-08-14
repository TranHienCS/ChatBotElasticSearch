<template>
<div>
  <div class="card"> 
      <div class="card-header "> 
          <div class="nav  nav-pills " id="v-pills-tab" 
            role="tablist" aria-orientation="vertical">
              <a class="nav-link active w-25" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" 
              role="tab" aria-controls="v-pills-home" aria-selected="true">Intent</a>
              <a class="nav-link w-25" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" 
              role="tab" aria-controls="v-pills-profile" aria-selected="false">Entity</a>
        </div>
      </div> 
    
      <div class="card-body " >
        
        <div class="tab-content col " id="v-pills-tabContent">
          <div  class="tab-pane fade show active " id="v-pills-home" 
                role="tabpanel" aria-labelledby="v-pills-home-tab" >
            <button type="button" class="btn btn-outline-secondary selectAll" 
                    @click="checkBoxI=!checkBoxI">Select All</button>
            <button type="button" class="btn btn-outline-danger remove" @click="removeIntent">Remove</button>
            <button type="button" class="btn btn-outline-success add" data-toggle="collapse" 
            data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Add</button>

            <form class="form-inline right">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model="intentSearch" 
                    :onchange="intentFilteredList()" aria-label="Search" @keyup.enter="intentSearchClear" >
              <button class="btn btn-outline-success my-3 my-sm-0" type="submit" @click="intentSearchClear">Clear</button>
            </form>

            <div class="collapse" id="collapseExample">
              <div class="card card-body ">
                <input  class="form-control " type="input" placeholder="Add Intent" v-model="addValueIntent" @keyup.enter="addIntent">
              </div>
            </div>

            

            <div class="scroll_bar" id="checkboxintent">
              <div class="input-group pb-4 " v-for="item in intentFilteredList()" v-bind:key="item"  > 
                  <input :checked="checkBoxI" class="form-check-input btn btn-light ml-0" 
                        type="checkbox" :value="item" id="defaultCheck1" >
                    <div class="input-group-prepend form-control ml-3 " >
                        {{item}}
                    </div>
                  <button type="button" class="btn btn-light butD"  @click="reManageIntent(item)" >
                    <i class="fa fa-trash-o"></i>
                  </button>
              </div>
            </div>
          </div>

          <div  class="tab-pane fade" id="v-pills-profile" 
                role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <button type="button" class="btn btn-outline-secondary selectAll" @click="checkBoxE=!checkBoxE">Select All</button>
            
                <button type="button" class="btn btn-outline-danger remove" @click="removeEntity">Remove</button>
                <button type="button" class="btn btn-outline-success add" data-toggle="collapse" 
                data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">Add</button>
                
                <form class="form-inline right">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model="entitySearch" 
                        :onchange="entityFilteredList()" aria-label="Search" @keyup.enter="entitytSearchClear">
                  <button class="btn btn-outline-success my-3 my-sm-0" type="submit" @click="entitySearchClear">Clear</button>
                </form>

                <div class="collapse" id="collapseExample2">
                  <div class="card card-body">
                    <input class="form-control " type="input" placeholder="Add Entity" v-model="addValueEntity" @keyup.enter="addEntity">
                  </div>
                </div>

                <div class="scroll_bar" id = "checkbox">
                <div class="input-group pb-4 " v-for="item in entityFilteredList()" v-bind:key="item" >
                  
                  <input :checked="checkBoxE" class="form-check-input btn btn-light ml-0" type="checkbox" :value="item" id="defaultCheck2">

                    <div class="input-group-prepend form-control ml-3 " >
                        {{item}}
                    </div>
                  <button type="button" class="btn btn-light butD"  @click="reManageEntity(item)" >
                    <i class="fa fa-trash-o"></i>
                  </button>
              </div>     
              </div>   
          </div>
        </div>
      </div>  
  <app-loading v-if="loading"></app-loading>
      
  </div>
</div>
</template>

<script>
import Sender from '../../helper/sender'
import Loading from '../loading/loading'

export default {
    props:{
      listIntent: Array,
      listEntitiess: Array,
      reload: Function
    },
    components:{
      appLoading: Loading,
    },
    data: function(){
      return{
        intentSearch:'',
        entitySearch:'',
        showIntent:[],
      // postList:['a', 'b', 'c', 'ab'],
        bool: false,
        boolIntent: true,
        entity:[],
        addValueIntent:'',
        addValueEntity:'',
       // flag: true,
        checkBoxI: false,
        checkBoxE: false,
        deleteArray:[],
        loading: false,
      }
    },
   
    computed: {
      
    },

    methods:{
      async removeIntent(){
        if (confirm('Are you sure you want to delete this thing from the database?')) {
          this.loading=true;
          let a = document.getElementById('checkboxintent');
          let b = a.getElementsByTagName("input");
          let c =[];
          let data ={};
          c = Array.prototype.filter.call(b,el=>el.checked)
          Array.prototype.forEach.call(c,el=>this.deleteArray.push(el.value));
          //console.log(this.deleteArray)
          data.values = this.deleteArray;
          console.log(data);
          let bool = await Sender.deleteIntent(data);
          console.log(bool);
          this.deleteArray = [];
          this.loading=false;
          if(bool.fail==='') {
            await this.$emit('reload');
            //await this.reload();
            alert('success');
            }
          else if ((bool.fail!='')&&(bool.success!='')){
              await this.$emit('reload');
              alert('Xóa thành công '+bool.success +'. Không thể xóa '+bool.fail)
          }else{
            alert('Không thể xóa '+bool.fail)
          }
        } 
        else {
            return
        }
          
      },
      
      async removeEntity(){
        if (confirm('Are you sure you want to delete this thing from the database?')) {
          this.loading=true;
          let a = document.getElementById('checkbox');
          let b = a.getElementsByTagName("input");
          let c =[];
          let data ={};
          c = Array.prototype.filter.call(b,el=>el.checked)
          Array.prototype.forEach.call(c,el=>this.deleteArray.push(el.value));
         // console.log(this.deleteArray)
          data.id = this.deleteArray;
          let bool = await Sender.deleteEntity(data);
          this.deleteArray = [];
          this.loading=false;
          if(bool.fail==='') {
            await this.$emit('reload');
            //await this.reload();
            alert('success');
            }
          else if ((bool.fail!='')&&(bool.success!='')){
              await this.$emit('reload');
              alert('Xóa thành công '+bool.success +'. Không thể xóa '+bool.fail)
          }else{
            alert('Không thể xóa '+bool.fail)
          }
          }
          else{
            return
          }
      },

      async reManageIntent(item){
         if (confirm('Are you sure you want to delete this thing from the database?')) {
          this.loading=true;
          let data ={};
          data.values = item;
         // console.log(data);
          let bool = await Sender.deleteIntent(data);
          this.loading=false;
         // console.log(bool);
          if(bool.fail==''){
          // await this.reload();
          await this.$emit('reload');
            alert("success");
          }
          else{
            alert("can not delete this object");
          }
         }
          else{
            return
          }
      },

      async addIntent(){
        this.loading =true;
        let data ={};
        data.values = this.addValueIntent;
        let bool = await Sender.createIntent(data);
        this.loading=false;
        if(bool.error){
          //this.loading=false;
          alert(bool.meessage);
        }
        else{
          // this.listIntent.unshift(data.values);
          await this.$emit('reload');
          this.addValueIntent= '';
          //this.loading =false;
          alert("success");
        }
      },

      async reManageEntity(index){
         if (confirm('Are you sure you want to delete this thing from the database?')) {
            this.loading=true;
            let data ={};
            data.id = index;
            //console.log(data);
            let bool = await Sender.deleteEntity(data);
            this.loading=false;
           // console.log(bool);
            if(bool.fail===''){
              //await this.reload();
              //this.listEntitiess.splice(this.listEntitiess.indexOf(index),1);
              await this.$emit('reload');
              alert("success");
            }
            else{
              alert("can not delete this object");
            }
          }
          else{
            return
          }
      },

      async addEntity(){
        this.loading=true;
        let data ={};
        data.id = this.addValueEntity;
        let bool = await Sender.addEntity(data);
        this.loading=false;
        if(bool.error){
          alert(bool.meessage);
        }
        else{
          //this.listEntitiess.unshift(data.id);
         // await this.reload();
          await this.$emit('reload');
          this.addValueEntity='',
          alert("success");
        }
        this.$forceUpdate();
      },

      intentSearchClear(){
        this.intentSearch='';
      },
      entitySearchClear(){
        this.entitySearch="";
      },
      intentFilteredList() { 
        return this.listIntent.filter(post => {
          return post.toLowerCase().includes(this.intentSearch.toLowerCase());
        })
      },
      entityFilteredList() { 
        return this.listEntitiess.filter(post => {
          return post.toLowerCase().includes(this.entitySearch.toLowerCase());
        })
      },

    }
  
}
</script>


<style scoped>

  .right{
    float:right;
  }
  .butD{
   width: 4%;
  }
  .add{
    /* right: 50%; */
   width: 12%;
   margin-top: 2px;
   margin-right:30px;
   margin-left: 5px ;
   margin-bottom: 10px;
  }
  .remove{
    width: 12%;
    margin-top: 2px;
    margin-right:30px;
    margin-left: 5px ;
    margin-bottom: 10px;
  }
  .selectAll{
    width: 12%;
    margin-top: 2px;
    margin-right:30px;
    margin-left: 5% ;
    margin-bottom: 10px;
  }
  .scroll_bar{
    height: 300px;
    overflow-y:scroll;
  }
  .wrapper{
    position: absolute;
    z-index: 9999;
    width: 20.2%;
  }

</style>
