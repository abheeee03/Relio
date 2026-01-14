import axios from 'axios'
import { redirect } from 'next/navigation'


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const handelLogin = async (username: string | null, password: string | null) => {
    if (!username || !password) {
        return null
    }

    const res = await axios.post(`${BACKEND_URL}/user/signin`, {
        username,
        password
    })

    if (!res || !res.data) {
        return null
    }

    const jwt = res.data.token;
    sessionStorage.setItem("relio-jwt", jwt);
    return true;
}


export const getToken = async () => {
    return sessionStorage.getItem("relio-jwt")
}


export const getUserData = async () => {
    const token = await getToken()
    if (!token) {
        redirect('/login');
    }
    const { data: websites } = await axios.get(`${BACKEND_URL}/user/me`, {
        headers: {
            Authorization: token
        }
    })

    console.log("returnning thr websites: ", websites)

    return websites;

}


export const addWebsite = async (url: string | null) => {
    if (!url) {
        return
    }
    const token = await getToken()
    if (!token) {
        redirect('/login')
    }
    console.log("url adding: ", url);
    const res = await axios.post(`${BACKEND_URL}/website/create`, {
        url
    }, {
        headers: {
            Authorization: token
        }
    })
    return res;
}



export const logout = () => {
    sessionStorage.removeItem("relio-jwt")
    redirect('/login')
}


export const getWebsiteData = async (websiteID: string) => {
    const token = sessionStorage.getItem("relio-jwt");
    const res = await axios.get(`${BACKEND_URL}/website/ticks/${websiteID}`, {
        headers: {
            Authorization: token
        }
    })
    if (!res.data) {
        redirect('/404');
    }

    return res.data.data
}

export const getAllTicks = async (limit: number = 15, offset: number = 0) => {
    const token = sessionStorage.getItem("relio-jwt");
    if (!token) {
        redirect('/login');
    }

    try {
        const res = await axios.get(`${BACKEND_URL}/website/all-ticks`, {
            headers: {
                Authorization: token
            },
            params: {
                limit,
                offset
            }
        })

        return res.data
    } catch (error) {
        console.error("Failed to fetch ticks:", error)
        return { data: [], total: 0, hasMore: false }
    }
}

export const deleteWebsite = async (websiteID: string) => {
    const token = sessionStorage.getItem("relio-jwt");
    if (!token) {
        redirect('/login');
    }

    try {
        const res = await axios.post(`${BACKEND_URL}/website/delete/${websiteID}`, {}, {
            headers: {
                Authorization: token
            }
        })
        console.log(res);
        if (!res) {
            return { success: false }
        }
        return { success: true, data: res.data }
    } catch (error) {
        console.error("Failed to delete website:", error)
        return { success: false, error }
    }
}