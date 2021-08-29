<template>
    <ul>
        <li v-for="post in posts" :key="post">
            <userPost :post="post"/>
        </li>
    </ul>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue'
import userPost from "./userPost.vue";
import { loginCheck, givenType, postType } from "../../jsLibs/auth"

export default defineComponent({
    name: "userPostList",
    components: {
        userPost,
    },
    async setup() {
        const user = ref<givenType>();
        const posts = ref<postType[]>([]);
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })
        if(user.value)
        try {
            const response = await axios.get("https://localhost:8000/posts/"+user.value._id);
            posts.value= response.data.all_posts;
            // console.log(posts.value[0].date.toString());
        }catch(errors){
            console.log("**POST GET ERROR**")
        }

        return { user, posts }
    },
})
</script>
<style scoped>
ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

ul li {
    padding: 0px 0px 10px 0px;
    margin: 0;
}
</style>