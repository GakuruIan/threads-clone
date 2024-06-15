<template>
  <div v-if="isMobile" class="fixed bottom-0 h-16 w-full bg-dark-300 flex items-cente">
    <div class="flex items-center justify-between w-full px-6 md:px-2 lg:px-0">

       <router-link to="/">
        <v-icon name="ri-home-line" scale="1.2" class="hover:cursor-pointer"/>
       </router-link>

       <router-link to="/search">
        <v-icon name="ri-search-eye-line" scale="1.2" class="hover:cursor-pointer"/>
      </router-link>

      <router-link to="/create-thread">
        <v-icon name="md-addaphoto-outlined" scale="1.1"/>
      </router-link>

      <router-link to="/notifications">
        <v-icon name="ri-notification-4-line" scale="1.2" class="hover:cursor-pointer" />
      </router-link>

      <router-link :to="`/@${User?.username}`">
        <v-icon name="co-user" scale="1.2" class="hover:cursor-pointer"/>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useStore } from "vuex";

const store=useStore()

let isMobile = ref(false)
let isDesktopView = ref(0)
const User = ref(null)



const handleResize=(e)=>{
    if(e.currentTarget.innerWidth >= 768){
        isMobile.value = false
    }
    else{
        isMobile.value=true
    }
   
}
onMounted(()=>{  
  User.value = store.getters.user

  isDesktopView.value = window.innerWidth
  if(isDesktopView.value >= 768){
    isMobile.value = false
  }
  else{
     isMobile.value = true
  }
  window.addEventListener('resize',handleResize)
})

onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      
});


</script>

