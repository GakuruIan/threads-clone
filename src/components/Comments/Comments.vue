<template>
    <div class="my-3 py-1">
        <div class="flex gap-x-1 items-start md:border-b-2 md:border-light-100">
            <div class="w-8 h-8">
                <img class="h-8 w-8 rounded-full" :src="Comment?.author.avatar.url" alt="user photo" />
            </div>
            <!-- comment -->
           <div class="pl-2  flex-1 items-start">
             <router-link :to="`/@${Comment?.author.username}`" class="text-base  md:text-base tracking-normal font-thin mb-2">{{ Comment?.author.username }}</router-link>
             <p class="text-sm">{{ Comment?.comment }}</p>
             
              <!-- icons -->
              <div class="mt-1 ">

                    <div class="flex items-center gap-1 py-1">

                        <div class="flex items-center justify-center h-7 w-7 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                          <v-icon name="bi-heart" class="h-5 w-5"/>
                        </div>

                        <div class="flex items-center justify-center h-7 w-7 rounded-full transition-all duration-75 hover:cursor-pointer hover:bg-light-100">
                            <v-icon name="co-comment-bubble" class="h-5 w-5"/>
                        </div>

                    </div>

             </div>
                <!-- icons -->

                <!-- likes and reply -->
                <div class="flex items-center gap-4 mb-4">
                       <p class="text-sm text-gray-400  hover:text-gray-300">1 reply</p>
                       <p class="text-sm text-gray-400  hover:text-gray-300">0 likes</p>
                </div>
                <!-- likes and reply -->
            </div>

        </div>
        
    </div>
</template>

<script setup>
  import pic from '../../assets/tshirt.jpg'

  const props =defineProps({
     Comment:Object
  })

</script>