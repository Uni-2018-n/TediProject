<template>
    <img
        :src="getPic(curr.ProfilePic)"
        width="75"
        height="75"
    />
    <div class="txt" v-if="src.type === 'Like'">
        <span>Connected user {{ curr.firstname }} {{ curr.lastname }} liked your post!</span>
    </div>
    <div class="txt" v-else-if="src.type === 'Comment'">
        <span>Connected user {{ curr.firstname }} {{ curr.lastname }} added a comment on your post!</span>
    </div>
</template>
<script lang="ts">
import { PropType, ref } from '@vue/runtime-core'
import axios from 'axios'
import { defineComponent } from 'vue'
import { notificationNotificationsType, userListType } from '../../tsLibs/auth'
import { getPic } from "../../tsLibs/funcs";

export default defineComponent({
    name: "notificationCard",
    props: {
        src: {type: Object as PropType<notificationNotificationsType>, require: true}
    },
    async setup(props) {
        const curr = ref<userListType>()
        try {
            const response = await axios.get("https://localhost:8000/users/"+props.src?.user)
            curr.value = response.data
        }catch(error){
            console.log("**NOTIFICATION ERROR**")
        }

        return { getPic, curr}
    },
})
</script>
<style scoped>
img {
    border-radius: 50px;
    margin-right: 10px;   
}
</style>