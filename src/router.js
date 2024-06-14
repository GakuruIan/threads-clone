import { createMemoryHistory, createRouter,createWebHistory } from 'vue-router'

// components
import Login from './Pages/Auth/Login.vue'
import Register from './Pages/Auth/Register.vue'
import Main from './Pages/Main/Main.vue'
import Threads from './Pages/Threads/Threads.vue'
import Profile from './Pages/Profile/Profile.vue'
import Thread from './Pages/Thread/Thread.vue'
import Notification from './Pages/Notification/Notification.vue'
import EmailPassword from './Pages/Auth/EmailPassword.vue'
import Create from './Pages/CreateThread/Create.vue'
import UserThreads from './components/SubComponents/UserThreads.vue'
import UserReplies from './components/SubComponents/UserReplies.vue'
import UserMentions from './components/SubComponents/UserMentions.vue'
import Search from './Pages/Search/Search.vue'
import Recovery from './Pages/Auth/Recovery.vue'
import Settings from './components/SubComponents/Settings.vue'

const routes = [
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/email-password',component:EmailPassword},
    {path:'/forgot-password',component:Recovery},
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
                props: true,
                children: [
                    {
                      path: '',
                      components: {
                        subcontent: UserThreads
                      },
                      props: true,
                    },
                    {
                        path: 'replies',
                        components: {
                          subcontent: UserReplies
                        }
                    },
                    {
                        path: 'mentions',
                        components: {
                          subcontent: UserMentions
                        }
                    },
                    {
                        path: 'settings',
                        components: {
                          subcontent: Settings
                        }
                    }
                  ]
            },
            {
                path:'create-thread',
                components:{
                    content:Create
                }
            },
            {
                path:'nofitications',
                components:{
                    content:Notification
                }
            },
            {
                path:'thread/:id', 
                components:{
                    content:Thread
                }
            },
            {
                path:'search',
                components:{
                    content:Search
                }
            }
        ]
    }
]

const router = createRouter({
    linkActiveClass: '',
    linkExactActiveClass: 'border-b-2 border-white-700 text-gray-300',
    history:createWebHistory(),
    mode: 'history',
    routes,
})

export default router