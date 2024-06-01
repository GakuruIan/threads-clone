<template>
     <div class="relative bg-dark-300 px-2 mb-2 md:mb-0 py-2 ">

        <div  class="relative md:border-b-2 md:border-light-100 pb-3">

            <!-- card header -->
            <div class="flex items-center justify-between py-2 ">
                <div class="flex items-center gap-x-2">
                    <img class="w-10 h-10 rounded-full" :src="User?.avatar.url" alt="user photo" />

                    <div class="flex flex-col">
                        <router-link :to="`@${User?.username}`" class="border-transparent text-gray-200 text-base md:text-base tracking-normal font-thin">{{ User.username }}</router-link>
                        <time class="text-xs font-normal text-gray-400">2 hours ago</time>
                    </div>
                </div>
            
            </div> 
            <!-- card header -->

            <!-- card content -->
            <div  class="relative flex">
                <div class="absolute left-3 border-s border-gray-400 h-full"></div>

                <div class="px-6 flex-1">
                    <router-link :to="`/thread/${Thread._id}`">
                        <p class="mb-3 text-sm"> {{ Thread.caption }}</p>
                        <!-- image -->

                        <div v-if="Thread.photos.length > 0">
                            <!-- if there is more than two images -->
                            <div v-if="Thread.photos.length > 1">
                                <div class="grid grid-cols-2 gap-x-2">
                                    <div v-for="photo in Thread.photos" :key="photo._id">
                                        <img :src="photo.path"  alt="photo" class="h-80 md:h-full w-full object-fit rounded-lg">
                                    </div>
                                </div>
                            </div>

                            <div v-else v-for="photo in Thread.photos" :key="photo._id">
                                <img :src="photo.path"  alt="photo" class="h-80 md:h-96 w-96 object-fit rounded-lg">
                            </div>

                        </div>
                    </router-link>

                    <!-- icons -->
                    <div class="mt-1 ">

                     <div class="flex items-center gap-1 py-2">

                         <button @click="handleLike(Thread._id)" class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                            <v-icon name="bi-heart" class="h-5 w-5"/>
                         </button>

                        <div class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                            <v-icon name="co-comment-bubble" class="h-5 w-5"/>
                        </div>

                        <div class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                            <v-icon name="la-retweet-solid" class="h-5 w-5"/>
                        </div>

                        <div class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                            <v-icon name="co-share" class="h-5 w-5"/>
                        </div>
   
                     </div>

                    </div>
                    <!-- icons -->

                    <div class="flex items-center gap-4 mb-4 md:mb-2">
                        <p class="text-sm text-gray-200  hover:text-gray-300">{{ Thread?.comments.length }} reply</p>
                        <p class="text-sm text-gray-200  hover:text-gray-300">{{ Thread?.likes.length }} likes</p>
                    </div>
                </div>
               
            </div>
            <!-- card content -->
            <div class="flex -space-x-3 rtl:space-x-reverse">
                <img class="w-5 h-5 border-2 border-white rounded-full dark:border-gray-800" :src="tshirt" alt="">
                <img class="w-5 h-5 border-2 border-white rounded-full dark:border-gray-800" :src="tshirt" alt="">
                <img class="w-5 h-5 border-2 border-white rounded-full dark:border-gray-800" :src="tshirt" alt="">
            </div>

        </div>
       
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import tshirt from '../../assets/tshirt.jpg'

// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// vuex
import { useStore } from 'vuex';

// axios
import { BaseUrl } from '../../config/Axios';


// prop of object
defineProps({
  Thread: Object,
  User:Object  // owner of the post
})

let user = ref(null)
const store = useStore()

onMounted(()=>{
   user.value = store.getters.user
})

const handleLike = async(threadID)=>{
   try {
    const result = await BaseUrl.post(`/like/${threadID}`,{user:user.value._id},{
         headers:{
            'Authorization' : `Bearer ${user.value.accessToken}`
         }
      })

      console.log(result)
   } catch (error) {
    const {response} = error

    if(response.status === 500){
          toast.error("Something went wrong",{
          type:'error',
          theme:'colored',
          autoClose:2000,
          hideProgressBar:true
        })
       }

      console.log(error)
   }
}





</script>
