<template>
  <b-container fluid class="backg">
    <!-- User Interface controls -->
    <b-row class="search">
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <div>
      
      <b-button class="but" @click="deleteSelect">Delete Select</b-button>
      <b-button class="but" @click="selectAll()">SelectAll</b-button>
    <b-table
      striped red
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >

       <template slot="entities" slot-scope="row">
         {{row.value}}
        <b-button size="sm" @click="row.toggleDetails" class ='float-right mr-1'>
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item.params" :key="key">{{ key }} : {{ value }}</li>
            
          </ul>
        </b-card>
      </template>

      <template slot="select" slot-scope="row" button="a">
      <b-form-checkbox :checked="true" v-model="selected" :value="row.item.text">
        <!-- {{selected}} -->
        <!-- {{currentPage}} -->
        <!-- {{perPage}} -->
        </b-form-checkbox>
      </template>  
      <template slot="remove" slot-scope="row">
        <b-button size="sm" @click="remove(row.item.text)">
           Remove
        </b-button>
      </template>
    </b-table>
    </div>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
    <app-loading v-if="loading"></app-loading>

  </b-container>
  
</template>

<script>
  import Sender from '../../helper/sender'
  import Loading from '../loading/loading'

  export default {
    data() {
      return {
        bool: true,
        selected:[],
        items: [],
        fields:[
            {key: 'text', label: 'Question', sortable: true},
            {key: 'intent', label: 'Intent', sortable: true},
            {key: 'entities', label: 'Entities'},
            
            {key: 'select', label: 'Select' },
            {key: 'remove', button:'Remove'}
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        count:0,
        loading: false,

      }
    },
    components:{
      appLoading: Loading,
    },

    computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
   
    },
    async mounted() {
      this.loading=true;
      this.items = await Sender.getSamples();
      // Set the initial number of items
      this.totalRows = this.items.length
      this.loading=false;
        
      
    },
    methods: {
      selectAll(){
        this.selected=[];
        var a= (this.currentPage-1)*5
       // console.log(a);
        if((this.count%2)==0){
          for(let i=a; i<this.items.length&&i<a+5;i++){
            this.selected.push(this.items[i].text); 
          }
         //console.log(this.selected);
        }
        else{
          this.selected=[];
        }
        this.count=this.count+1;
      },
      async remove(question){
        if (confirm('Are you sure you want to delete this thing from the database?')) {
          this.loading=true;
          let data ={};
          data.questions = question;
          let result = await Sender.deleteSamples(data);
          console.log(result);
          if(result.sent){
            //this.items = await Sender.getSamples();
            setTimeout(async () => {
              this.items = await Sender.getSamples()
            }, 1000);
            //this.loading=false;
            console.log(this.items)
            alert("delete success!")
          }
          else{
            alert("error!")
          }
          this.loading=false;
        }
          else{
            return
          }
      },

      async deleteSelect(){
        
        if (confirm('Are you sure you want to delete this thing from the database?')) {
          this.loading=true;
          let data ={};
          data.questions = this.selected;
          let result = await Sender.deleteSamples(data);
          if(result.sent){   
            //this.items = await Sender.getSamples();
            setTimeout(async () => {
              this.items = await Sender.getSamples()
            }, 1000);
            console.log(this.items);
            alert("delete success!")
            
          }
          else{
            alert("error!")
          }
          this.loading=false;
        }
        else{
          return
        }
      },

      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>

<style >
.search{
  margin-bottom: 1%;
  /* margin-top: 3%; */
  margin-left: 3%;
  margin-right: 3%;
  padding-top: 3%;
}
.but{
  float: right;
  margin-bottom: 1%;
  margin-right: 4%;
  margin-left: 1%;
  
}
/* body{
  margin-bottom: 3%;
  margin-top: 3%;
  margin-left: 3%;
  margin-right: 3%; 
   background-color: cadetblue;
}
.backg{
  background-color: rgb(147, 197, 174);
} */
</style>
