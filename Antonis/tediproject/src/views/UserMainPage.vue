<template>
    <div class="outeer">
        <navBar />
        <div class="middle">
            <div class="left">
                <userLeftCompartment />
            </div>
            <div class="other">
                <div class="postInput">
                    <userPostInput />
                </div>
                <div class="posts">
                    <ul>
                        <li v-for="post in posts" :key="post">
                            <userPost />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Footer from "../components/footer.vue";
import navBar from "../components/navBar.vue";
import userPost from "../components/userMainPage/userPost.vue";
import userPostInput from "../components/userMainPage/userPostInput.vue";
import userLeftCompartment from "../components/userMainPage/userLeftCompartment.vue";


export default defineComponent({
    name: "UserMainPage",
    components: {
        Footer,
        navBar,
        userPost,
        userPostInput,
        userLeftCompartment
    },
    setup() {
        const posts= reactive([
            {
                name: "antonis",
            },
            {
                name: "antonis",
            },
            {
                name: "antonis",
            },
            {
                name: "antonis",
            },
            {
                name: "antonis",
            },
        ])
        return { posts }
    },
})
</script>
<style scoped>
.outeer {
    display: flex;
    height: 100%;
    flex-direction: column;
}
.middle {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-width: fit-content;
}
.posts ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.posts ul li {
    padding: 0px 0px 10px 0px;
    margin: 0;
}
.other {
    display: flex;
    flex-direction: column;
}
.left{
    align-self: flex-start;
    height: auto;
    min-width: fit-content;
    position: sticky;
    top: 15px;
}
</style>