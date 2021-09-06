<template>
    <img
        :src="src.ProfilePic"
        width="75"
        height="75"
    />
    <div class="text">
        <span class="name">{{src.firstname}} {{ src.lastname }}</span>
    </div>
</template>
<script lang="ts">
import { PropType } from '@vue/runtime-core'
import { defineComponent } from 'vue'
import {userListType} from '../../tsLibs/auth'

export default defineComponent({
    name: "userCard",
    props: {
        src: {type: Object as PropType<userListType>, required: true},
    },
    setup(props) {
        if(props.src.ProfilePic){
            props.src.ProfilePic = "https://localhost:8000/upload/files/"+props.src.ProfilePic
        }else{
            props.src.ProfilePic = require("@/assets/blank-profile-picture.png")
        }
    },
})
</script>
<style scoped>
img {
    border-radius: 40px;
    margin-right: 15px;
}
</style>