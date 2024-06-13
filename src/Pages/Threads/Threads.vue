<template>
  <div>
    <!-- post bar -->
    <div class="bg-dark-300 py-2 rounded-sm mb-4">
        <div class="px-4">
            <h6 class="text-xl mb-2">Share your thought</h6>

            <Vueform :endpoint="handleSubmit"  method="POST">
                <TextareaElement 
                    name="caption" 
                    description="Caption should not exceed 500 words"
                    :autogrow="true" 
                    :rows="4"
                    placeholder="Type here"
                    :override-class="{
                            input:'w-full bg-dark-600 py-4 rounded-sm placeholder-gray-400',
                            container:'my-2',
                            inputContainer: 'border-0 w-full transition-all',
                            inputContainer_default: '',
                            inputContainer_focused: '',
                        }"
                    rules="required|max:500"
                    :messages="{ required: 'Please fill in the caption' }"
                />

                <StaticElement name="static" add-class=" w-full text-white">  
                    <router-link to="/create-thread" >
                            <v-icon name="md-addaphoto-outlined" scale="1.1" class="text-white"/>
                    </router-link>
                  </StaticElement>

                  <ButtonElement name="button" 
                    button-class="w-28 flex items-center justify-center gap-x-2 bg-white hover:bg-white/95 transform-none hover:transform-none my-2 bg-white-400"  
                    :submits="true"
                    :override-class="{
                        button_primary:'bg-white text-gray-700 font-medium'
                    }"
                    
                  >
                     Post
                    <v-icon name="md-send-sharp"/>
                 </ButtonElement>

            </Vueform>
            
        </div>

    </div>
    <!-- postbar -->

    <div class="" v-if="loading">
       <Pulse :count="4"/>
    </div>

    <div class="" v-else >
      <template v-for="thread in Threads" :key="thread._id">
        <PostCard :Thread="thread" :User="thread.author"/>
      </template>
      <div class="" ref="observerRef" id="observer"></div>
    </div>

  </div>
</template>

<script setup>
import PostCard from '../../components/PostCard/PostCard.vue'
import Pulse from '../../components/Loader/Pulse.vue';

// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// axios
import { BaseUrl } from '../../config/Axios';

// vuex
import { useStore } from 'vuex';
import { ref,onMounted,onUnmounted } from 'vue';

const store = useStore()
const user = ref(null)
const lastScrollTop = ref(0);
const observerRef = ref(null);
const pages = ref(1);
const totalPages = ref(0)
const loading = ref(false)
let Threads= ref([])

const limit=15

const FetchThreads =()=>{
  // add authorization token {bearer token}
   BaseUrl.get('/threads',{
    params:{
      page:pages.value,
      limit:limit
    },
    headers:{
      Authorization :`Bearer ${user.value.accessToken}`
    }
   }).then((response)=>{
       loading.value=true
       if(response.status==200 & response.statusText == 'OK'){
           
        if(totalPages.value && pages.value > totalPages.value) return;

          Threads.value = [...Threads.value,...response.data.posts]
          totalPages.value = response.data.totalPages

          pages.value += 1
       }
   }).catch((err)=>{
       console.log(err)
   })
   .finally(()=>{
     loading.value=false
   })
}

const handleScroll=()=>{
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isScrollingDown = scrollTop > lastScrollTop.value;
      lastScrollTop.value = scrollTop;

      if (isScrollingDown && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !loading.value) {
       FetchThreads();
      }
}

onMounted(()=>{{
  user.value = store.getters.user

  window.addEventListener('scroll',handleScroll)
  FetchThreads()
}})

onUnmounted(() => {
window.removeEventListener('scroll',handleScroll)
});


const handleSubmit=async(formData,form$)=>{
    const requestData = form$.requestData

    form$.cancelToken  = form$.$vueform.services.axios.CancelToken.source()
    let id, response
    
    try {
    id = toast.loading("Posting Thread",{
       position:toast.POSITION.TOP_CENTER,
       theme:'colored',
       type:'info'
     })

     response= await BaseUrl.post(
      '/create/thread',
      {
         author:user.value._id,
         ...requestData,
      },
      {
        cancelToken: form$.cancelToken.token,
      }
    )    

    if(response.status === 200){
      setTimeout(()=>{
        toast.update(id,{
         render:"Thread Created Successfully",
         autoClose:true,
         theme:'colored',
         type:'success',
         position:toast.POSITION.TOP_CENTER,
         hideProgressBar:true
        })

      },1800)
      
      toast.done(id);
    }
   
  } catch (error) {
      
        toast.update(id,{
          render:`${error.message}`,
          type:'error',
          theme:'colored',
          autoClose:2000,
          hideProgressBar:true
        }) 

      console.log(error)
  }
  finally{
    setTimeout(()=>{
      toast.remove(id)
    },3000)

    form$.reset()
  }
}



</script>


