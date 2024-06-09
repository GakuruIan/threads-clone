<template>
    <div class="bg-dark-300 py-2 rounded-sm mb-4">

        <!-- modal -->
                <div id="popup-modal" tabindex="-1" :class="[isModalOpen ? '':'hidden']" class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-light-200 backdrop-blur-sm  max-h-full">
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative rounded-lg shadow bg-dark-600">
                            <button type="button" @click="handleModal(false)" class="absolute top-3 end-2.5 text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-light-100 hover:text-white" data-modal-hide="popup-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-4 md:p-5 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 class="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this Account?</h3>
                                <h6 class="text-sm text-gray-400 mb-5">This action cannot be reversed</h6>
                                <button @click="handleDelete" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-500   0 font-medium rounded-md text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button @click="handleModal(false)" data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium border border-white rounded-md hover:bg-white duration-700 hover:text-dark-200">No, cancel</button>
                            </div>
                        </div>
                    </div>
            </div>
        <!-- modal -->

        <div class="px-4">
            <h1 class="text-2xl">Settings</h1>

            <div class="my-4">
                <h2 class="text-base">Profile Information</h2>
                <div class="">
                    <Vueform :endpoint=handleSubmit method="POST">

                            <TextElement name="email" :default="user?.email" :debounce=1000 size="lg" label="Email" placeholder="Enter new email" 
                                :add-class="{input: 'bg-light-200 ',inputContainer:'bg-red-200'}" 
                                :override-class="{
                                    container:'my-2',
                                    inputContainer: 'border w-full transition-all',
                                    inputContainer_default: 'border-gray-300/20',
                                    inputContainer_focused: 'border-gray-200/50 bg-light-100',
                                    inputContainer_md: 'h-12',
                                    }"
                                :rules="['required','email']"
                             />

                            <TextElement name="username" :default="user?.username" size="lg" label="Username" placeholder="Enter username" 
                                    :add-class="{input: 'bg-light-200 '}" 
                                    :override-class="{
                                        container:'my-2',
                                        inputContainer: 'border w-full transition-all',
                                        inputContainer_default: 'border-gray-200/50',
                                        inputContainer_focused: 'border-gray-300/20',
                                        inputContainer_md: 'h-12',
                                        }"
                                        rules="required|max:20"
                            />

                                
                                <TextareaElement name="bio" :default="user?.bio" :rows=5 label="Bio" placeholder="create Bio"
                                    :add-class="{input: 'bg-light-200 '}" 
                                    :override-class="{
                                        container:'my-2',
                                        inputContainer: 'border w-full transition-all',
                                        inputContainer_default: 'border-gray-200/50',
                                        inputContainer_focused: 'border-gray-300/20',
                                        }"
                                        rules="required|max:256"
                                />

                                <StaticElement name="static" add-class="">  
                                    <span>Current image</span>
                                    <div class="py-2 my-2">
                                    <img :src="user?.avatar.url" alt="" class="h-14 w-14 rounded-full object-fit"/>
                                    </div>
                                </StaticElement>

                                <FileElement  
                                    name="avatar" 
                                    label="Change Profile Image"  
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
                                    Update
                                </ButtonElement>
                            
                            </Vueform>
                </div>
            </div>

            <div class="">
                <h2 class="text-base my-2">Account Information</h2>

                <div class="py-2 mt-4">
                   
                    <Vueform >
                       <ToggleElement text="Make Account Private" :labels="{ on: 'Private', off: 'Public' }"  />
                    </Vueform>
                </div>
                
               <div class="py-4 mt-4">
                 <h2 class="text-base my-2">Danger Zone</h2>

                 <button @click="handleModal(true)" class="w-full bg-red-600 py-2 mb-1 px-4 rounded-sm hover:bg-red-500">Delete Account</button>

                 <span class="text-gray-400 text-sm ">This action is cannot be undone</span>
               </div>
            </div>
        </div>
    </div>
  
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { BaseUrl } from "../../config/Axios";

// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";

const store = useStore()

const user = ref(null)
const accessToken =ref(null)
const isModalOpen = ref(false)
const router = useRouter()

let isLoading = ref(false)
user.value = store.getters.user


const handleSubmit=async(formData,form$)=>{
    let formdata = new FormData()

    isLoading.value= true
    const requestData = form$.requestData
    accessToken.value = user.value.accessToken
 
    form$.cancelToken  = form$.$vueform.services.axios.CancelToken.source()
    let response;
    let id;

    try {
        // toast to indicate loading
      id = toast.loading("Updating profile...",{
        position:toast.POSITION.TOP_CENTER,
        transition: toast.TRANSITIONS.SLIDE,
        theme:'colored',
        type:'info'
      })
    
    requestData.currentImage = user.value.avatar

    response = await BaseUrl.put('/update',requestData,
     {
        headers:{
            'Authorization':`Bearer ${user.value.accessToken}`,
            'Content-Type': 'multipart/form-data'
        },
        cancelToken: form$.cancelToken.token
     }
    )

    if(response.status === 200){
       
        const newUser = {
            ...response.data.user,
            accessToken
        }

        store.dispatch('setUser',newUser)

        toast.update(id,{
         render:"Profile Updated successfully",
         autoClose:2000,
         hideProgressBar: true,
         theme:'colored',
         type:'success',
         position:toast.POSITION.TOP_CENTER
        })
      
      toast.done(id);


    }
        
    } catch (error) {
        const {response} = error
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
  }

}

const handleModal=(state)=>{
    isModalOpen.value = state
}

const handleDelete=async()=>{
    let response;
    let id;

    // loading toast
    id = toast.loading("Deleting Account...",{
        position:toast.POSITION.TOP_CENTER,
        transition: toast.TRANSITIONS.SLIDE,
        theme:'colored',
        type:'info'
      })

    try {
       response = await BaseUrl.delete('/delete/user',{
            headers:{
                'Authorization': `Bearer ${user.value.accessToken}`
            }
        })

        if(response.status === 200){
            isModalOpen.value= false
            store.dispatch('clearUser',user)
            router.replace('/login')
        }

    } catch (error) {
        const {response} = error

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
        toast.done(id)

        setTimeout(()=>{
        toast.remove(id)
        },3000)
    }
}

</script>