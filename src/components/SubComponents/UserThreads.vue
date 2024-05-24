<template>
    <div class="relative  px-2 mb-14 md:mb-0 py-2 ">
        <template v-for="thread in data?.posts" :key="thread._id">
            <PostCard :Thread="thread" :User="data?.author"/>
         </template>
    </div>
</template>


<script setup>
// components
import PostCard from '../PostCard/PostCard.vue';

// axios
import { BaseUrl } from '../../config/Axios';

// vue
import { onMounted,ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute} from 'vue-router';

const router= useRoute()

const username= router.params.username

// vuex
const store= useStore()

const data = ref(null)

const token = store.getters.user.accessToken

const FetchUserThreads=()=>{
   BaseUrl.get(`/user/${username}/threads`,
   {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      }
   ).then((response)=>{
       if(response.status == 200){
         data.value= response.data
        console.log(response.data)
       }
   })
   .catch((err)=>{
      console.log(err)
   })

}

onMounted(()=>{
    FetchUserThreads()
})

</script>