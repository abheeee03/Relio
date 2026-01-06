import axios from 'axios'


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