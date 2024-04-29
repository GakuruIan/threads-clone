<template>
    <!-- post bar -->
    <div class="bg-dark-300 py-2 rounded-sm mb-4">
        <div class="px-4">
            <h6 class="text-xl mb-2">Share your thought</h6>

            <form action="">
                <div class="mb-5">
                    <textarea id="message" rows="2" class="outline-0 text-sm rounded-sm mb-4 block w-full p-2.5 bg-dark-600 placeholder-gray-400 text-white" placeholder="Start a thread"></textarea>

                    <div class="flex items-center justify-between mb-4">
                        <router-link to="/" >
                            <v-icon name="md-attachment-twotone" scale="1.1"/>
                        </router-link>

                        <!-- <label for="dropzone-file" class="hover:cursor-pointer">
                            <v-icon name="md-attachment-twotone" />
                            <input id="dropzone-file" type="file" class="hidden" />
                        </label> -->

                        <span class="text-sm text-gray-400">Anyone can reply</span>
                    </div>

                       <button class="flex items-center justify-center gap-x-2 px-2 py-2 bg-white hover:bg-white/95 font-semibold text-gray-700 w-32 rounded-sm">
                          Post
                          <v-icon name="md-send-sharp"/>
                       </button>
                </div>
            </form>
        </div>

    </div>
    <!-- postbar -->

   <PostCard/>
   <PostCard/>
   <PostCard/>
   <PostCard/>

    
   
</template>

<script setup>
import Button from '../../components/Button/Button.vue';

import PostCard from '../../components/PostCard/PostCard.vue'
</script>


