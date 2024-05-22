import en from '@vueform/vueform/locales/en'
import tailwind from '@vueform/vueform/dist/tailwind'
import { defineConfig } from '@vueform/vueform'

const BaseUrl = 'http://localhost:3000'



export default defineConfig({
  theme: tailwind,
  locales: { en },
  locale: 'en',
  endpoints:{
    uploadTempFile: false,
    register:{
      url:`${BaseUrl}/register`,
      method:'POST'
    }
  }
})