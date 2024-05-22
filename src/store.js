import {createStore} from 'vuex'

import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

const ls = new SecureLS({ isCompression: false });


const Store = createStore({
    state:{
        user:null,
        isLoggedIn:false,
        isLoggedOut:false
    },
    mutations:{
        setUser:(state,user)=>{
            state.user =user
        },
        clearUser:(state)=>{
            state.user = null,
            state.isLoggedIn= false,
            state.isLoggedOut= true
        },
        successLogin:(state,isLoggedIn)=>{
            state.isLoggedIn = isLoggedIn,
            state.isLoggedOut = false
        },
        failedLogin:(state,isLoggedIn)=>{
            state.isLoggedIn = isLoggedIn
        }
    },

    actions:{
        setUser:({commit},user)=>{
            commit('setUser',user)
        },

        clearUser:({commit},user)=>{
            commit('clearUser',user)
        },

        setSuccessLogin:({commit},isLoggedIn)=>{
            commit('successLogin',isLoggedIn)
        },

        setFailedLogin:({commit},isLoggedIn)=>{
             commit('failedLogin',isLoggedIn)
        }
    },

    getters:{
        user:(state)=>state.user,
        isLoggedIn:(state)=>state.isLoggedIn,
        isLoggedOut:(state)=>state.isLoggedOut
    },

    plugins:[
     createPersistedState({
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
          }
    })
    ]
})

export default Store