<template>
      <div class=" h-screen flex items-center justify-center flex-col">
      <img :src="logo" class="h-20 w-20 object-contain mb-4"/>
    <div class="max-w-[500px] w-full md:w-[350px] px-2 md:px-0">
        <header class="mb-4">
          <h1 class="text-3xl mb-1 text-center">Account Recovery</h1>
          <h6 class="text-base text-center text-gray-400">Let's get you back to your account</h6>
        </header>

        <div class="mt-4 w-full">
           <Vueform 
            :endpoint=handleSubmit
             method="POST"
           >
             <TextElement name="email" size="lg" label="Email" placeholder="Enter your email" 
                :add-class="{input: 'bg-light-200 '}" 
                :override-class="{
                    input:'w-full border border-white/50 bg-dark-400 rounded-sm placeholder-gray-400',
                    container:'my-2',
                    inputContainer: 'border w-full transition-none',
                    inputContainer_default: 'border border-white/50',
                    inputContainer_focused: 'bg-light-200 border border-white',
                    inputContainer_md: 'h-12',
                    }"
                    :rules="['required','email']"
             />    

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
                Send Reset Link
             </ButtonElement>

           </Vueform>
           
          <div class="mt-2">
            <router-link to="/login" class="text-gray-400 mt-4 hover:text-gray-200">
                Get into your account, Login
            </router-link>
          </div>
        </div>
    </div>   
  </div>
</template>
<script setup>
import { ref } from 'vue';
import logo from '../../assets/logo.png'

// axios
import { BaseUrl } from '../../config/Axios';

// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const isLoading = ref(false)


const handleSubmit=async(FormData,form$)=>{
    isLoading.value = true

    const requestData = form$.requestData
 
    form$.cancelToken  = form$.$vueform.services.axios.CancelToken.source()
    let response;
    let id;

    try {

      id = toast.loading("Submitting..",{
        position:toast.POSITION.TOP_CENTER,
        transition: toast.TRANSITIONS.SLIDE,
        theme:'colored',
        type:'info'
      })

       response = await BaseUrl.post('/reset-link',requestData,
       {
        cancelToken: form$.cancelToken.token,
       })

       if(response.status === 200){
          toast.update(id,{
          render:`${response.data.message}`,
          autoClose:2000,
          hideProgressBar: true,
          theme:'colored',
          type:'success',
          position:toast.POSITION.TOP_CENTER
          })
      
         toast.done(id);

        //  route to the create password
       }

    } catch (error) {
      const {response} = error

      if(response.status === 404){

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


    }
    finally{
      isLoading.value= false
      toast.done(id)

      setTimeout(()=>{
        toast.remove(id)
      },3000)

    }
}

</script>
