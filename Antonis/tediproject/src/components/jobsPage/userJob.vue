<template>
    <div class="outer">
        <div class="inner">
            <div class="top">
                <img
                src="@/assets/blank-profile-picture.png"
                width="55"
                height="55"
                />
                <div class="text">
                    <span>{{ name }}</span>
                    <span class="time">10:00pm</span>
                </div>
                <div class="middle">
                    <span>
                        {{ postText }} 
                    </span>
                    <span class="load" @click="postText = postTextTemp;loadFlag = false;" v-if=loadFlag>Load More...</span>
                </div>
            </div>
            <div class="bottom">
                <button @click="intrested=true;">
                    <span v-if="!intrested">Intrest</span>
                    <span v-else>Intrested!</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "userJob",
    props: {
        name: {type: String, required: true},
        text: {type: String, required: true},
        intrest: {type: Boolean, required: true},
    },
    setup(props) {
        const intrested= ref(props.intrest);
        const flag = ref(false);
        const postTextTemp = ref(props.text);
        const loadFlag = ref(false);
        const postText = ref("")
        if(postTextTemp.value.length > 300){
            postText.value = postTextTemp.value.substring(0,300) + "...";
            loadFlag.value = true;
        }else{
            postText.value = postTextTemp.value;
            loadFlag.value = false;
        }
        
        return { loadFlag, flag, postText, postTextTemp, focus, intrested }
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