<template>
    <div class="external">
        <div class="inside">
            <div class="top">
                <img
                :src="getPic(other.id.ProfilePic)"
                width="55"
                height="55"
                />
                <div class="text">
                    <span class="name">{{ other.id.firstname }} {{ other.id.lastname }}</span>
                </div>
            </div>
            <div class="chat">
                <Bubles :src="other.msgs" :me="myId" :otherId="other.id._id" :myAvatar="avatar" :otherAvatar="other.id.ProfilePic"/>
            </div>
            <div class="input">
                <textarea id="postTextArea" v-model="currText" @input="resize($event)" rows="1" placeholder="Type Here..."></textarea>
                <div class="send">
                    <img
                    @click="sendMessage();currText='';"
                    src="@/assets/outline_send_black_24dp.png"
                    width="25"
                    height="25"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import Bubles from "../communicationPage/bubles.vue"
import { currType } from "../../tsLibs/auth";
import axios from 'axios';
import { getPic } from "../../tsLibs/funcs";

export default defineComponent({
    name: "chat",
    props: {
        myId: {type: String, required: true},
        avatar: {type: String, required: true},
        other: {type: Object as PropType<currType>, required: true},
    },
    components: {
        Bubles,
    },
    async setup(props){
        const currText = ref("");
        const resize = (e: Event) => {
            (e.target as HTMLTextAreaElement).style.height = 'auto';
            (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight +'px';
        };

        const sendMessage = async() =>{
            try {
                // console.log(props.myId)
                const response = await axios.post("https://localhost:8000/chat/message/"+props.other.msg_id, {
                    sender: props.myId,
                    text: currText.value,
                    avatar: props.avatar,
                })
                // console.log("test")
            }catch(error){
                console.log("**NEW MSG ERROR**")
            }
        }


        return { resize, currText, sendMessage, getPic }
    },
})
</script>
<style scoped>
.external {
    height: 100%;
    width: 100%;
    min-height: 0px;
    background-color: white;
    /* border: solid; */
    /* border-width: 3px; */
    /* border-color: rgb(212, 212, 212); */
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}

.inside {
    padding: 2px;
    height: 100%;
    width: 100%;
    min-height: 0px;
    display: flex;
    flex-direction: column;
}

.top {
    display: flex;
    padding: 10px;
    border-bottom: solid;
    border-color: rgb(201, 201, 201);
    border-width: 1px;
}
.top img {
    border-radius: 30px;
    vertical-align: middle;
    margin-right: 5px;
}
.text {
    margin-top: 10px;
}
.name {
    font-size: 15px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bolder;
}
.chat {
    flex: 1;
    min-height: 0px;
    /* min-width: 0px; */
}
.input {
    padding: 0px 10px 15px 10px;
    margin-top: 15px;
    display: flex;
    align-items:flex-end;
}
textarea {
    padding: 8px;
    background: rgba(0, 0, 0, 0.07);
    border-radius: 15px;
    border: none;
    resize: none;
    font-size: 15px;
    width: 100%;
    box-sizing: border-box;
}
textarea:focus {
    outline: none !important;
}
.send {
    margin: 0px 0px 0px 5px;
    padding: 0;
}
.send img {
    padding: 0;
    margin: 0;
}
.send img:hover {
    opacity: 0.7;
    cursor: pointer;
}
</style>