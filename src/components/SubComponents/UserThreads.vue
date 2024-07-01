<template>
    <div class="relative  px-2 mb-14 md:mb-0 py-2 ">
        <div v-if="isEmpty" class="h-96 w-full px-2 py-4 flex items-center justify-center">
           <p class="text-base text-gray-400">No Threads posted !</p>
        </div>
         
        <div v-else>
          <template v-for="thread in Threads" :key="thread._id">
              <PostCard :Thread="thread" :Author="author"/>
           </template>
        </div>
    </div>
</template>


<script setup>
// components
import PostCard from '../PostCard/PostCard.vue';

// axios
import { BaseUrl } from '../../config/Axios';

// vue
import { onMounted,reactive,ref,computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute} from 'vue-router';

// socket IO
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const router= useRoute()

const username= router.params.username

// vuex
const store= useStore()

const author = ref(null)

const ThreadsMap = reactive(new Map())
const isEmpty = ref(false)

const {accessToken,_id} = store.getters.user

const FetchUserThreads=()=>{
   BaseUrl.get(`/user/${username}/threads`,
   {
        headers:{
          'Authorization': `Bearer ${accessToken}`
        }
      }
   ).then((response)=>{
      const {data,status} = response
       if(status == 200){
          if(data.posts.length === 0){
            isEmpty.value= true 
          }

          author.value = data.author

          data.posts.forEach(post => {
            ThreadsMap.set(post._id,post)
          });
        
          console.log(ThreadsMap);
       }
   })
   .catch((err)=>{
      console.log(err)
   })

}

const Threads = computed(() => Array.from(ThreadsMap.values()));



onMounted(()=>{
    FetchUserThreads()

    

    
    socket.on('postLiked', (data) => {
        const post =  ThreadsMap.get(data.postId);
        if (post) {
          post.likesCount = data.likesCount;
          if (data.currentUser === _id) {
            post.isLikedByCurrentUser = data.isLikedByCurrentUser; 
          }
          
        }
   });

   socket.on('postUnliked', (data) => {
        const post =  ThreadsMap.get(data.postId);
        if (post) {
          post.likesCount = data.likesCount;
          if (data.currentUser === _id) {
            post.isLikedByCurrentUser = data.isLikedByCurrentUser; 
          }
          
        }
   });
})

</script>