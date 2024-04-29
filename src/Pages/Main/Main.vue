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

</script>

