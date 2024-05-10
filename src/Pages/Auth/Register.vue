<template>
  <div class=" h-screen flex items-center justify-center flex-col">
      <img :src="logo" class="h-20 w-20 object-contain mb-4"/>
    <div class="max-w-[500px] w-[350px] ">
        <header class="mb-4">
          <h1 class="text-3xl mb-1 text-center">Welcome to Threads</h1>
          <h6 class="text-base text-center text-gray-400"> Create an account</h6>
        </header>
        <div class="mt-4 w-full">
            <Button class="flex items-center py-3 my-6 justify-center border border-gray-400/20 w-full rounded-sm gap-x-2 text-gray-400 hover:bg-gray-500/20">
                <v-icon name="fc-google" scale="1.2"/>
                Sign Up With Google
             </Button>

           <div class="inline-flex items-center justify-center w-full">
                <hr class="w-full h-px my-6 border-0 bg-light-100">
                <span class="absolute px-3 font-medium text-gray-300 -translate-x-1/2  left-1/2  bg-dark-400">or</span>
            </div>

            <router-link to="/email-password">
              <Button class="flex items-center py-3 my-6 justify-center border border-gray-400/20 w-full rounded-sm gap-x-2 text-gray-400 hover:bg-gray-500/20">
                  <v-icon name="md-email-round" scale="1.2" class="text-white"/>
                  Sign Up With Email and Password
               </Button>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script setup>
import logo from '../../assets/logo.png'
</script>
