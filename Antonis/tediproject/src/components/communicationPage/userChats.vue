<template>
    <div class="external">
        <div class="internal">
            <div :class="{ selected: selected}" class="tag">
                <img
                :src="chatter.ProfilePic"
                width="55"
                height="55"
                />
                <div class="text">
                    <span class="name">{{ chatter.firstname }} {{ chatter.lastname }}</span>
                    <!-- <div class="lastmsg">
                        <span class="msg">{{ text }}</span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent, PropType, ref } from 'vue'
import { loginCheck, givenType, chatsListType, userListType } from "../../tsLibs/auth"

export default defineComponent({
    name: "userChats",
    props: {
        user: {type: String, required: true},
        selected: {type: Boolean, required: true}
    },
    async setup(props) {
        const chatter = ref<userListType>()
        try {
            const response = await axios("https://localhost:8000/users/"+props.user)
            chatter.value = response.data
            if(chatter.value)
            if(chatter.value.ProfilePic){
                chatter.value.ProfilePic = "https://localhost:8000/upload/files/"+chatter.value.ProfilePic
            }else{
                chatter.value.ProfilePic = require("@/assets/blank-profile-picture.png")
            }
        }catch(err){
            console.log("**LEFT USER ERROR**")
        }

        return { chatter}
    },
})
</script>
<style scoped>
.tag {
    background-color: rgb(248, 248, 248);
    display: flex;
    padding: 8px;
    width: inherit;
    min-width: 280px;
}
.selected {
    background-color: rgb(230, 230, 230);
}
.tag img {
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
.lastmsg {
    margin: 0;
}
.msg {
    font-size: 13px;
    font-family: "Poppins", Arial, sans-serif;
    color: rgb(146, 146, 146);
}
</style>