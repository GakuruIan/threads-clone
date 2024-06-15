<template>
  <Navbar/>
   <div class="mt-20 w-full md:max-w-2xl px-2 mx-auto">
    <router-view name="content"></router-view>
   </div>
   <BottomNav/>
</template>

<script setup>
import Navbar from '../../components/Navbar/Navbar.vue';
import BottomNav from '../../components/BottomNav/BottomNav.vue';
import { useStore } from 'vuex';
import { onMounted } from 'vue';
// routing
import { useRouter } from 'vue-router'

// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const store = useStore()
const router = useRouter()

// socket Io
import  io  from "socket.io-client";

const socket = io('http://localhost:3000')

onMounted(()=>{
    const isLoggedIn = store.getters.isLoggedIn
    const userID = store.getters.user._id

    if(!isLoggedIn){
      router.push('/login')
    }

  socket.on('connect', () => {
    console.log('Connected to server'); 

    socket.emit('userConnected',userID);
  });

  socket.on('newNotification',(notification)=>{
    toast(`${notification.notifier.username} ${notification.message}`,{
    position:toast.POSITION.BOTTOM_CENTER,
    transition:"slide",
    autoClose:1500,
    hideProgressBar:true
    })
    console.log(notification)
  })

  socket.on('newComment',(notification)=>{
    toast(`${notification.notifier.username} ${notification.message}`,{
    position:toast.POSITION.BOTTOM_CENTER,
    transition:"slide",
    autoClose:1500,
    hideProgressBar:true
    })

  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server');  
  });
})

</script>

