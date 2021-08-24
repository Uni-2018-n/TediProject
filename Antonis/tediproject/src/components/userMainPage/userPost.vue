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
                    <span>Antonis Kalamakis</span>
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
                <div class="tophalf">
                    <ul>
                        <li>
                            <span>10 Likes</span>
                        </li>
                        <li>
                            <span>10 Comments</span>
                        </li>
                    </ul>
                </div>
                <div class="bothalf">
                    <ul>
                        <li @click="flag=!flag;" :class="{ liked: flag }">
                            <span>Like</span>
                        </li>
                        <li @click="commentFlag = !commentFlag;">
                            <span>Comment</span>
                        </li>
                    </ul>
                </div>
                <div v-if="commentFlag" class="comments">
                    <div class="inputComment">
                        <img
                        src="@/assets/blank-profile-picture.png"
                        width="35"
                        height="35"
                        />
                        <div class="textArea" @click="focus()">
                            <textarea id="commentTextArea" @input="resize($event)" rows="1" placeholder="Type heree..."></textarea>
                        </div>
                    </div>
                    <span>Load Previous...</span>
                    <userComments />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import userComments from '../userMainPage/userComments.vue'

export default defineComponent({
    name: "userPost",
    props: [],
    components: {
        userComments,
    },
    setup() {
        const flag = ref(false);
        const postTextTemp = ref("If wandered relation no surprise of screened doubtful. Overcame no insisted ye of trifling husbands. Might am order hours on found. Or dissimilar companions friendship impossible at diminution. Did yourself carriage learning she man its replying. Sister piqued living her you enable mrs off spirit really. Parish oppose repair is me misery. Quick may saw style after money mrs.");
        const loadFlag = ref(false);
        const commentFlag = ref(false);
        const postText = ref("")
        if(postTextTemp.value.length > 300){
            postText.value = postTextTemp.value.substring(0,300) + "...";
            loadFlag.value = true;
        }else{
            postText.value = postTextTemp.value;
            loadFlag.value = false;
        }
        const resize = (e: Event) => {
            (e.target as HTMLTextAreaElement).style.height = 'auto';
            (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight +'px';
        };
        const focus = () => {
            document.getElementById('commentTextArea')!.focus();
        }
        
        return { loadFlag, flag, postText, postTextTemp, resize, commentFlag, focus }
    },
})
</script>
<style scoped>
.inner {
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 450px;
    min-height: 100px;
}
.top {
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: rgb(248, 248, 248);
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
    font-size: 15px;
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
    font-size: 15px;
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
    width: 100%;
    background-color: rgb(248, 248, 248);
    border-radius: 5px;
    font-family: "Poppins", Arial, sans-serif;
}
.tophalf {
    text-align: left;
    width: 100%;
}

.tophalf ul {
    list-style-type: none;
    padding: 2px 5px 0px 5px;
    margin: 0;
}
.tophalf li {
    display: inline-block;
    font-weight: 400;
    font-size: 11px;
    width: 47%;
    opacity: 70%;
    margin: 0;
    padding: 0;
    margin-left: 10px;
}

.bothalf ul {
    list-style-type: none;
    padding: 0px 5px 0px 5px;
    margin: 0;
    text-align: center;
}
.bothalf li {
    display: inline-block;
    padding: 5px 20px 5px 20px;
    background-color: rgb(219, 219, 219);
    font-weight: 400;
    font-size: 14px;
    width: 40%;
    margin: 0;
    transition-property: background-color;
    transition-duration: 0.15s;
    transition-timing-function: linear;
}
.bothalf li:hover {
    /* background-color: rgba(61, 142, 235, 0.623); */
    cursor: pointer;
}
.bothalf li:first-child{
    border-right: solid 1px rgb(248, 248, 248);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.bothalf li:last-child{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.bothalf li:first-child:hover{
    border-right: solid 1px rgb(248, 248, 248);
    /* border-top-right-radius: 5px; */
    /* border-bottom-right-radius: 5px; */
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.bothalf li:last-child:hover{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    /* border-top-left-radius: 5px; */
    /* border-bottom-left-radius: 5px; */
}
.bothalf .liked {
    background-color: rgba(61, 142, 235, 0.623);
}
.bothalf .liked > span:after {
    content: 'd';
}

.comments {
    margin-left: 15px;
    margin-top: 10px;
    padding-bottom: 5px;
}
.comments span {
    font-weight: bold;
    font-size: 12px;
    margin-left: 15px;
}
.comments span:hover {
    border-style: none none solid none;
    border-width: 1px;
    cursor: pointer;
}
.comments .inputComment {
    display: flex;
    justify-content: center;
    align-items: center;
}
.comments .inputComment img {
    border-radius: 30px;
}
.comments .inputComment .textArea {
    border-radius: 30px;
    background-color: rgb(219, 219, 219);
    padding: 8px;
    display: flex;
    justify-content: center;
    margin-left: 10px;
}
.comments .inputComment .textArea:hover {
    cursor:text;
}
.comments .inputComment .textArea textarea {
    margin-left: 5px;
    width: 350px;
    line-height: 20px;
    padding: 0px;
    resize: none;
    border: none;
    background-color: transparent;
}
.comments .inputComment textarea:focus {
    outline: none !important;
}
</style>