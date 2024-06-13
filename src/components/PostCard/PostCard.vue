<template>
     <div class="relative bg-dark-300 px-2 mb-2 md:mb-0 py-2 ">

        <div  class="relative md:border-b-2 md:border-light-100 pb-3">

            <!-- card header -->
            <div class="relative flex items-center justify-between py-2 ">
                <div class="flex items-center gap-x-2">
                    <img class="w-10 h-10 rounded-full" :src="User?.avatar.url" alt="user photo" />

                    <div class="flex flex-col">
                        <router-link :to="`@${User?.username}`" class="border-transparent text-gray-200 text-base md:text-base tracking-normal font-thin">{{ User.username }}</router-link>
                        <time class="text-xs font-normal text-gray-400">{{ ShowTime(Thread?.createdAt) }}</time>
                    </div>
                </div>

                <div class="flex items-center gap-x-2">
                    
                    <button class="group" @click="handleDropdown(true)">
                        <v-icon name="ri-more-2-fill" class="h-5 w-5 group-hover:cursor-pointer"/>
                    </button>
                    
                    <!-- dropdown -->
                    <div id="dropdownDotsHorizontal" 
                      class="absolute top-12 right-0 z-10 rounded-lg shadow w-44 bg-dark-600 "
                      :class="[ OpenDropdown ? '' : 'hidden']"
                    >
                        <button class="absolute right-2" @click="handleDropdown(false)">
                            <v-icon name="io-close" class="h-4 w-4 hover:cursor-pointer "/>
                        </button>

                        <ul class="py-2 text-sm mt-4 text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                        
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-light-100 dark:hover:text-white">Report</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-light-100 dark:hover:text-white">Share</a>
                            </li>

                            <li v-if="User?._id === user?._id">
                              <button @click="handleDelete(Thread?._id)" class="w-full py-2 px-4 flex items-center gap-x-2 group text-sm hover:text-red-500 hover:bg-light-100">
                                Delete
                               </button>
                            </li>
                        </ul>
                    </div>
                     <!-- dropdown -->

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
                         <div class="">
                            <button v-if="!Thread?.isLikedByCurrentUser" @click="handleLike(Thread._id)" class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                               <v-icon name="bi-heart" class="h-5 w-5"/>
                            </button>
                            
                            <button v-else @click="handleUnLike(Thread._id)" class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                               <v-icon name="bi-heart-fill" class="h-5 w-5 text-red-600"/>
                            </button>
                        </div>


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
import { ref,onMounted,computed } from 'vue';
import tshirt from '../../assets/tshirt.jpg'

// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// vuex
import { useStore } from 'vuex';

// axios
import { BaseUrl } from '../../config/Axios';


// prop of object
const props=defineProps({
  Thread: Object,
  User:Object  // owner of the post
})


let user = ref(null)
let OpenDropdown = ref(false)
const store = useStore()

onMounted(()=>{
   user.value = store.getters.user
})

const ShowTime = (timestamp)=>{
   
  const now = new Date();
  const date = new Date(timestamp);

  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 5) {
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  } else if (hours >= 24) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (minutes >= 60) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (seconds >= 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  }
}


const handleLike = async(threadID)=>{
   try {
    const result = await BaseUrl.post(`/like/${threadID}`,{},{
         headers:{
            'Authorization' : `Bearer ${user.value.accessToken}`
         }
      })

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

const handleUnLike = async(threadID)=>{
   try {
    const result = await BaseUrl.post(`/unlike/${threadID}`,{},
    {
        headers:{
            'Authorization' : `Bearer ${user.value.accessToken}`
         }
    }
    )

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

const handleDropdown=(state)=>{
    OpenDropdown.value = state
}

const handleDelete=async(id)=>{
    let toastId 
    
    toastId = toast.loading('Deleting Post',{
        position:toast.POSITION.TOP_CENTER,
        type:'info',
        theme:'colored',
        autoClose:1500,
        hideProgressBar:true
    })

  try {
    let response = await BaseUrl.delete(`/delete/${id}`,{
      headers:{
        Authorization: `Bearer ${user.value.accessToken}`
      }
    })
   
    if(response.status === 200){
        toast.update(toastId,{
            render:"Post deleted successfully",
            type:'success',
            theme:'colored',
            autoClose:1500,
            hideProgressBar:true
        })
    }
    
  } catch (error) {
    const {response} = error

    if(response.status === 500){
          toast.error("Something went wrong",{
          type:'error',
          theme:'colored',
          autoClose:1500,
          hideProgressBar:true
        })
       }

      console.log(error)
  }
  finally{
    setTimeout(()=>{
      toast.remove(toastId)
    },3000)
    OpenDropdown.value = false
  }
}





</script>
