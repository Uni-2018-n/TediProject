<template>
    <div class="outer">
        <div class="inner">
            <div class="top">
                <img
                :src="getPic(post.avatar)"
                width="55"
                height="55"
                />
                <div class="text">
                    <div class="info">
                        <span>{{ post.name }}</span>
                        <span class="time" :title="full">{{ time }}</span>
                    </div>
                </div>
                <div class="middle">
                    <span>
                        {{ postText }} 
                    </span>
                    <span class="load" @click="postText = postTextTemp;loadFlag = false;" v-if=loadFlag>Load More...</span>
                </div>
            </div>
            <div class="media">
                <userUnderPostImg :imgOpenTriger="imgOpenTriger" :allCount="allCount" :voicesURL="voicesURL" :totalURL="totalURL" />
            </div>
            <div class="bottom">
                <div class="tophalf">
                    <ul>
                        <li>
                            <span>{{ post.likes.length }} Likes</span>
                        </li>
                        <li>
                            <span>{{ post.comments.length }} Comments</span>
                        </li>
                    </ul>
                </div>
                <div class="bothalf">
                    <ul>
                        <li @click="like()" :class="{ liked: flag }">
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
                        :src="getPic(user.ProfilePic)"
                        width="35"
                        height="35"
                        />
                        <div class="textArea" @click="focus()">
                            <textarea @keyup.enter.prevent="submitComment()" v-model="commentText" id="commentTextArea" rows="1" placeholder="Type here..."></textarea>
                        </div>
                    </div>
                    <userCommentList :src="postComments"/>
                </div>
            </div>
        </div>
    </div>
    <imgSlideShow v-if="imgFlag" :src="totalURL" :closeTriger="() => imgCloseTriger()"/>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import userComments from '../userMainPage/userComments.vue'
import { postType, givenType } from "../../tsLibs/auth"
import userUnderPostImg from "../userMainPage/userUnderPostImg.vue"
import imgSlideShow from "../imgSlideShow.vue"
import axios from 'axios'
import userCommentList from './userCommentList.vue'
import { getPic } from "../../tsLibs/funcs";


export default defineComponent({
    name: "userPost",
    props: {
        post: {type: Object as PropType<postType>, required: true},
        user: {type: Object as PropType<givenType>, required: true},
    },
    components: {
        userComments,
        userUnderPostImg,
        imgSlideShow,
        userCommentList
    },
    setup(props) {
        const postComments = ref(props.post.comments)
        const flag = ref(props.post.likes.filter(likes => likes.user.toString() === props.user._id).length > 0 );
        const postTextTemp = ref<string>(props.post.text.toString());
        const loadFlag = ref(false);
        const commentFlag = ref(false);
        const postText = ref("");
        const commentText = ref("");

        if(postTextTemp.value.length > 300){
            postText.value = postTextTemp.value.substring(0,300) + "...";
            loadFlag.value = true;
        }else{
            postText.value = postTextTemp.value;
            loadFlag.value = false;
        }
        let date: Date =new Date(Date.parse(props.post.createdAt.toString()));
        const time = ref(date.getHours() + ':' + date.getMinutes());
        const full = ref(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes());

        watch(commentText, () => {
            const e = document.getElementById('commentTextArea') as HTMLTextAreaElement;
            if(commentText.value == ""){
                console.log("test")
                e.style.height = 'initial'
            }else{
                e.style.height = 'auto';
                e.style.height = e.scrollHeight +'px';
            }
        })
        const focus = () => {
            document.getElementById('commentTextArea')!.focus();
        }

        const allCount = ref(props.post.pictures.length + props.post.videos.length)

        const voicesURL = ref<{}[]>([]);
        props.post.voice_recordings.forEach(element => {
            voicesURL.value.push("https://localhost:8000/upload/files/"+element.toString());
        })

        const totalURL = ref<{}[]>([]);

        props.post.videos.forEach(element => {
            totalURL.value.push({video: "https://localhost:8000/upload/files/"+element.toString(), t: 1});
        })
        props.post.pictures.forEach(element => {
            totalURL.value.push({photo: "https://localhost:8000/upload/files/"+element.toString(), t: 0});
        })

        const imgFlag = ref(false);

        const imgCloseTriger = () => {
            imgFlag.value = false;
            document.body.classList.remove("popupOpen");
        }

        const imgOpenTriger = (index: number) => {
            imgFlag.value=true;
            document.body.classList.add("popupOpen");
        }

        const like = async () => {
            try{
                const response = await axios.post("https://localhost:8000/posts/like/"+ props.user._id + '/' + props.post._id)
                if(!flag.value){
                    props.post.likes.push({_id: props.post._id, user: props.user._id})
                }else{
                    props.post.likes.splice(props.post.likes.findIndex(item => item.user == props.user._id))
                }
                flag.value=!flag.value;
            } catch(error) {
                console.log("**LIKE ERROR**")
            }
        }
        const commentReset=  () =>{
            commentText.value = "";
        }

        const submitComment = async () =>{
            if(commentText.value){
                try{
                    const response = await axios.post("https://localhost:8000/posts/comment/"+props.post._id, {
                        user: props.user._id,
                        text: commentText.value,
                    })
                    commentReset();
                    postComments.value.splice(0, postComments.value.length+1, ...response.data);
                    console.log(postComments)
                    // props.post.comments = response.data.slice(0);
                    // props.post.comments.splice(0, props.post.comments.length)
                    // console.log(props.post.comments)
                    // props.post.comments.splice(0, response.data.length, ...response.data)
                    // console.log(props.post.comments)
                }catch(error){
                    console.log("**COMMENT ERROR**")
                }
            }
        }

        return { loadFlag, flag, postText, postTextTemp, commentFlag, focus, time, full, getPic,
        allCount, voicesURL, totalURL, imgFlag, imgCloseTriger, imgOpenTriger, like, commentText, submitComment, postComments }
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
    -webkit-user-drag: none;
}
.text {
    margin: 13px 0px 0px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.info span {
    font-size: 15px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bolder;
}
.info .time {
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
.middle span {
    overflow-wrap: break-word;
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

.commentUL {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

</style>