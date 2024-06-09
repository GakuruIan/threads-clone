<template>
  <div class=" h-screen flex items-center justify-center flex-col">
      <img :src="logo" class="h-20 w-20 object-contain mb-4"/>
    <div class="max-w-[500px] w-[350px] ">
        <header class="mb-4">
          <h1 class="text-3xl mb-1 text-center">Welcome to Threads</h1>
          <h6 class="text-base text-center text-gray-400">Login into account</h6>
        </header>

        <div class="mt-4 w-full">
            <Button class="flex items-center py-3 my-6 justify-center border border-gray-400/20 w-full rounded-sm gap-x-2 text-gray-400 hover:bg-gray-500/20">
             <v-icon name="fc-google" scale="1.2"/>
             Sign In With Google
           </Button>

           <div class="inline-flex items-center justify-center w-full">
                <hr class="w-full h-px my-6 border-0 bg-light-100">
                <span class="absolute px-3 font-medium text-gray-300 -translate-x-1/2  left-1/2  bg-dark-400">or</span>
            </div>

           <Vueform 
            :endpoint=handleSubmit
             method="POST"
           >
             <TextElement name="username" size="lg" label="Username" placeholder="Enter username" 

                :override-class="{
                        input:'border border-gray-100/20 w-full bg-dark-400 py-4 rounded-sm placeholder-gray-400',
                        container:'my-2',
                        inputContainer: 'border w-full transition-all',
                        inputContainer_default: 'border-gray-100/20',
                        inputContainer_focused: 'bg-dark-600 border-gray-200/20',
                        inputContainer_md: 'h-12',
                    }"
             />
             <TextElement name="password" type="text" inputType='password' size="lg" label="Password" placeholder="Password" 
                
                  :override-class="{
                      input:'border border-gray-100/20 w-full bg-dark-400 py-4 rounded-sm placeholder-gray-400',
                      container:'my-2',
                      inputContainer: 'border w-full transition-all',
                      inputContainer_default: 'border-gray-100/20',
                      inputContainer_focused: 'bg-dark-600 border-gray-200/20',
                      inputContainer_md: 'h-12',
                    }"
             />

             
             <StaticElement name="static" add-class="flex items-center justify-end w-full">  
               <router-link to="/forgot-password" class="group">
                  <p class="text-sm text-gray-400 group-hover:text-gray-300">Forgot password</p>
                </router-link>
             </StaticElement>
           

             <ButtonElement name="button" 
              button-class="w-full transform-none hover:transform-none my-2 bg-white-400" 
              :loading="isLoading" 
              :submits="true"
              :remove-classes="{
                wrapper: {
                    classname: ['transform-transition']
                    }
                }"
              >
                Sign In
             </ButtonElement>

           </Vueform>
           
          <div class="mt-2">
            <router-link to="/register" class="text-gray-300 mt-4 hover:text-gray-200">
                Don't have an account? Register
            </router-link>
          </div>
        </div>
    </div>   
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import logo from '../../assets/logo.png'
// routing
import { BaseUrl } from '../../config/Axios';
import { useRouter } from 'vue-router'
// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
// vuex
import { useStore } from 'vuex';

const router = useRouter()
const store =useStore()

let isLoading =ref(false)

onMounted(()=>{
  const isLoggedIn = store.getters.isLoggedIn

  if(isLoggedIn){
    router.push('/')
  }
  
})

const handleSubmit=async(FormData,form$)=>{
  isLoading.value= true
  const requestData = form$.requestData
 
  form$.cancelToken  = form$.$vueform.services.axios.CancelToken.source()
  let response;
  let id;

  
  try {
    // toast to indicate loading
      id = toast.loading("Logging in..",{
        position:toast.POSITION.TOP_CENTER,
        transition: toast.TRANSITIONS.SLIDE,
        theme:'colored',
        type:'info'
      })

    response = await BaseUrl.post('/login',requestData,{cancelToken: form$.cancelToken.token})

    if(response.status === 200){
  
        toast.update(id,{
         render:"Login successfully",
         autoClose:2000,
         hideProgressBar: true,
         theme:'colored',
         type:'success',
         position:toast.POSITION.TOP_CENTER
        })
      
      toast.done(id);
      
      store.dispatch('setUser',response.data)
      store.dispatch('setSuccessLogin',true)

      router.push('/')
    }
 
  } catch (error) {
   
    const {response} = error

    if(response.status === 401){

    toast.update(id,{
      render:response.data.message,
      type:'error',
      theme:'colored',
      autoClose:2000,
      hideProgressBar:true
    })

   
    toast.done(id)
    }
    
    if(response.status === 500){
        toast.update(id,{
        render:"Something went wrong. Try Again later",
        type:'error',
        theme:'colored',
        autoClose:2000,
        hideProgressBar:true
      })

    }
    
    console.log(error)
  }
  finally{
    isLoading.value= false
    toast.done(id)

    setTimeout(()=>{
      toast.remove(id)
    },3000)

    form$.reset()
  }
}

</script>

