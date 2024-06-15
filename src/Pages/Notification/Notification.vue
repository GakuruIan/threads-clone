<template>
  <div class="">
    <div class="bg-dark-300 py-2 rounded-sm mb-4">
        <div class="py-2 px-2 mb-2">
            <h1 class="text-2xl">Notifications</h1>
        </div>

        <!-- loader -->
        <div class="min-h-[calc(100vh-180px)] flex items-center justify-center" v-if="loading">
           <Spinner />
        </div>
         <!-- loader -->

        <div v-else class="mt-2 px-2">
            
        <div class="" v-if="!isEmpty">

            <div class="mb-2">
                <div class="" v-for="Notifications in AllNotifications" :key="Notifications._id">
                    <h2 class="text-base font-semibold mb-1">{{ Notifications?._id }}</h2>
                      
                    <div class="" v-for="notification in Notifications.notifications" :key="notification._id">
                            
                        <div class="flex justify-end px-2 items-center mt-1">
                                <time class="text-xs font-normal text-gray-400">{{ ShowTime(notification?.createdAt) }}</time>
                                <span v-if="!notification?.read" class="w-1.5 h-1.5 mx-2 bg-green-400 rounded-full"></span>
                        </div>

                         <div @click="handleNotification(notification?._id,notification?.post._id)" class="py-2 px-2 border-b border-b-light-100 flex items-center justify-between rounded-md hover:cursor-pointer  gap-x-2">
                    
                            <div class="flex items-center gap-x-3 md:gap-x-2">
                                <div class="">
                                    <img  v-if="notification.notifier.avatar" :src="notification?.notifier.avatar.url" alt="" srcset="" class="h-10 w-10 object-fit rounded-full">
                                    <img  v-else :src="blank" alt="" srcset="" class="h-10 w-10 object-fit rounded-full">
                                </div>
                            
                                <div class="">
                                    <h4 class="text-base">{{ notification?.notifier.username }}</h4>
                                    <p class="text-sm" :class="[notification.read ? '':'font-semibold']">{{ notification?.message }}</p>
                                </div>
                
                            </div>
        

                            <div class="flex items-center">
                                
                                <div class="" v-if="notification?.post.photos.length >0">
                                    <img :src="notification.post.photos[0].path" alt="" srcset="" class="h-10 w-10 object-fit rounded-md">
                                </div>
                                
                            </div>
                       </div>
                  </div>

                </div>
            </div>

 

            
        </div>

        <!-- if a new has no notifications -->
        <div v-else class="min-h-[calc(100vh-180px)] flex flex-col gap-y-2 items-center justify-center">
            <v-icon name="si-ghostery" scale="1.7" class="animate-bounce hover:cursor-pointer"/>
             <p class="text-xl text-gray-400">No notifications</p>
        </div>

        </div>
    
    </div>


  </div>
</template>

<script setup>
import blank from '../../assets/blank.png'

import {  useRouter} from 'vue-router'

// vuex
import { useStore } from 'vuex'
// vue
import { onMounted, ref } from 'vue';
// axios
import { BaseUrl } from '../../config/Axios';
// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// loader
import Spinner from '../../components/Loader/Spinner.vue';

// timestamp
import { ShowTime} from '../../config/Timestamp'


const loading = ref(false)
const AllNotifications = ref([])
const toastId = ref(null)
const user = ref(null)
const isEmpty =ref(false)

const store=useStore()
const router = useRouter()

onMounted(()=>{
    user.value = store.getters.user

    BaseUrl.get('/notifications',{
        headers:{
            Authorization:`Bearer ${user.value.accessToken}`
        }
    })
    .then((response)=>{
        loading.value=true
        if(response.status === 200){

            console.log(response.data)

            if(response.data.length === 0){
                isEmpty.value =true
            }
            AllNotifications.value = response.data
        }
    })
    .catch((err)=>{
        const {response} = err

        if(response.status === 500){
           toastId.value = toast.error("Something went wrong . Try again Later",{
          position:toast.POSITION.TOP_CENTER,
          transition: toast.TRANSITIONS.SLIDE,
          theme:'colored',
          autoClose:2000,
          hideProgressBar: true,
        })
        }
    })
    .finally(()=>{
        if(toastId.value){
            toast.remove(toastId.value)
        }
        loading.value = false
    })

})

const handleNotification=async(notificationID,threadID)=>{
    let response
    let toastId
    try {
       
       response = await BaseUrl.put(`/notification/${notificationID}/update`,{read:true},
          {
            headers:{
                Authorization :`Bearer ${user.value.accessToken}`
            }
          }
        )

        if(response.status === 200 ){
            console.log(response.data)
            router.push(`/thread/${threadID}`)
        }

    } catch (error) {
        const {response} = error

        if(response.status === 500){
            toastId = toast.warn(`${response.data}`,{
                position:toast.POSITION.TOP_CENTER,
                transition: toast.TRANSITIONS.SLIDE,
                theme:'colored',
                hideProgressBar:true,
                autoClose:2000
          })
        }

        return false
    }
    finally{
        toast.remove(toastId)
    }
}


</script>

