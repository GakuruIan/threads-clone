<template>
    <div class="" v-for="index in count" :key="index">
        <div class="relative bg-dark-300 px-2 mb-6 py-2 ">

                <div  class="animate-pulse relative pb-3">

                    <!-- card header -->
                <div class="flex items-center justify-between py-4 mb-4">
                        <div class="flex items-center gap-x-2">
                            <!-- user profile picture -->
                            <div class="w-10 h-10 rounded-full bg-light-100"></div>
                            

                            <div class="flex flex-col">
                                <!-- username -->
                                <div class="h-2 w-32 bg-light-100 rounded-md mb-3"></div>
                                
                                <!-- time -->
                                <h-2 class="h-2 w-28 bg-light-100 rounded-md"></h-2>
                                
                            </div>
                        </div>
                        <!-- follow button -->
                        <div class="w-28 h-10 bg-light-100 rounded-md"></div>
                    </div> 
                    <!-- card header -->

                    <!-- card content -->
                    <div  class="relative flex mb-4">

                        <div class="px-6 flex-1">
                            <div>
                                <!-- caption -->
                                <p class="mb-3 text-sm h-2 w-96 bg-light-100 rounded-md"></p>
                                <!-- image -->
                                <div class="h-96 w-96 bg-light-100 rounded-md"></div>
                            </div>

                            <!-- icons -->
                            <div class="mt-1 ">

                            <div class="flex items-center gap-1 py-2">

                                <div class=" h-5 w-5 rounded-full bg-light-100">
                                    
                                </div>

                                <div class=" h-5 w-5 rounded-full  bg-light-100">
                                    
                                </div>

                                <div class=" h-5 w-5 rounded-full bg-light-100">
                                
                                </div>

                                <div class="h-5 w-5 rounded-full  bg-light-100">
                                </div>

                            </div>

                            </div>
                            <!-- icons -->
                        </div>  
                    </div>
                    <!-- card content -->
                </div>
         </div>
    </div>
    
</template>

<script setup>

 const props = defineProps({
    count:Number
 })

</script>