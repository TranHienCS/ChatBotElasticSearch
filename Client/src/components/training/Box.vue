<template>
  <div id="app">
    <button @click.prevent="showAnswer()" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Teach answer now</button>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add answer</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <form>
                <div class="form-group">
                  <div class = "w-100">
                  <label class ="d-inline">Answer:</label>
                  <label @click= "total++" class="float-right d-inline"><i class="fa fa-plus"></i></label>
                  </div>
                </div>

                  <div v-for="i in total" :key="i.id">
                  <textarea @keyup.enter="((deAnswer!=='')?changeDeAnswer():{})" type="text" id='answer' class="form-control w-100 mt-2" 
                  v-model="answer"></textarea>
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Default Answer:</label>
                  <textarea @keyup.enter="changeDeAnswer()" type="text" id='default' class="form-control w-100" 
                  :disabled="deAnswer!=''" v-model="writeDefAnswer"></textarea>
                </div>
      
              </form>

            </div>
           
            <div class="modal-footer">
               
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="changeDeAnswer()">Ok</button>
            </div>
          </div>
        </div>   
   </div>
  </div>

</template>

<script>
//import Forms from '@/components/Forms'
import Sender from '../../helper/sender';
export default {
  name: 'App',
  props:{
    // p_answer: String,
    // p_default_answer: String,
    _intent: String,
    _objEntity: Object,
    sender: Function,
  } ,

  data(){
    return{
     total:1,
     arrAns:[],
     deAnswer:'',
     answer:'',
     writeDefAnswer:'',
     objData:{},
     loading: true,
    }
  },

  methods:{
    async showAnswer(){
      this.$emit('getEntity');
      this.objData.intent = this._intent;
      this.objData.objEntity = this._objEntity;
      console.log(this._intent);
      console.log(this._objEntity);
      let data = await Sender.recieveAnswer(this.objData)
      this.answer=data.answer;
     // this.arrAns[0]=this.p_answer;
      this.deAnswer=data.default_ans;
      this.writeDefAnswer ='';
      if(this.deAnswer!=='') this.writeDefAnswer = this.deAnswer;
      
  },
    changeDeAnswer() {
      if(confirm("Are you sure send this sample")){
      this.arrAns.push(this.answer);
      //this.answer=this.arrAns.toString();
      //this.default_answer=this.deAnswer;
      if(this.deAnswer==''){
        this.$emit('default_answerWasUpdated', {intent:this.objData.intent,entities:this.objData.objEntity,default_answer: this.writeDefAnswer, answer: this.answer}) 
      }
      else{
        this.$emit('default_answerWasUpdated', {intent:this.objData.intent,entities:this.objData.objEntity,default_answer: this.deAnswer, answer: this.answer}) 
      }
       
      this.$emit('senderbox',this.sender);
      //location.reload()
      // this.sender();
      }
     },
  }
}
</script>

<style scoped>
  body {
  margin: 0;
  padding: 0;
  background-color: #17a2b8;
  height: 100vh;
}
#login .container #login-row #login-column #login-box {
  margin-top: 120px;
  max-width: 600px;
  height: 320px;
  border: 1px solid #9C9C9C;
  background-color: #EAEAEA;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login .container #login-row #login-column #login-box #login-form #register-link {
  margin-top: -85px;
}
.modal-notify .modal-header {
    border-radius: 3px 3px 0 0;
}
.modal-notify .modal-content {
    border-radius: 3px;
}
</style>
