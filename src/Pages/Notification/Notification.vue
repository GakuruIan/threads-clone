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

            <div class="py-2 px-2 mb-2 flex items-center justify-between rounded-md hover:cursor-pointer  gap-x-2">
               <div class="flex items-center gap-x-3 md:gap-x-2">
                   <img :src="pic" alt="" srcset="" class="h-10 w-10 object-fit rounded-full">
               
                   <div class="">
                       <h4 class="text-base">Username</h4>
                       <p class="mt-1 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, omnis.</p>
                   </div>
   
               </div>
               <!-- the post -->
               <div class="">
                   <img :src="pic" alt="" srcset="" class="h-10 w-10 object-fit rounded-md">
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
import pic from '../../assets/pic.jpg'

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


const loading = ref(false)
const Notifications = ref([])
const toastId = ref(null)
const user = ref(null)
const isEmpty =ref(false)

const store=useStore()

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
            Notifications.value = response.data
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

</script>

