import axios from "axios";
import router from "../router/index"

export const login = async (email: string, pass: string): Promise<Number> =>{
    try {
        const response = await axios.post("https://localhost:8000/login", {
            email: email,
            password: pass
        })
        if(!response.data.flag){
            return 2;
        }else{
            if(response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                router.push('/user');
                return -1;
            }
        }
    } catch(errors) {
        console.log("**LOGIN ERROR**");
        return -1;
    }
    return -1;
}

export const logout = async () =>{
    localStorage.clear();
    router.push('/');
}

export const loginCheck = async (): Promise<Object> =>{
    const user = JSON.parse(localStorage.getItem('user') as string);
    if(!user){
        router.push('/');
    }else {
        try {
            const response = await axios.get("https://localhost:8000/check", {
                headers: {
                    'authorization': 'Bearer ' + user.token
                }
            })
            return user;
        } catch(errors) {
            localStorage.clear();
            router.push('/');
            return Promise.reject(errors);
        }
    }
    return user;
}