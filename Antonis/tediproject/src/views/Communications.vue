<template>
    <div class="big">
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
        <Footer />
    </div>
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
.big {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.external-com {
    margin: 1%;
    flex: 1;
    height: 100%;
    display: flex;
}
.left {
    background-color: white;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: max-content;
}
.right {
    flex: 1;
    margin-left: 5px;
    /* height: 100%; */
}
.top {
    padding: 10px;
}
.top span {
    font-size: 27px;
    font-weight: bolder;
    font-family: "Poppins", Arial, sans-serif;
    margin-left: 35px;
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