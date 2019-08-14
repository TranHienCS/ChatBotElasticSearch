<template>
  <div >

<div id ="main">
    <!-- <app-header></app-header>  -->
    <div class="card ">
      <div class="card-header">
        <h5>Home</h5>
      </div>
      <div calss="card-body">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item active" >
              <a class="nav-link active" data-toggle="tab" href="#training">TRAINING</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link " data-toggle="tab" href="#manage">MANAGE </a>
            </li>
          </ul>
        </div>
        <div class="tab-content">
          
        <div id="training" class="card-body tab-pane active">
          <div class="card">
            <div class="card-header">
              TEST HOW YOUR APP UNDERSTANDS ASENTENCE
              <small
                id="helpId"
                class="form-text text-muted"
              >You can train your app by adding more examples</small>
            </div>

            <div class="card-body" >
              <div class="form-group"> 
                  <div class="input-group ">
                    <div class="input-group-prepend mt-1 mr-1">
                      <img src='../../assets/smile.png' width="30" height="30" >
                    </div>
                    <input
                    type="text"
                    v-model="training.question"
                    value=""
                    class="form-control"
                    @keyup.enter="getQuestion()"
                    aria-describedby="helpId"
                    placeholder="User say..."
                    />
                  </div>

                <small id="helpId" class="form-text text-muted">Maximun {{255-training.question.length}} characters long</small>
                <div class= "text-center"><app-loadingic v-if ="loadingQ"></app-loadingic></div>
              </div>

              <div class="input-group w-100 " v-if="bool" >
                <app-intent :listIntent="listIntent"  @get_intent="getIntent" :trainingIntent="training.intent"></app-intent>
                <!-- <button type="button" class="btn btn-light" >
                  <i class="fa fa-window-close"></i>
                </button> -->  
              </div>

              <div v-if="checkIntent">
                <app-input :listEntitiess="listEntitiess" @inputEntity="pushEntity"></app-input>
                <div class = "bg-light rounded pt-4 ">
                  <div v-for="(i,index) in entity" :key="i.id">
                      <app-entity :entity="entity[index]" :ValEntity="valEntity[index]" @reEntity="removeEntity"></app-entity>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-footer text-muted " >
              <form class="form-inline rightBox">
                <box @default_answerWasUpdated="getAnswer" @senderbox="sender" @getEntity="setEntity" :_intent="training.intent" :_objEntity="training.entities"></box>
              </form>
            </div>
          </div>
        </div>
        
        <div id="manage" class = "card-body tab-pane  " >  
            <app-manage :listIntent="listIntent" :listEntitiess="listEntitiess" @reload="reload"></app-manage>
        </div>
        
        </div>
      </div>
    </div>
    </div>
  </div>
  <app-loading v-if="loading"></app-loading>
  <!-- <div class="a">S</div> -->
  </div>
</template>

<script>
import Loadingic from '../loading/loadingicon';
import InputEntity from "@/components/training/inputEntity";
import Entity from "@/components/training/Entity";
import Intent from "@/components/training/Intent";
import Box from "@/components/training/Box";
import Header from "@/components/training/Header";
import axios from "axios";
import Sender from "../../helper/sender";
import EntityVue from './Entity.vue';
import Manage from "../manage/Manage"
import Loading from '../loading/loading'
export default {
  data: function() {
    return {
      training: {
        entities: {},
        params: "",
        intent: "",
        question: "",
        default_answer: "",
        answer: ""
      },
      entity: [],
      valEntity: [],
      bool: false,
      total: 1,
      listEntitiess: [],
      listIntent:[],
      loading: false,
      param: [],
      loadingQ: false,
      loadingAll: false,
    };
  },
  async mounted(){
   
    //this.loading=true;
    let data = await Sender.getData();
    //console.log(data);
    this.listIntent =  data.intent;
    this.listEntitiess = data.entities;
    this.loading=false;
  
  },
  computed: {
    checkIntent() {
      if ((typeof this.training.intent === "undefined")||(this.training.intent === "")) return false;
      else return true;
    },
  },
  methods: {
    async setEntity(){
      //this.training.entities={};
      await this.getEntity();

    },

    async reload(){
        let data = await Sender.getData();
        this.listIntent = data.intent;
        this.listEntitiess = data.entities;
      }, 
    async getQuestion(){
      this.valEntity = [];
      this.entity=[];
      this.training.intent='';
      this.bool = true;
      let question={};
      question.question=this.training.question;
      this.loadingQ = true;
      let _intent = await Sender.recieveMessage(question);
      this.loadingQ = false;
      if(Object.keys(_intent).length!=0){
        let ab ={};
        ab = _intent.listEn;
        for(let i=0;i<Object.keys(ab).length; i++){
        let _params= Object.keys(ab);

        this.entity.unshift(_params[i]);
        this.valEntity.unshift(ab[_params[i]]);
      }

      this.training.intent=_intent.intent;
      // this.training.answer=_intent.answer;
      // this.training.default_answer=_intent.default_ans
      }

    }, 

    pushEntity(objEntity){
      this.entity.unshift(objEntity.en);
      this.valEntity.unshift(objEntity.valEn);
      
    },
    async sender() {
      this.loading = true;
      console.log(this.training);
      await Sender.sender(this.training);
      this.loading=false;

    },

    getAnswer(obj_answer) {
      this.training.intent = obj_answer.intent;
      this.training.entities = obj_answer.entities;
      this.training.answer = obj_answer.answer;
      this.training.default_answer = obj_answer.default_answer;
     // this.removeData();
    },
 ///lOI params
    getEntity() {
      console.log(this.entity);
      console.log(this.valEntity);
      console.log(this.training.entities);
      this.param = [];
      var test = this.entity;
      let Obj = this.training.entities;
      for (let i = 0; i < this.entity.length; i++) {
        if(Obj.hasOwnProperty(test[i])){
          //console.log(1);
          if(this.training.entities[test[i]]!==this.valEntity[i])
            this.training.entities[test[i]]+=','+this.valEntity[i];
        }
        else{
          this.training.entities[test[i]] = this.valEntity[i];
          this.param.push(test[i]); 
        }
      }
      this.training.entities ={};
      console.log(this.training.params);
      this.training.params = this.param.sort().toString();
    },

    getIntent(obj_intent){
      this.training.intent=obj_intent;
    },
    removeEntity(En){
      let idx = this.entity.indexOf(En);
      this.entity.splice(idx,1);
      this.valEntity.splice(idx,1);
    },

    // removeData(){
    //   this.training.question='';
    //   this.training.intent='';
    //   this.training.params='';
    //   this.entity.splice(0,this.entity.length);
    //   this.valEntity.splice(0,this.valEntity.length);
    //  // this.listIntent.splice(0, this.listIntent.length)
    // }
    
  },
  
  components: {
    box: Box,
    appHeader: Header,
    appEntity:Entity,
    appInput: InputEntity,
    appIntent: Intent,
    appManage: Manage,
    appLoading: Loading,
    appLoadingic: Loadingic
  }
};
</script>


<style scoped>
body{
  /* height: 100%; */
  background-color: lightseagreen;
}
.input-group-text {
  width: 100px;
  text-align: center;
}

.form{
  margin-left: 15%;
  /* margin-right: 1% */
}

.rightBox {
  float: right;
}


html{
  background-color: aqua;
}

</style>
