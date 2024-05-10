import { createMemoryHistory, createRouter } from 'vue-router'

// components
import Login from './Pages/Auth/Login.vue'
import Register from './Pages/Auth/Register.vue'
import Main from './Pages/Main/Main.vue'
import Threads from './Pages/Threads/Threads.vue'
import Profile from './Pages/Profile/Profile.vue'
import Thread from './Pages/Thread/Thread.vue'
import EmailPassword from './Pages/Auth/EmailPassword.vue'

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
                path:'profile',
                components:{
                    content :Profile
                }
            },
            {
                path:'thread',  //!add post id
                components:{
                    content:Thread
                }
            }
        ]
    }
]

const router = createRouter({
    history:createMemoryHistory('http://localhost:5173/'),
    routes,
})

export default router