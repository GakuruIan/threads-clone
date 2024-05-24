<template>
    <!-- post bar -->
    <div class="bg-dark-300 py-2 rounded-sm mb-4">
        <div class="px-4">
            <h6 class="text-xl mb-2">Find Someone</h6>

            <Vueform :endpoint="handleSubmit"  method="POST">
                <TextElement 
                    name="search" 
                    placeholder="Search"
                    autocomplete="off"
                    :override-class="{
                            input:'w-full bg-light-200 h-12 rounded-sm placeholder-gray-400',
                            container:'my-2',
                            inputContainer: 'border-0 w-full py-4 transition-all',
                            inputContainer_default: 'border-0',
                            inputContainer_focused: '',
                        }"
                    rules="required|max:500"
                    :messages="{ required: 'Please fill in the Search' }"
                />

                  <ButtonElement name="button" 
                    button-class="w-28 mt-4 mb-4 flex items-center justify-center gap-x-2 bg-white hover:bg-white/95 transform-none hover:transform-none my-2 bg-white-400"  
                    :submits="true"
                    :override-class="{
                        button_primary:'bg-white text-gray-700 font-medium'
                    }"
                    
                  >
                    Find
                    <v-icon name="bi-search"/>
                 </ButtonElement>

            </Vueform>
            
        </div>

    </div>

    <div class="mt-6 h-[calc(100vh-300px)] bg-dark-300 w-full" v-if="loading">
        <Spinner/>
    </div>

    <div class="bg-dark-300 w-full py-2 rounded-sm" v-else>

        <div class="h-96 w-full flex items-center justify-center" v-if="!isEmpty">
                Search results will appear here.
        </div>

        <div class="h-96 w-full flex items-center justify-center" v-else>
            No user found
        </div>

        <div class="py-2" v-for="user in Users" :key="user._id">
            <div class="flex items-center justify-between py-2 ">
                    <div class="flex items-center gap-x-2">
                        <img class="w-10 h-10 rounded-full" :src="user?.avatar.url" alt="user photo" />
    
                        <div class="flex flex-col">
                            <router-link :to="`@${user?.username}`" class="border-transparent text-gray-200 text-base md:text-base tracking-normal font-thin">{{ user.username }}</router-link>
                            <span class="text-xs font-normal text-gray-400">2 hours ago</span>
                        </div>
                    </div>
                  <button class="px-4 py-1 rounded-md tracking-wide bg-none border border-white text-white transition-all duration-75 hover:bg-white hover:text-gray-700 hover:font-semibold">Follow</button>
             </div> 
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Spinner from '../../components/Loader/Spinner.vue'

import { BaseUrl } from '../../config/Axios';
import { useStore } from 'vuex';

const isEmpty = ref(false)
const loading = ref(false)
const Users = ref([])

const store = useStore()

const token = store.getters.user.accessToken

const handleSubmit=async(FormData,form$)=>{
    loading.value = true
    const requestData = form$.requestData
    form$.cancelToken  = form$.$vueform.services.axios.CancelToken.source()

     BaseUrl.post('/search',{
        ...requestData
    },
    {
        cancelToken: form$.cancelToken.token,
        headers:{
            'Authorization':`Bearer ${token}`
       }  
    }
    ).then((response)=>{
        if(response.status === 200){
            if(response.data.length === 0){
                isEmpty.value = true
                loading.value=  false
            }
            else{
                isEmpty.value= false
                loading.value=  false
                Users.value= response.data
            }
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}
</script>