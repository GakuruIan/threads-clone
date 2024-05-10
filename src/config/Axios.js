import axios from "axios";

export const BaseUrl = axios.create({
    baseURL:'http://localhost:3000/',
    headers:{
        'Content-Type':'application/json'
    }
})