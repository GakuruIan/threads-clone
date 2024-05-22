<template>
  <div v-if="isMobile" class="fixed bottom-0 h-16 w-full bg-dark-300 flex items-cente">
    <div class="flex items-center justify-between w-full px-6 md:px-2 lg:px-0">
        <v-icon name="ri-home-line" scale="1.2" class="hover:cursor-pointer"/>
        <v-icon name="ri-search-eye-line" scale="1.2" class="hover:cursor-pointer"/>
        <v-icon name="md-addaphoto-outlined" scale="1.1"/>
        <v-icon name="ri-notification-4-line" scale="1.2" class="hover:cursor-pointer" />
        <v-icon name="co-user" scale="1.2" class="hover:cursor-pointer"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";


let isMobile = ref(false)
let isDesktopView = ref(0)



const handleResize=(e)=>{
    if(e.currentTarget.innerWidth >= 768){
        isMobile.value = false
    }
    else{
        isMobile.value=true
    }
   
}
onMounted(()=>{  
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

