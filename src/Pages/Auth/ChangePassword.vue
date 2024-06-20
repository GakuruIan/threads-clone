<template>
    <div class=" h-screen flex items-center justify-center flex-col">
    <img :src="logo" class="h-20 w-20 object-contain mb-4"/>
       <div v-if="!valid" class="max-w-[500px] w-full md:w-[350px] px-2 md:px-0">
          <h2 class="text-xl text-center mb-2">Invalid Token</h2>
          <p class="text-base">Your reset token is invalid or has expired. Please request a new reset link.</p>
       </div>

      <div v-else class="max-w-[500px] w-full md:w-[350px] px-2 md:px-0">
          <header class="mb-4">
            <h1 class="text-3xl mb-1 text-center">Create Password</h1>
            <h6 class="text-base text-center text-gray-400">Let's get you back to your account</h6>
          </header>

          <div class="mt-4 w-full">
            <Vueform 
              :endpoint=handleSubmit
              method="POST"
            >

                <TextElement name="password" type="text" inputType='password' size="lg" label="Password" placeholder="Password"    
                        :override-class="{
                            input:'border border-gray-100/20 w-full bg-dark-400 py-4 rounded-sm placeholder-gray-400',
                            container:'my-2',
                            inputContainer: 'border w-full transition-all',
                            inputContainer_default: 'border-gray-100/20',
                            inputContainer_focused: 'bg-dark-600 border-gray-200/20',
                            inputContainer_md: 'h-12',
                        }"
                        :rules="['required','min:8']"
                />

                <TextElement name="password_confirmation" type="text" inputType='password' size="lg" label="Confirm New Password" placeholder="Password"    
                        :override-class="{
                            input:'border border-gray-100/20 w-full bg-dark-400 py-4 rounded-sm placeholder-gray-400',
                            container:'my-2',
                            inputContainer: 'border w-full transition-all',
                            inputContainer_default: 'border-gray-100/20',
                            inputContainer_focused: 'bg-dark-600 border-gray-200/20',
                            inputContainer_md: 'h-12',
                        }"
                        :rules="['required','min:8']"
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
                 Update password
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
import { onMounted,ref } from 'vue'
import logo  from '../../assets/logo.png'
// router
import { useRoute,useRouter } from 'vue-router';
// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// axios
import { BaseUrl } from '../../config/Axios';

const route =useRoute()
const router = useRouter()

const valid = ref(null)
const email = ref(null)

onMounted(async()=>{
  let response
  try {
    response = await BaseUrl.get(`/verify-reset-token`,{
      params:{
        token:route.query.token
      }
    })

   if(response.status === 200){
     valid.value = response.data.valid
     email.value = response.data.email
     console.log(response.data);
   }
  } catch (error) {
    console.log(error);
  }
 
})

const handleSubmit=async(FormData,form$)=>{
  form$.submitting = true

  const requestData = form$.requestData

  form$.cancelToken  = form$.$vueform.services.axios.CancelToken.source()

  let id
  let response

  try {
    id = toast.loading("Updating password..",{
       position:toast.POSITION.TOP_CENTER,
       theme:'colored',
       type:'info'
     })


     response=await BaseUrl.put('/change-password',{
       password:requestData.password,
       email:email.value
     })

     if(response.status === 200){

      console.log("success");

        toast.update(id,{
         render:"Password updated successfully",
         autoClose:true,
         theme:'colored',
         type:'success',
         position:toast.POSITION.TOP_CENTER
        })

        router.replace('/login')
     }
   
  } catch (error) {
      const {response} = error

      if(response.status === 500){

        toast.update(id,{
         render:"Something went wrong",
         autoClose:true,
         theme:'colored',
         type:'error',
         position:toast.POSITION.TOP_CENTER
        })

      }
  }
  finally{
    form$.submitting = false

    setTimeout(()=>{
      toast.remove(id)
    },2500)
  }

}

</script>
