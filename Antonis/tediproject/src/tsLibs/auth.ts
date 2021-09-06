import axios from "axios";
import router from "../router/index"

export type givenType = {
    flag: Boolean,
    token: String,
    firstname: String,
    lastname: String,
    ProfilePic: String,
    _id: String
}

export type likeType = {
    _id: String,
    user: String
}

export type commentType = {
    user: String,
    text: String,
    name: String,
    avatar: String,
    date: String,
    _id: String,
}

export type postType = {
    author: String,
    avatar: String,
    comments: Array<commentType>,
    createdAt: String,
    date: String,
    likes: Array<likeType>,
    name: String,
    pictures: Array<String>,
    text: String,
    updatedAt: String,
    videos: Array<String>,
    voice_recordings: Array<String>,
    __v: Number
    _id: String,
}

export type networkUserType = {
    avatar: String,
    id: String,
    name: String,
    professional_position: String,
    Employment_institution: String
}

export type notificationRequestType = {
    avatar: String,
    id: String,
    name: String,
}

export type notificationNotificationsType = {
    name: String,
    type: String,
    action: String,
}

export type userListType = {
    firstname: String,
    lastname: String,
    _id: String,
    ProfilePic: String,
}

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

export const loginCheck = async (): Promise<givenType> =>{
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
            if(user.ProfilePic){
                user.ProfilePic = "https://localhost:8000/upload/files/"+user.ProfilePic
            }else{
                user.ProfilePic = require("@/assets/blank-profile-picture.png")
            }
            return user;
        } catch(errors) {
            localStorage.clear();
            router.push('/');
            return Promise.reject(errors);
        }
    }
    return user;
}