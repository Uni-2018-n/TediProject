<template>
    <navBar />
    <div class="middle">
        <div class="postInput">
            <userPostInput />
        </div>
        <div class="posts">
            <userPost />
        </div>
    </div>
    <footer>
        <Footer />
    </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Footer from "../components/footer.vue";
import navBar from "../components/navBar.vue";
import userPost from "../components/userMainPage/userPost.vue";
import userPostInput from "../components/userMainPage/userPostInput.vue";


export default defineComponent({
    name: "UserMainPage",
    components: {
        Footer,
        navBar,
        userPost,
        userPostInput,
    },
    setup() {
        return {  }
    },
})
</script>
<style scoped>
.posts {
    display: flex;
    justify-content: center;
}
.postInput {
    display: flex;
    justify-content: center;
}
</style>