<template>
    <!-- loading state -->
    <div class="" v-if="fetching">
        <Pulse :count="1"/>
    </div>

    <div v-else class="relative bg-dark-300 px-2 mb-14 md:mb-0 py-2 ">

       <div class="relative md:border-b-2 md:border-light-100 pb-3">

           <!-- card header -->
           <div class="flex items-center justify-between py-2 ">
               <div class="flex items-center gap-x-2">
                   <img class="w-10 h-10 rounded-full" :src="Thread?.author.avatar.url" alt="user photo" />

                   <div class="flex flex-col">
                       <router-link :to="`/@${Thread?.author.username}`" class="text-base md:text-base tracking-normal font-thin">{{ Thread?.author.username }}</router-link>
                       <time class="text-xs font-normal text-gray-400">2 hours ago</time>
                   </div>
               </div>

             <div>
                 <button v-if="!isFollowing" @click="handleFollow" class="w-28 px-4 py-1 rounded-md tracking-wide bg-none border border-white text-white transition-all duration-75 hover:bg-white hover:text-gray-700 hover:font-semibold">Follow</button>

                 <button v-else @click="handleUnFollow" class="w-28 px-4 py-1 rounded-md font-semibold  bg-white text-gray-700  transition-all duration-75 hover:bg-white/100 hover:text-gray-800 hover:font-semibold">Unfollow</button>
             </div>
           </div> 
           <!-- card header -->

           <!-- card content -->
           <div  class="relative flex">
               <div class="px-6 flex-1">
                
                   <p v-if="Thread?.caption" class="mb-3 text-sm"> {{ Thread?.caption }}</p>


                   <div v-if="Thread?.photos.length > 0">
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

                   <!-- icons -->
                   <div class="mt-1 ">

                    <div class="flex items-center gap-1 py-2">

                        <div class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                           <v-icon name="bi-heart" class="h-5 w-5"/>
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

                   <!-- likes and reply -->
                   <div class="flex items-center gap-4 mb-4">
                       <p class="text-sm text-gray-200  hover:text-gray-300">{{ Thread?.comments.length }} reply</p>
                       <p class="text-sm text-gray-200  hover:text-gray-300">{{ Thread?.likes.length }} likes</p>
                   </div>
                    <!-- likes and reply -->

                   <!-- comment form -->
              
                       <form action="" @submit.prevent="handleSubmit" class="flex flex-1 gap-x-1 bg-light-100 rounded-md py-2 px-2 mb-4">
                          <input type="text" v-model="comment" placeholder="comment" class="bg-transparent px-2 py-1 outline-none flex-1">
                          
                          <button type="submit" :disabled="loading" v-if="!loading">
                            <v-icon name="co-send" class="h-6 w-6"/> 
                          </button>

                          <div role="status" class="ml-2" v-if="loading">
                            <svg aria-hidden="true" class="inline w-6 h-6  animate-spin text-light-100  fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                          </div>
                       </form>

                     <small class="text-sm text-red-500 " v-if="hasErrors">{{ error }}</small>
                    <!-- comment form -->

               </div>
              
           </div>
          
       </div>
       
       <!-- pass the comments data to the component -->

       <div class="" v-if="Thread?.comments.length > 0">
        <div class=""  v-for="comment in Thread.comments" :key="comment._id">
           <Comment :Comment="comment"/>
        </div>
       
        
       </div>

         <!-- incase of an empty -->
       <div v-else class="h-44 w-full border-t-2 border-light-100 flex items-center flex-col gap-y-4 justify-center">
            <v-icon name="si-ghostery" scale="1.7" class="animate-bounce hover:cursor-pointer"/>
            <p class="text-base text-gray-400">No Comments</p>
      </div>
      
 </div>
</template>

<script setup>
import Pulse from '../../components/Loader/Pulse.vue';
import  Comment  from '../../components/Comments/Comments.vue';
import { BaseUrl } from '../../config/Axios';
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// router
const route = useRoute()

