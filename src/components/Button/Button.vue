<template>
    <button class="flex items-center justify-center gap-x-2 px-2 py-2 bg-white font-semibold text-gray-700 w-32 rounded-sm">
                       {{ text }}
       <Icon/>
    </button>
</template>


<script setup>
 defineProps({
  text: String,
})
</script>