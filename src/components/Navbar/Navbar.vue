<template>
   <div class="fixed top-0 z-20 h-16 w-full bg-dark-300 flex items-center">
       <div class="flex items-center justify-between w-full md:max-w-5xl md:mx-auto px-2 mx-1 md:px-2 lg:px-0">
         <h1 class="text-xl md:text-2xl">Threads</h1>

         <!-- logo -->
          <div class="">
            <!-- !! remove this link -->
            <router-link to="/" >
              <img :src="logo" alt="logo" class="h-10 w-10 object-fit">
            </router-link>
          </div>
          <!-- logo -->

          <!-- icons -->
          <div class="flex items-center gap-x-6">
            <div class="md:flex items-center gap-x-6 hidden">
                 <router-link to="/">
                   <v-icon name="ri-home-line" scale="1.2" class="hover:cursor-pointer"/>
                 </router-link>
                 
                 <router-link to="/create-thread" >
                    <v-icon name="md-addaphoto-outlined" scale="1.1"/>
                 </router-link>

                 <router-link to="/search" >
                   <v-icon name="ri-search-eye-line" scale="1.2" class="hover:cursor-pointer"/>
                 </router-link>

                 <router-link to="/notifications">
                   <v-icon name="ri-notification-4-line" scale="1.2" class="hover:cursor-pointer" />
                 </router-link>
                 
            </div>
            
            <div class="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                <button @click="handleOpenMenu" type="button" class="flex text-sm  rounded-full md:me-0 outline-0 border-2 border-bubble " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                  
                  <img class="w-8 h-8 rounded-full" v-if="User?.avatar.url" :src="User?.avatar.url" alt="user photo" />
                  
                  <img class="w-8 h-8 rounded-full" v-else :src="blank" alt="user photo" />
                </button>

                 <!-- Dropdown menu -->
                  <div v-if="isOpen" class="absolute top-10 right-0 w-32 lg:block z-50  my-4 text-base list-none bg-dark-900  rounded-lg shadow  transition-all duration-300 ease-in" id="user-dropdown">
                          <div>
                            <button class="absolute right-2" @click="handleOpenMenu">
                               <v-icon name="io-close" class="h-4 w-4 hover:cursor-pointer "/>
                             </button>
                          </div>

                           <div class="px-4 py-3 border-b border-gray-600">
                            <span class="block text-sm  text-white">{{ User?.username }}</span>
                          </div>
                          <ul class="py-2" aria-labelledby="user-menu-button">
                            <li>
                              <router-link :to="`/@${User?.username}`" class="block px-4 py-2 text-sm hover:bg-light-100 hover:text-white">Profile</router-link>
                            </li>
                            <li>
                              <router-link :to="`/@${User?.username}/settings`" class="block px-4 py-2 text-sm hover:bg-light-100 hover:text-white">Settings</router-link>
                            </li>
                            <li @click="handleLogout">
                              <a href="#" class="block px-4 py-2 text-sm hover:bg-light-100 hover:text-white">Sign out</a>
                            </li>
                          </ul>
                    </div>
                        
            </div>
          </div>
       </div>
   </div>
</template>

<script setup>
import logo from  '../../assets/logo.png'
import blank from '../../assets/blank.png'

import {onMounted, ref} from 'vue'

// vuex
import { useStore } from 'vuex';
import { useRouter} from 'vue-router';
import { BaseUrl } from '../../config/Axios';

let isOpen = ref(false)
let User = ref(null)

const store = useStore()
const router = useRouter()

onMounted(()=>{
   User.value = store.getters.user
})

const handleOpenMenu=()=>{

  if(!isOpen.value){
    isOpen.value = true 
  }
  else{
    isOpen.value =false
  }

}

const handleLogout=()=>{
   
   BaseUrl.post('/logout')
    .then((response)=>{
       if(response.status === 200){
        const User =store.getters.user
        store.dispatch('clearUser',User)

        router.push('/login')
       }
    })
    .catch((err)=>{
       const {response} = err
       console.log(response.data.message)
    })
 
   
  
}

</script>


