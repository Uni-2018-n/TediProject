  <template>
    <div ref='scrollComponent'>
        <ul>
            <li v-for="post in posts" :key="post">
                <userPost :post="post" :user="user"/>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import userPost from "./userPost.vue";
import { loginCheck, givenType, postType } from "../../tsLibs/auth"
import { getPosts } from "../../tsLibs/postLoading"

export default defineComponent({
    name: "userPostList",
    components: {
        userPost,
    },
    async setup() {
        onMounted(() => {
            window.addEventListener("scroll", handleScroll)
        })

        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll)
        })
        const user = ref<givenType>();
        const posts = ref<postType[]>([]);
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })
        if(user.value){
            getPosts(user.value._id.toString(), 10).then(data => {
                posts.value.push(...data);
            });
        }

        const loadMorePosts = () =>{
            if(user.value)
            getPosts(user.value._id.toString(), 10).then(data => {
                posts.value.push(...data);
            })
        }


        const scrollComponent = ref<HTMLDivElement>()


        const handleScroll = () => {
            let element: HTMLDivElement = scrollComponent.value as HTMLDivElement;
            if(element?.getBoundingClientRect().bottom < window.innerHeight+1){
                // loadMorePosts();
            }
        }

        return { user, posts, scrollComponent }
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