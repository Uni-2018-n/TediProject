<template>
    <div class="comments">
        <img
        :src="getPic(src.avatar)"
        width="35"
        height="35"
        />
        <div class="data">
            <div class="name">
                <span>{{ src.name }}</span>
                <span class="time" :title="full">{{ time }}</span>
            </div>
            <div class="text">
                <span>
                    {{ commentText }}
                </span>
                <span class="load" @click="commentText = commentTextTemp;loadFlag = false;" v-if=loadFlag>Load More...</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import {commentType } from '../../tsLibs/auth'
import { getPic } from "../../tsLibs/funcs";

export default defineComponent({
    name: "userComments",
    props: {
        src: {type: Object as PropType<commentType>, required:true},
    },
    setup(props) {
        const commentTextTemp = ref(props.src.text.toString());
        const loadFlag = ref(false);
        const commentText = ref("")
        if(commentTextTemp.value.length > 200){
            commentText.value = commentTextTemp.value.substring(0,200) + "...";
            loadFlag.value = true;
        }else{
            commentText.value = commentTextTemp.value;
            loadFlag.value = false;
        }

        let date: Date =new Date(Date.parse(props.src.date.toString()));
        const time = ref(date.getHours() + ':' + date.getMinutes());
        const full = ref(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes());


        return { commentTextTemp, loadFlag, commentText, time, full, getPic };
    },
})
</script>
<style scoped>
.comments {
    display: flex;
}
.comments img {
    border-radius: 30px;
    /* vertical-align: middle; */
}
.data {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
    max-width: 90%;
}
.name span{
    font-size: 12px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bold;
}
.name .time {
    font-size: 11px;
    font-weight: 100;
    opacity: 70%;
    margin-left: 5px;
}
.text {
    background-color: rgb(240, 240, 240);
    padding: 6px 8px 6px 8px;
    margin-right: 20px;
    border-radius: 10px;
}
.text span{
    margin: 0;
    font-size: 12px;
    font-family: "Poppins", Arial, sans-serif;
    /* font-weight: bold; */
    overflow-wrap: break-word;
}

.middle .load {
    font-weight: bold;
    font-size: 13px;
    margin-left: 5px;
}
.middle .load:hover {
    border-style: none none solid none;
    border-width: 1px;
    cursor: pointer;
}

.like ul {
    list-style-type: none;
    padding: 0px 0px 0px 0px;
    margin: 5px 0 0px 10px;
}
.like li {
    display: inline-block;
    /* font-weight: bold; */
    font-size: 13px;
    /* width: 47%; */
    /* opacity: 70%; */
    margin: 0;
    padding: 5px 10px 5px 10px;
    /* margin-left: 10px; */
    border-style: none solid none none;
    border-width: 1px;
}
.like li:last-child {
    border-style: none;
}
.like li:first-child:hover {
    /* color: rgb(0, 119, 255); */
    cursor: pointer;
}
</style>
