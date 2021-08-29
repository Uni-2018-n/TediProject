<template>
    <div class="outeer">
        <navBar />
        <div class="middle">
            <div class="left">
                <userLeftCompartment :userName="user.firstname + ' ' + user.lastname" />
            </div>
            <div class="other">
                <div class="postInput">
                    <userPostInput :userName="user.firstname + ' ' + user.lastname" />
                </div>
                <div class="posts">
                    <userPostList />
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref,  } from 'vue';
import Footer from "../footer.vue";
import navBar from "../navBar.vue";
import userPost from "../userMainPage/userPost.vue";
import userPostInput from "../userMainPage/userPostInput.vue";
import userLeftCompartment from "../userMainPage/userLeftCompartment.vue";
import userPostList from "../../components/userMainPage/userPostList.vue"
import { loginCheck, givenType } from "../../jsLibs/auth"

export default defineComponent({
    name: "UserMainPageView",
    components: {
        Footer,
        navBar,
        userPost,
        userPostInput,
        userLeftCompartment,
        userPostList,
    },
    async setup() {
        const user = ref<givenType>();
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })

        return { user }
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