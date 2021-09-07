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
                        :src="getPic(myAvatar)"
                        width="35"
                        height="35"
                        style="margin-left: 4px;"
                        />
                    </div>
                </div>
                <div v-else class="other">
                    <div class="in">
                        <img
                        :src="getPic(otherAvatar)"
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
import { getPic } from "../../tsLibs/funcs";

export default defineComponent({
    name: "Bubles",
    props: {
        me: {type: String, required: true},
        src: {type: Array as PropType<Array<chatsMessagesType>>, required: true},
        myAvatar: {type: String, required: true},
        otherAvatar: {type: String, required: true},
    },
    async setup(props) {
        return { getPic }
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
.span span {
    
    display: inline-block;
    overflow-wrap: break-word;
}
</style>