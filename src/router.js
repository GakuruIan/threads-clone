import { createMemoryHistory, createRouter,createWebHistory } from 'vue-router'

// components
import Login from './Pages/Auth/Login.vue'
import Register from './Pages/Auth/Register.vue'
import Main from './Pages/Main/Main.vue'
import Threads from './Pages/Threads/Threads.vue'
import Profile from './Pages/Profile/Profile.vue'
import Thread from './Pages/Thread/Thread.vue'
import EmailPassword from './Pages/Auth/EmailPassword.vue'
import Create from './Pages/CreateThread/Create.vue'

const routes = [
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/email-password',component:EmailPassword},
    {
        path:'/',
        component:Main,
        children:[
            {
                path:'/',
                components:{
                    content :Threads
                }
            },
            {
                path:'@:username',
                components:{
                    content :Profile
                },
                props: true
            },
            {
                path:'create-thread',
                components:{
                    content:Create
                }
            },
            {
                path:'thread/:id', 
                components:{
                    content:Thread
                }
            }
        ]
    }
]

const router = createRouter({
    history:createWebHistory(),
    mode: 'history',
    routes,
})

export default router