<template>
    <div class="external">
        <div class="internal">
            <img
                :src="getPic(src.avatar)"
                width="75"
                height="75"
            />
            <div class="info">
                <span>User {{ src.name }} applied for a job you offered!</span>
                <div class="btns">
                    <button class="btn accept">Accept</button>
                    <button class="btn reject">Reject</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { applicationType } from '../../tsLibs/jobs'
import {getPic} from '../../tsLibs/funcs'

export default defineComponent({
    name: "userRequests",
    props: {
        src: {type: Object as PropType<applicationType>, required: true}
    },
    setup(props) {
        return { getPic  }
    },
})
</script>
<style scoped>
.external {
    display: flex;
    justify-content: center;
}
.internal {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgb(241, 241, 241);
    padding: 15px;
    border-radius: 25px;
    max-width: 80%;
    min-width: 350px;
    height: 100px;
}

.internal img {
    border-radius: 50px;
}
.info {
    margin-top: 10px;
    margin-left: 15px;
}

.btns {
    margin: 10px 0px 0px 35%;
}
.btn {
    margin: 0px 5px;
    background-color: lightgray;
    border: none;
    padding: 10px 15px;
    border-radius: 10px;
}
.accept{
    border: solid;
    background-color: rgba(66, 101, 255, 0.404);
    border-color: rgba(66, 101, 255, 0.663);
    border-width: 2px;
}
.accept:hover {
    background-color: rgba(66, 101, 255, 0.663);
    cursor: pointer;
}
.reject:hover {
    background-color: rgb(173, 173, 173);
    cursor: pointer;
}
</style>