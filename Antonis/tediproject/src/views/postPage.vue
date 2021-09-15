<template>
    <div class="big">
        <navBar />
        <div class="external">
            <userPost :post="post" :user="user" />
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import navBar from '../components/navBar.vue'
import Footer from '../components/footer.vue'
import userPost from "../components/userMainPage/userPost.vue";
import { loginCheck, givenType, postType } from "../tsLibs/auth"
import axios from 'axios';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: "postPage",
    components: {
        navBar,
        Footer,
        userPost
    },
    async setup() {
        const route = useRoute();
        const post = ref<postType>();
        const user = ref<givenType>();
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })

        try {
            const response = await axios.get("https://localhost:8000/posts/getpost/"+route.params.postID)
            post.value = response.data.result[0]
        }catch(erorr){
            console.log("**POST LOAD ERROR**")
        }

        return { post, user, }
    },
})
</script>
<style scoped>
.big {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
}
.external {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>