<template>
    <navBar />
    <div class="external-com">
        <div class="left">
            <div class="top">
                <span>Chats</span>
                <img
                src="@/assets/outline_chat_black_24dp.png"
                width="25"
                height="25"
                />
            </div>
            <chats />
        </div>
        <div class="right">
            <chat />
        </div>
    </div>
    <footer>
        <Footer />
    </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import chats from '../components/communicationPage/chats.vue'
import chat from '../components/communicationPage/chat.vue'
export default defineComponent({
    name: "Communications",
    components: {
        chat,
        chats,
        navBar,
        Footer,
    },
    setup() {
        return {  }  
    },
})
</script>
<style scoped>
.external-com {
    margin: 1%;
    display: flex;
}
.left {
    background-color: white;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: max-content;
}
.right {
    display: inline-block;
    margin-left: 5px;
    flex-grow: 1;
}
.top {
    padding: 10px;
}
.top span {
    font-size: 27px;
    font-weight: bolder;
    font-family: "Poppins", Arial, sans-serif;
    margin-left: 35px;
    /* float: left; */
}
.top img {
    border: solid;
    border-color: rgb(248, 248, 248);
    background-color: rgb(249, 249, 249);
    border-radius: 15px;
    border-width: 1px;
    padding: 5px;
    float: right;
}
.top img:hover {
    opacity: 0.7;
    cursor: pointer;
}
</style>