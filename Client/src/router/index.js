import Vue from 'vue'
import Router from 'vue-router'
import Forms from '@/components/training/Forms'
import ChatBox from '@/components/chatBot/ChatBot'
import Questions from '@/components/manageQ&A/tableQ'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Forms',
      component: Forms
    },
    // {
    //   path: '/training',
    //   name: 'Forms',
    //   component: Forms
    // },
    {
      path: '/chat',
      name: 'Chat',
      component: ChatBox
    },
    {
      path: '/questions',
      name: 'questions',
      component: Questions
    }
  ]
})
