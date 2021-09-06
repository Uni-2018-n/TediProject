<template>
    <div class="big">
        <navBar />
        <div class="external-com">
            <div class="left">
                <div class="top">
                    <span>Chats</span>
                    <img @click="popupSearchFlag=true;"
                    src="@/assets/outline_chat_black_24dp.png"
                    width="25"
                    height="25"
                    />
                </div>
                <chats :id="user._id" :loaded="loaded" :users="temp" />
            </div>
            <div class="right">
                <chat v-if="current" :id="current.id" :msg_id="current.msg_id"/>
            </div>
        </div>
        <Footer />
    </div>
    <popupSearch v-if="popupSearchFlag" :close="()=>{popupSearchFlag=false;}"/>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import chats from '../components/communicationPage/chats.vue'
import chat from '../components/communicationPage/chat.vue'
import popupSearch from '../components/communicationPage/popupSearch.vue'
import axios from 'axios';
import { loginCheck, givenType, chatsListType } from "../tsLibs/auth"

type curr = {
  id: String,
  msg_id: String
}

export default defineComponent({
    name: "Communications",
    components: {
        chat,
        chats,
        navBar,
        Footer,
        popupSearch,
    },
    async setup() {
        const user = ref<givenType>();
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })

        const temp = ref<chatsListType[]>();

        if(user.value)
        try {
          const response = await axios("https://localhost:8000/chat/"+user.value._id)
          temp.value = response.data;
        }catch(err){
          console.log("**CHATS LEFT ERROR**");
        }

        const current = ref<curr>()
        const loaded = (id: string, msg_id:string) =>{
            current.value = {id, msg_id};
        }

        const popupSearchFlag = ref(false);
        return { user, temp, current, loaded, popupSearchFlag }
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
    min-height: 0px;
    display: flex;
}
.left {
    background-color: white;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: max-content;

    display: flex;
    flex-direction: column;
}
.right {
    flex: 1;
    margin-left: 5px;
    height: 100%;
    min-height: 0px;
    display: flex;
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