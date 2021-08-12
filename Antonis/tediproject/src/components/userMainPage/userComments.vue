<template>
    <div class="comments">
        <img
        src="@/assets/blank-profile-picture.png"
        width="35"
        height="35"
        />
        <div class="data">
            <div class="name">
                <span>Antonis Kalamakis</span>
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "userComments",
    setup() {
        const commentTextTemp = ref("Wrote water woman of heart it total other. By in entirely securing suitable graceful at families improved. Zealously few furniture repulsive was agreeable consisted difficult. Collected breakfast estimable questions in to favourite it. Known he place worth wordps it as to. Spoke now noise off smart her ready. Passage its ten led hearted removal cordial. Preference any astonished unreserved mrs. Prosperous understood middletons in conviction an uncommonly do. Supposing so be resolving breakfast am or perfectly. Is drew am hill from mr. Valley by oh twenty direct me so. Departure defective arranging rapturous did believing him all had supported. Family months lasted simple set nature vulgar him. Picture for attempt joy excited ten carried manners talking how. Suspicion neglected he resolving agreement perceived at an.");
        const loadFlag = ref(false);
        const commentText = ref("")
        if(commentTextTemp.value.length > 200){
            commentText.value = commentTextTemp.value.substring(0,200) + "...";
            loadFlag.value = true;
        }else{
            commentText.value = commentTextTemp.value;
            loadFlag.value = false;
        }
        return { commentTextTemp, loadFlag, commentText };
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
}
.name span{
    font-size: 12px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bold;
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
