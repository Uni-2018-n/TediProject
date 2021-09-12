<template>
    <img
        :src="getPic(src.ProfilePic)"
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
import { getPic } from "../../tsLibs/funcs";

export default defineComponent({
    name: "userCard",
    props: {
        src: {type: Object as PropType<userListType>, required: true},
    },
    setup(props) {
        return { getPic }
    },
})
</script>
<style scoped>
img {
    border-radius: 40px;
    margin-right: 15px;
    -webkit-user-drag: none;
}
</style>