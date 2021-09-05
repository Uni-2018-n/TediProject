<template>
    <img
        src="@/assets/blank-profile-picture.png"
        width="75"
        height="75"
    />
    <div class="text">
        <span class="name">{{src.name}}</span>
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
        if(props.src.avatar){
            props.src.avatar = "https://localhost:8000/upload/files/"+props.src.avatar
        }else{
            props.src.avatar = require("@/assets/blank-profile-picture.png")
        }
    },
})
</script>
<style scoped>

</style>