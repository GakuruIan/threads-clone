<template>
  <div class="relative bg-dark-300 px-2 mb-14 md:mb-0 py-2 ">

     <div class="">
        <div class="flex items-center justify-between w-full mb-4">
          <div class="">
            <h6 class="text-2xl font-medium">{{user?.username}}</h6>
          </div>
          <div class="">
            <!-- !! add no image -->
            <img :src="user?.avatar.url" alt="" class="h-20 w-20 rounded-full object-fit">
          </div>
        </div>

        <!-- bio -->
       <div class="">
        <p class="text-sm max-w-sm">{{ user?.bio }}</p>
       </div>

       <!-- info -->
       <div class="flex items-center justify-between my-4">
         <div class="flex items-center gap-x-4">
             <div class="">
               <span class="text-gray-400 text-[15px]">{{ user?.posts }} Posts</span>
              
             </div>
             <div class="">
               <span class="text-gray-400 text-[15px]">{{  user?.followers}} Followers</span>
             </div>
             <div class="">
               <span class="text-gray-400 text-[15px]">{{  user?.following}} following</span>
               
             </div>
         </div>

          <!-- icons -->
          <div class="flex items-center gap-x-2">
            <v-icon name="co-instagram" class="h-5 w-5"/>
            <v-icon name="ri-more-fill" class="h-5 w-5"/>
          </div>

       </div>

        <!-- buttons -->
        <div class="flex gap-x-4">
            <div class="flex-1 w-full">
              <div class="w-full" v-if="user?._id === currentUserID">
                  <button @click="router.push(`/@${username}/settings`)"  class="w-full flex-1 px-2 py-2  bg-white hover:bg-white/95 font-semibold text-gray-700  rounded-sm">
                    Edit Profile
                  </button>
              </div>

              <div class="" v-else>
                <!-- if the user is following the user show unfollow button -->
                <button v-if="true" class="w-full px-2 py-2  bg-white hover:bg-white/95 font-semibold text-gray-700  rounded-sm">
                  Follow
                 </button>

                 <button v-else class="w-full px-2 py-2  bg-white hover:bg-white/95 font-semibold text-gray-700  rounded-sm">
                   UnFollow
                 </button>
              </div>

            </div>

             <button class="flex-1 w-full px-2 py-2 rounded-sm tracking-wide bg-none border border-white text-white transition-all duration-75 hover:bg-white hover:text-gray-700 hover:font-semibold">
               Mention
            </button>
          </div>
          <!-- buttons -->
     </div>

     <!-- slider --> 
     <div class="my-4">
      <div class="flex w-full items-center gap-x-2">
        <!-- links or buttons -->
        <div class="flex-1 text-sm font-medium text-center text-gray-400 border-gray-700">
            <ul class=" flex flex-wrap -mb-px">
                <li class="me-2 flex-1">
                    <router-link :to="`/@${username}`" class="inline-block p-4  rounded-t-lg hover:border-gray-300 hover:text-gray-300">Threads</router-link>
                </li>
                <li class="me-2 flex-1">
                    <router-link :to="`/@${username}/replies`" class="inline-block p-4   hover:border-gray-300 hover:text-gray-300  rounded-t-lg">Replies</router-link>
                </li>
                <li class="me-2 flex-1">
                    <router-link :to="`/@${username}/mentions`" class="inline-block p-4  rounded-t-lg  hover:border-gray-300 hover:text-gray-300">Mentions</router-link>
                </li>
                <li class="me-2 flex-1">
                    <router-link :to="`/@${username}/settings`" class="inline-block p-4  rounded-t-lg  hover:border-gray-300 hover:text-gray-300">Settings</router-link>
                </li>

            </ul>
        </div>
        <!-- links buttons -->
      </div>
     </div>

     <div class="mt-6">
       <router-view  name="subcontent">
        
       </router-view>
     </div>
     <!-- slider -->

     <!-- post card -->

     <!-- <template v-for="thread in user?.posts" :key="thread._id">
      <PostCard :Thread="thread"/>
    </template> -->
     
  </div>
</template>

<script setup>
import { ref,onMounted} from 'vue';

// vuex
import { useStore } from 'vuex';
// router
import { useRouter } from 'vue-router'
import { BaseUrl } from '../../config/Axios';

// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let user = ref(null)
const store = useStore()

const router =useRouter()

const {accessToken,_id} = store.getters.user

let currentUserID = _id


const props=defineProps({
  username:String
})

const GetUser=(username)=>{
    BaseUrl(`/user/${username}`,
      {
        headers:{
          'Authorization': `Bearer ${accessToken}`
        }
      }
    ).then((response)=>{
      if(response.status === 200 & response.statusText == 'OK'){
        user.value =response.data
      }

    })
    .catch((err)=>{
      const {response} = err
      if(response.status === 401){
        toast.error(`Access Denied ${response.data.message}`,{
          position:toast.POSITION.TOP_CENTER,
          transition: toast.TRANSITIONS.SLIDE,
          theme:'colored',
          autoClose:2000,
          hideProgressBar: true,
        })
        router.push('/')
      }
    })
}

onMounted(()=>{
    GetUser(props.username)
    
})



</script>
