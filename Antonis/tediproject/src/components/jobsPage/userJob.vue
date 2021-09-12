<template>
    <div class="outer">
        <div class="inner">
            <div class="top">
                <img
                :src="getPic(src.avatar)"
                width="55"
                height="55"
                />
                <div class="text">
                    <span>{{ src.name }}</span>
                    <span class="time" :title="full">{{ time }}</span>
                </div>
                <div class="middle">
                    <span>
                        {{ postText }} 
                    </span>
                    <span class="load" @click="postText = postTextTemp;loadFlag = false;" v-if=loadFlag>Load More...</span>
                </div>
                <div class="skills">
                    <ul>
                        <li v-for="skill in src.Skills" :key="skill">
                            <span>{{skill}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <button @click="IntrestFlag = true;" v-if="!my">
                    <span>Intrest</span>
                </button>
                <button @click="setCurr(src._id)" v-else>
                    <span>Check Applications</span>
                </button>
            </div>
        </div>
    </div>
    <jobIntrestPopup v-if="IntrestFlag" :jobId="src._id" :userId="userId" :close="() =>{IntrestFlag=false;}"/>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { jobType } from '../../tsLibs/jobs'
import { getPic } from "../../tsLibs/funcs";
import axios from 'axios';
import jobIntrestPopup from "./jobIntrestPopup.vue"

export default defineComponent({
    name: "userJob",
    props: {
        userId: {type: String, required: true},
        src: {type: Object as PropType<jobType>, required: true},
        setCurr: {type: Function, required: false},
        my: {type: Boolean, required: true},
    },
    components: {
        jobIntrestPopup,
    },
    setup(props) {
        const flag = ref(false);
        const postTextTemp = ref(props.src.Description.toString());
        const loadFlag = ref(false);
        const postText = ref("")
        if(postTextTemp.value.length > 300){
            postText.value = postTextTemp.value.substring(0,300) + "...";
            loadFlag.value = true;
        }else{
            postText.value = postTextTemp.value;
            loadFlag.value = false;
        }

        let date: Date =new Date(Date.parse(props.src.createdAt.toString()));
        const time = ref(date.getHours() + ':' + date.getMinutes());
        const full = ref(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes());


        const IntrestFlag = ref(false)
        
        return { loadFlag, flag, postText, postTextTemp, focus, getPic, time, full, IntrestFlag }
    },
})
</script>
<style scoped>
.inner {
    width: 450px;
    min-height: 100px;
}
.top {
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: rgb(248, 248, 248);
    border-radius: 15px;
    padding: 5px;
}
.top img {
    border-radius: 30px;
    float: left;
    margin-right: 5px;
}
.text {
    margin-top: 13px;
}
.text span {
    font-size: 18px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bolder;
}
.text .time {
    font-size: 11px;
    font-weight: 100;
    opacity: 70%;
    margin-left: 5px;
}

.middle {
    padding: 7px;
    min-height: 20px;
    font-size: 16px;
}
.middle .load {
    font-weight: bold;
    font-size: 16px;
    margin-left: 10px;
}
.middle .load:hover {
    border-style: none none solid none;
    border-width: 1px;
    cursor: pointer;
}

.skills ul {
    list-style-type: none;
    padding: 0;
    margin: 10px 0 10px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.skills ul li {
    margin: 5px 5px 15px 5px;
}

.skills ul li span {
    color: rgb(0, 0, 0);
    border: solid;
    border-color: rgb(190, 190, 190);
    padding: 5px;
    border-radius: 25px;
    text-align: center;
    transition: all 0.2s;
}

.skills ul li span:hover {
    background-color: rgb(236, 236, 236);
    color: rgb(0, 0, 0);
    cursor: pointer;
}


.bottom {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}
.bottom button {
    border: none;
    border-radius: 25px;
    padding: 5px 45px;
    border-width: 2px;
    font-size: 20px;
    background-color: #0a66c2;
    color: white;
}
.bottom button:hover {
    background-color: #004182;
    cursor: pointer;
}
</style>