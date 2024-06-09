<template>
    <div class=" h-screen flex items-center justify-center flex-col">
      <img :src="logo" class="h-20 w-20 object-contain mb-4"/>
    <div class="max-w-[500px] w-[350px] ">
        <header class="mb-4">
          <h1 class="text-3xl mb-1 text-center">Create an Account</h1>
          <h6 class="text-base text-center text-gray-400">Unleash Your Social Potential.</h6>
        </header>
        <div class="mt-4 w-full">

             <Vueform validate-on="change|step" :endpoint=handleSubmit
              method="POST"
              >
                 <template #empty>
                    <FormErrors v-if="hasErrors" />

                        <FormSteps view="tabs">

                            <FormStep
                            
                                name="account"
                                :elements="['email', 'password','password_confirmation']"
                            >
                                Account
                            </FormStep>

                            <FormStep
                            name="profile"
                            :elements="['username','bio','avatar']"
                            >
                            Profile
                            </FormStep>
                        </FormSteps>

                        <FormElements>
                            <TextElement name="email" :debounce=1000 size="lg" label="Email" placeholder="Enter username" 
                               
                                :override-class="{
                                    input:'border border-gray-100/20 w-full bg-dark-400 py-4 rounded-sm placeholder-gray-400',
                                    container:'my-2',
                                    inputContainer: 'border w-full transition-all',
                                    inputContainer_default: 'border-gray-100/20',
                                    inputContainer_focused: 'bg-dark-600 border-gray-200/20',
                                    inputContainer_md: 'h-12',
                                    }"
                                :rules="['required','email']"
                             />

                             <TextElement name="password" type="text" inputType='password' size="lg" label="Password" placeholder="Create Password" 
                    
                                :override-class="{
                                    input:'border border-gray-100/20 w-full bg-dark-400 py-4 rounded-sm placeholder-gray-400',
                                    container:'my-2',
                                    inputContainer: 'border w-full transition-all',
                                    inputContainer_default: 'border-gray-100/20',
                                    inputContainer_focused: 'bg-dark-600 border-gray-200/20',
                                    inputContainer_md: 'h-12',
                                    }"
                             />


                             <TextElement name="password_confirmation" :submit="false" type="text" inputType='password' size="lg" label="Confirm Password" placeholder="confirm Password" 
                                  
                               :override-class="{
                                    input:'border border-gray-100/20 w-full bg-dark-400 py-4 rounded-sm placeholder-gray-400',
                                    container:'my-2',
                                    inputContainer: 'border w-full transition-all',
                                    inputContainer_default: 'border-gray-100/20',
                                    inputContainer_focused: 'bg-dark-600 border-gray-200/20',
                                    inputContainer_md: 'h-12',
                                }"
                                    rules="required"
                             />


                             <TextElement name="username" size="lg" label="Username" placeholder="Enter username" 
                                   
                                :override-class="{
                                    input:'border border-gray-100/20 w-full bg-dark-400 py-4 rounded-sm placeholder-gray-400',
                                    container:'my-2',
                                    inputContainer: 'border w-full transition-all',
                                    inputContainer_default: 'border-gray-100/20',
                                    inputContainer_focused: 'bg-dark-600 border-gray-200/20',
                                    inputContainer_md: 'h-12',
                                    }"
                                         rules="required|max:20"
                             />

                                
                                <TextareaElement name="bio" :rows=5 label="Bio" placeholder="create Bio"
                                   
                                 :override-class="{
                                    input:'border border-gray-100/20 border-gray-100/20 w-full bg-dark-400  rounded-sm placeholder-gray-400',
                                    container:'my-2',
                                    inputContainer: '  border w-full transition-all',
                                    inputContainer_default: 'border border-gray-100/20',
                                    inputContainer_focused: 'border-gray-200/20',
                                    
                                    }"
                                        rules="required|max:256"
                                />

                                <FileElement  
                                  name="avatar" 
                                  label="Profile Image"  
                                  :clickable="true" 
                                  :auto="false"
                                  accept=".jpg,.png,.jpeg" 
                                  view="image" 
                                  :upload-temp-endpoint="false"
                                  :rules="[
                                    'max:5120'
                                  ]"
                                   :override-class="{
                                        container:'my-2 transform-none hover:transform-none', 
                                        button:' hover:transform-none'
                                        }"
                                />

                        </FormElements>

                        <div class="flex items-center justify-between mt-6">
                            <FormStepsControl type="previous" />
                            <FormStepsControl type="next" />
                            <FormStepsControl type="finish" :reset="true"/>
                        </div>

               </template>
        </Vueform>
  
        </div>
    </div>
  </div>
</template>

<script setup>
import logo from '../../assets/logo.png'
import {BaseUrl} from '../../config/Axios'
// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
// ref
import { ref } from 'vue';

import { useRouter } from 'vue-router'

const router = useRouter()

const autoClose =ref(true)

// submitting function
const handleSubmit =async(FormData,form$)=>{
form$.submitting = true

const requestData = form$.requestData

form$.cancelToken  = form$.$vueform.services.axios.CancelToken.source()

let id
let response
  try {
    autoClose.value = false

    id = toast.loading("Creating account",{
       position:toast.POSITION.TOP_CENTER,
       theme:'colored',
       type:'info'
     })
   

    response= await BaseUrl.post(
      '/register',
      requestData,
      {
        cancelToken: form$.cancelToken.token,
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      }
    )    
   
    if(response.status === 200){

      setTimeout(()=>{
        toast.update(id,{
         render:"Account created successfully",
         autoClose:true,
         theme:'colored',
         type:'success',
         position:toast.POSITION.TOP_CENTER
        })

      },2000)
      
      toast.done(id);

      router.push('/login')
    }
  
  }
  catch (error) {
    console.log(error)
  }
  finally{
      form$.submitting = false
      autoClose.value = false

    setTimeout(()=>{
      toast.remove(id)
    },2500)
  }
}


</script>

