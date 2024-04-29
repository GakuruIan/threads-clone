<template>
  <div class="relative bg-dark-300 px-2 mb-14 md:mb-0 py-2 ">
     <div class="">
        <div class="flex items-center justify-between w-full mb-4">
          <div class="">
            <h6 class="text-2xl font-medium">Username</h6>
          </div>
          <div class="">
            <img :src="pic" alt="" class="h-20 w-20 rounded-full object-fit">
          </div>
        </div>

        <!-- bio -->
       <div class="">
        <p class="text-sm max-w-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut atque quas dolores qui dolor enim maiores, itaque sint nesciunt? Aperiam.</p>
       </div>

       <!-- info -->
       <div class="flex items-center justify-between my-4">
         <div class="flex items-center gap-x-4">
             <div class="">
               <span class="text-gray-400 text-[15px]">10 Posts</span>
              
             </div>
             <div class="">
               <span class="text-gray-400 text-[15px]">100 Followers</span>
             </div>
             <div class="">
               <span class="text-gray-400 text-[15px]">10 following</span>
               
             </div>
         </div>

          <!-- icons -->
          <div class="flex items-center gap-x-2">
            <v-icon name="co-instagram" class="h-5 w-5"/>
            <v-icon name="ri-more-fill" class="h-5 w-5"/>
          </div>

       </div>

        <!-- buttons -->
        <div class="flex gap-x-4">
            <button class="w-full px-2 py-2  bg-white hover:bg-white/95 font-semibold text-gray-700  rounded-sm">
                Follow
             </button>

             <button class="w-full px-2 py-2 rounded-sm tracking-wide bg-none border border-white text-white transition-all duration-75 hover:bg-white hover:text-gray-700 hover:font-semibold">
               Mention
            </button>
          </div>
          <!-- buttons -->
     </div>

     <!-- slider --> 
     <div class="my-4">
      <div class="flex w-full items-center gap-x-2">
        <!-- links or buttons -->
        <div class="flex-1 text-sm font-medium text-center text-gray-400 border-gray-700">
            <ul class=" flex flex-wrap -mb-px">
                <li class="me-2 flex-1">
                    <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300">Threads</a>
                </li>
                <li class="me-2 flex-1">
                    <a href="#" class="inline-block p-4  border-b-2  rounded-t-lg active text-blue-500 border-blue-500" aria-current="page">Replies</a>
                </li>
                <li class="me-2 flex-1">
                    <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg  hover:border-gray-300 hover:text-gray-300">Reposts</a>
                </li>

            </ul>
        </div>
        <!-- links buttons -->
      </div>
     </div>
     <!-- slider -->

     <PostCard/>
  </div>
</template>

<script setup>
import pic from '../../assets/pic.jpg'
import PostCard from '../../components/PostCard/PostCard.vue'
</script>

<!-- !! create post , comments for comments, search -->