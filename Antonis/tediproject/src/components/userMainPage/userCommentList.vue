<template>
    <ul class="commentUL">
        <li v-for="comment in src" :key="comment._id"></li>
            <userComments :src="comment" />
        </li>
    </ul>
    <span>Load Previous...</span>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import userComments from './userComments.vue'
import { postType, commentType } from "../../tsLibs/auth"

export default defineComponent({
    name: "userCommentList",
    props: {
        src: {type: Array as PropType<Array<commentType>>, required: true},
    },
    components: {
        userComments,
    },
    setup() {
        
    },
})
</script>
<style scoped>
.commentUL {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
span {
    font-weight: bold;
    font-size: 12px;
    margin-left: 15px;
}
span:hover {
    border-style: none none solid none;
    border-width: 1px;
    cursor: pointer;
}
</style>