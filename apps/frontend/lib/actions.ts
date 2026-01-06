import axios from 'axios'
import { redirect } from 'next/navigation'


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const handelLogin = async (username: string | null, password: string | null)=>{
    if(!username || !password){
        return null
    }

    const res = await axios.post(`${BACKEND_URL}/user/signin`, {
        username,
        password
    })

    if(!res || !res.data){
        return null
    }

    const jwt = res.data.token;
    sessionStorage.setItem("relio-jwt", jwt);
    return true;
}


export const getToken = async ()=>{
    return sessionStorage.getItem("relio-jwt")
}


export const getUserData = async () => {
    const token = await getToken()
    if(!token){
        redirect('/login');    
    }
    const {data: websites} = await axios.get(`${BACKEND_URL}/user/me`, {
        headers: {
            Authorization: token
        }
    })

    console.log("returnning thr websites: ", websites)
    
    return websites;

}


export const addWebsite = async (url: string | null) =>{
    if(!url){
        return
    }
    let final_url;
    const token = await getToken()
    if(!url.includes("https://")){
        final_url = "https://"+final_url
        final_url.trim();
    }
    console.log("url adding: ", final_url);
    const res = await axios.post(`${BACKEND_URL}/website/create`, {
        headers: token,
        url: final_url
    })
    return res;
}