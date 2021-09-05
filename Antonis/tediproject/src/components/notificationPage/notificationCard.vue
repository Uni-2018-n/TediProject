<template>
    <img
        src="@/assets/blank-profile-picture.png"
        width="75"
        height="75"
    />
    <div class="txt" v-if="src.action === 'like'">
        <span>Connected user {{ src.name }} liked your post!</span>
    </div>
    <div class="txt" v-else-if="src.action === 'comment'">
        <span>Connected user {{ src.name }} added a comment on your post!</span>
    </div>
</template>
<script lang="ts">
import { PropType } from '@vue/runtime-core'
import { defineComponent } from 'vue'
import { notificationNotificationsType } from '../../tsLibs/auth'

export default defineComponent({
    name: "notificationCard",
    props: {
        src: {type: Object as PropType<notificationNotificationsType>, require: true}
    },
    setup() {
        
    },
})
</script>
<style scoped>
img {
    border-radius: 50px;
    margin-right: 10px;   
}
</style>