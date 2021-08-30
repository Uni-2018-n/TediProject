import axios from "axios";
import { postType } from "./auth"

export const getPosts = async (user: string, len: number): Promise<postType[]> => {
    try {
        const response = await axios.get("https://localhost:8000/posts/"+user);
        // posts.value= response.data.all_posts;
        return response.data.all_posts
        // console.log(posts.value[0].date.toString());
    }catch(errors){
        console.log("**POST GET ERROR**")
    }
    return []
}