<template>
  <div class="bg-dark-300 py-2 rounded-sm mb-4">
     <div class="px-4">
        <h6 class="text-xl mb-2">Share your thought</h6>
        
         <Vueform :endpoint=handleSubmit  method="POST" enctype="multipart/form-data">
            <TextareaElement 
               name="caption" 
               description="Caption should not exceed 500 words"
               :autogrow="true" 
               label="Caption"
               :rows="4"
               placeholder="Type here"
               :override-class="{
                     input:'w-full bg-dark-600 py-4 rounded-sm placeholder-gray-400',
                     container:'my-2',
                     inputContainer: 'border-0 w-full transition-all',
                     inputContainer_default: '',
                     inputContainer_focused: '',
                  }"
               rules="max:500"
            />
           
            <MultifileElement 
               name="photos" 
               description="You can upload up to 2 photos, each file must be under 5MB"
               label="Choose an Image"  
               :drop="true"
               :clickable="true" 
               :auto="false"
               accept=".jpg,.png,.jpeg" 
               view="gallery"
               :controls="{ add: true }"
               :upload-temp-endpoint="false"
               :file="{ rules: 'max:5120' }"
               :rules="[
                'min:1',
                'max:2',
                
               ]"
               :override-class="{
                     container:'my-2 transform-none hover:transform-none', 
                     button:' hover:transform-none'
                }"
            />

            <ButtonElement name="button" 
              button-class="w-full transform-none hover:transform-none my-2 bg-white-400"  
              :submits="true"
              :remove-classes="{
                wrapper: {
                    classname: ['transform-transition']
                    }
                }"
              >
              Post
              <v-icon name="md-send-sharp" class="mx-4"/>
           </ButtonElement>
         </Vueform>

     </div>
  </div>
</template>

<script setup>
// routing
import { BaseUrl } from '../../config/Axios';
import { useRouter } from 'vue-router'
// toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// vuex
import { useStore } from 'vuex';
import { onMounted,ref } from 'vue';

const store = useStore()
const router =  useRouter()
const user = ref(null)

onMounted(()=>{{
  user.value = store.getters.user
}})

const handleSubmit=async(FormDat,form$)=>{
  const requestData = form$.requestData

  form$.cancelToken  = form$.$vueform.services.axios.CancelToken.source()
  let id, response

  try {
    id = toast.loading("Posting Thread",{
       position:toast.POSITION.TOP_CENTER,
       theme:'colored',
       type:'info'
     })

    let formData = new FormData();

    for (let file of requestData.photos) {
       formData.append('photos', file); 
     }
     
    formData.append('caption', requestData.caption);
    formData.append('author',user.value._id)
 

     response= await BaseUrl.post(
      '/create/thread',
      formData,
      {
        cancelToken: form$.cancelToken.token,
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      }
    )    

    if(response.status === 200){
      setTimeout(()=>{
        toast.update(id,{
         render:"Thread Created Successfully",
         autoClose:true,
         theme:'colored',
         type:'success',
         position:toast.POSITION.TOP_CENTER
        })

      },1800)
      
      toast.done(id);

      router.push('/')
    }
   
  } catch (error) {
       if(response.status === 500){
          toast.update(id,{
          render:"Something went wrong. Try Again later",
          type:'error',
          theme:'colored',
          autoClose:2000,
          hideProgressBar:true
        })
       }

      console.log(error)
  }
  finally{
    setTimeout(()=>{
      toast.remove(id)
    },3000)

    form$.reset()
  }
}

</script>

