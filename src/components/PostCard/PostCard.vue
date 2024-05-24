<template>
     <div class="relative bg-dark-300 px-2 mb-2 md:mb-0 py-2 ">

        <div  class="relative md:border-b-2 md:border-light-100 pb-3">

            <!-- card header -->
            <div class="flex items-center justify-between py-2 ">
                <div class="flex items-center gap-x-2">
                    <img class="w-10 h-10 rounded-full" :src="User?.avatar.url" alt="user photo" />

                    <div class="flex flex-col">
                        <router-link :to="`@${User?.username}`" class="border-transparent text-gray-200 text-base md:text-base tracking-normal font-thin">{{ User.username }}</router-link>
                        <time class="text-xs font-normal text-gray-400">2 hours ago</time>
                    </div>
                </div>
              <button class="px-4 py-1 rounded-md tracking-wide bg-none border border-white text-white transition-all duration-75 hover:bg-white hover:text-gray-700 hover:font-semibold">Follow</button>
            </div> 
            <!-- card header -->

            <!-- card content -->
            <div  class="relative flex">
                <div class="absolute left-3 border-s border-gray-400 h-full"></div>

                <div class="px-6 flex-1">
                    <router-link :to="`/thread/${Thread._id}`">
                        <p class="mb-3 text-sm"> {{ Thread.caption }}</p>
                        <!-- image -->

                        <div v-if="Thread.photos.length > 0">
                            <!-- if there is more than two images -->
                            <div v-if="Thread.photos.length > 1">
                                <div class="grid grid-cols-2 gap-x-2">
                                    <div v-for="photo in Thread.photos" :key="photo._id">
                                        <img :src="photo.path"  alt="photo" class="h-80 md:h-full w-full object-fit rounded-lg">
                                    </div>
                                </div>
                            </div>

                            <div v-else v-for="photo in Thread.photos" :key="photo._id">
                                <img :src="photo.path"  alt="photo" class="h-80 md:h-96 w-96 object-fit rounded-lg">
                            </div>

                        </div>
                    </router-link>

                    <!-- icons -->
                    <div class="mt-1 ">

                     <div class="flex items-center gap-1 py-2">

                         <div class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                            <v-icon name="bi-heart" class="h-5 w-5"/>
                        </div>

                        <div class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                            <v-icon name="co-comment-bubble" class="h-5 w-5"/>
                        </div>

                        <div class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                            <v-icon name="la-retweet-solid" class="h-5 w-5"/>
                        </div>

                        <div class="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                            <v-icon name="co-share" class="h-5 w-5"/>
                        </div>
   
                     </div>

                    </div>
                    <!-- icons -->

                    <div class="flex items-center gap-4 mb-4 md:mb-2">
                        <p class="text-sm text-gray-200  hover:text-gray-300">{{ Thread?.comments.length }} reply</p>
                        <p class="text-sm text-gray-200  hover:text-gray-300">0 likes</p>
                    </div>
                </div>
               
            </div>
            <!-- card content -->
            <div class="flex -space-x-3 rtl:space-x-reverse">
                <img class="w-5 h-5 border-2 border-white rounded-full dark:border-gray-800" :src="tshirt" alt="">
                <img class="w-5 h-5 border-2 border-white rounded-full dark:border-gray-800" :src="tshirt" alt="">
                <img class="w-5 h-5 border-2 border-white rounded-full dark:border-gray-800" :src="tshirt" alt="">
            </div>

        </div>
       
  </div>
</template>

<script setup>
import tshirt from '../../assets/tshirt.jpg'

// prop of object
defineProps({
  Thread: Object,
  User:Object
})

</script>