// reactive states
const comment = ref('')
const hasErrors = ref(false)
const loading = ref(false)
const error=ref('')
const Thread = ref(null)

const isFollowing = ref(false)

const fetching = ref(true)

const Id = route.params.id

// vues
const store = useStore()
const {accessToken,_id} = store.getters.user



onMounted(()=>{

  fetching.value=true
   BaseUrl(`/thread/${Id}`,
   {
     headers:{
        'Authorization': `Bearer ${accessToken}`
     }
   }
   )
   .then((response)=>{
      if(response.status === 200){
        Thread.value = response.data.post
        isFollowing.value = response.data.isFollowing
        fetching.value=false
      }
   })
   .catch((err)=>{
      console.log(err)
   })
})


const handleSubmit=()=>{

    loading.value = true

    if(comment.value === ''){
            hasErrors.value =true
            error.value= "Comment cannot be empty"
            loading.value = false
            return
    }

    if(comment.value.length > 500){
        hasErrors.value =true
        error.value= "Comment has to be less than 500 characters"
        loading.value= false
        return
    }


    BaseUrl.post(`/create/${Thread.value._id}/comment`,{
        comment:comment.value,
        author:_id
    },
     {
        headers:{
            'Authorization' : `Bearer ${accessToken}`
        }
     }
    ).then((response)=>{
        if(response.status === 200){
            loading.value = false
            console.log(response.data)
            comment.value = ''

            toast.success(`${response.data.message}`,{
                position:toast.POSITION.TOP_CENTER,
                transition: toast.TRANSITIONS.SLIDE,
                theme:'colored',
                hideProgressBar:true,
                autoClose:2000
           })
        }
    })
    .catch((err)=>{
        const{response} = err

        toast.warn(`${response.data}`,{
                position:toast.POSITION.TOP_CENTER,
                transition: toast.TRANSITIONS.SLIDE,
                theme:'colored',
                hideProgressBar:true,
                autoClose:2000
        })
    })

}


const handleFollow=async()=>{
   
    BaseUrl.post('/follow',{
        theOnebeingFollowed:Thread.value.author._id
    },
     {
        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
     }
    ).then((response)=>{
        if(response.status === 200){
            toast.info(`You started following ${Thread.value.author.username}`,
             {
                position:toast.POSITION.BOTTOM_RIGHT,
                transition: toast.TRANSITIONS.SLIDE,
                theme:'colored',
                hideProgressBar:true,
                autoClose:2000,
             }
            )
        }
    }).catch((err)=>{
        const {response} = err

        if(response.status=== 500){
            toast.warn("An error occurred. Try again later",
             {
                position:toast.POSITION.BOTTOM_RIGHT,
                transition: toast.TRANSITIONS.SLIDE,
                theme:'colored',
                hideProgressBar:true,
                autoClose:2000
             }
            )
        }
        console.log(err)
    })

}

const handleUnFollow=()=>{
    BaseUrl.post('/unfollow',{
        theOnebeingUnFollowed:Thread.value.author._id
    },
     {
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
     }
    ).then((response)=>{
        if(response.status === 200){
            toast.info(`You have unfollowed ${Thread.value.author.username}`,
             {
                position:toast.POSITION.BOTTOM_RIGHT,
                transition: toast.TRANSITIONS.SLIDE,
                theme:'colored',
                hideProgressBar:true,
                autoClose:2000
             }
            )
        }
    })
    .catch((err)=>{
        const {response} = err

        if(response.status=== 500){
            toast.warn("An error occurred. Try again later",
             {
                position:toast.POSITION.BOTTOM_RIGHT,
                transition: toast.TRANSITIONS.SLIDE,
                theme:'colored',
                hideProgressBar:true,
                autoClose:2000
             }
            )
        }
        console.log(err)
    })
}
</script>
