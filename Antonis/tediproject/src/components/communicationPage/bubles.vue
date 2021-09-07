<template>
    <div class="outside-ul">
        <ul>
            <li v-for="message in src" :key="message">
                <div v-if="message.sender === me" class="me">
                    <div class="in">
                        <div class="span" style="margin-left: 39px;">
                            <span>{{ message.text }}</span>
                        </div>
                        <img
                        :src="meAvatar"
                        width="35"
                        height="35"
                        style="margin-left: 4px;"
                        />
                    </div>
                </div>
                <div v-else class="other">
                    <div class="in">
                        <img
                        :src="pickImg(message)"
                        width="35"
                        height="35"
                        style="margin-right: 4px;"
                        />
                        <div class="span" style="margin-right: 39px;">
                            <span>{{ message.text }}</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { chatsMessagesType } from "../../tsLibs/auth";

export default defineComponent({
    name: "Bubles",
    props: {
        me: {type: String, required: true},
        src: {type: Array as PropType<Array<chatsMessagesType>>, required: true},
        myAvatar: {type: String, required: true},
    },
    setup(props) {
        const meAvatar = ref(((props.myAvatar) ? "https://localhost:8000/upload/files/"+props.myAvatar : require("@/assets/blank-profile-picture.png")))
        const pickImg = (msg: chatsMessagesType) =>{
            if(msg.avatar){
                return "https://localhost:8000/upload/files/"+msg.avatar
            }else{
                return require("@/assets/blank-profile-picture.png")
            }
        }
        return { meAvatar, pickImg }
    },
})
</script>
<style scoped>
.outside-ul {
    height: 100%;
}
ul {
    overflow-y: auto;
    list-style-type: none;
    padding: 5px;
    margin: 0;
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
}
.me {
    display: flex;
    justify-content:flex-end;
}
.other {
    display: flex;
    justify-content: flex-start;
}
.in {
    display: flex;
    align-items: center;
}
.in img {
    border-radius: 25px;
    vertical-align: middle;
}
.span {
    padding: 5px;
    background-color: rgb(235, 235, 235);
    border-radius: 10px;
}
</style>