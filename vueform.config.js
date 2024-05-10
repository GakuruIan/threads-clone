import en from '@vueform/vueform/locales/en'
import tailwind from '@vueform/vueform/dist/tailwind'
import { defineConfig } from '@vueform/vueform'

import axios from 'axios'

const BaseUrl = 'http://localhost:3000'



export default defineConfig({
  theme: tailwind,
  locales: { en },
  locale: 'en',
  endpoints:{
    register:{
      url:`${BaseUrl}/register`,
      method:'POST'
    }
  }
})