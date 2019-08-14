<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  
    <!-- <manageQA></manageQA>  -->

  </div>
</template>

<script>

import Forms from '@/components/training/Forms'
import Box from '@/components/training/Box'
import Header from '@/components/training/Header'
import ManageQA from '@/components/manageQ&A/tableQ.vue'
//import ProductTable from './components/manageQ&A/ProductTable'
// import Manage from '@/components/chatBox/ChatBox'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components:{
    forms: Forms,
    manageQA: ManageQA,
    appHeader: Header
    //productTable: ProductTable
  },
  
}
</script>

<style>

</style>
