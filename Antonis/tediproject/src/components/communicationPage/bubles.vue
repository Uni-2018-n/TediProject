<template>
    <div class="outside-ul">
        <ul>
            <li v-for="message in tempSrc" :key="message._id">
                <div v-if="message.sender === me" class="me">
                    <div class="in" style="margin-left: 39px;">
                        <div class="span">
                            <span>{{ message.text }}</span>
                        </div>
                        <img
                        :src="getPic(myAvatar)"
                        width="35"
                        height="35"
                        style="margin-left: 4px;"
                        />
                    </div>
                </div>
                <div v-else class="other">
                    <div class="in" style="margin-right: 39px;">
                        <img
                        :src="getPic(otherAvatar)"
                        width="35"
                        height="35"
                        style="margin-right: 4px;"
                        />
                        <div class="span">
                            <span>{{ message.text }}</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, onBeforeUnmount, PropType, ref } from 'vue'
import { chatsMessagesType, chatsListType } from "../../tsLibs/auth";
import { getPic } from "../../tsLibs/funcs";

export default defineComponent({
    name: "Bubles",
    props: {
        me: {type: String, required: true},
        otherId: {type: String, required: true},
        src: {type: Array as PropType<Array<chatsMessagesType>>, required: true},
        myAvatar: {type: String, required: true},
        otherAvatar: {type: String, required: true},
    },
    async setup(props) {
        const tempSrc = ref<chatsMessagesType[]>(props.src)
        var t = setInterval(async () => {
            try {
                const response = await axios.get("https://localhost:8000/chat/get_messages/"+props.me+"/"+props.otherId)
                tempSrc.value = response.data
            }catch(error) {
                console.log("**ERROR CHAT REFRESH**")
            }
        }, 500)

        onBeforeUnmount(()=>{
            clearInterval(t)
        })
        return { getPic, tempSrc }
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
    margin-bottom: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 0px;
}
.in img {
    border-radius: 25px;
    vertical-align: middle;
    flex-shrink: 0;
}
.span {
    padding: 5px;
    background-color: rgb(235, 235, 235);
    border-radius: 10px;
    word-break: break-all;
}
</style>