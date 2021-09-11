<template>
    <div class="external">
        <div class="internal">
            <div class="top">
                <div class="outer-input">
                    <div class="inner-input">
                        <div class="top-input">
                            <img
                            :src="getPic(user.ProfilePic)"
                            width="55"
                            height="55"
                            />
                            <div class="text-input">
                                <span>{{ user.firstname }} {{ user.lastname }}</span>
                            </div>
                        </div>
                        <textarea id="postTextArea" @input="resize($event)" rows="1" placeholder="Type Here..."></textarea>
                    </div>
                    <div class="postButton">
                        <button @click="post()">Post!</button>
                    </div>
                </div>
            </div>
            <div class="rest">
                <ul>
                    <li v-for="post in posts" :key="post">
                        <userJob :src="post" :setCurr="setCurr" :my="true"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, PropType, reactive, ref } from 'vue';
import userJob from '../jobsPage/userJob.vue';
import { jobType } from '../../tsLibs/jobs';
import { givenType } from "../../tsLibs/auth";
import {getPic} from '../../tsLibs/funcs'

export default defineComponent({
    name: "myJobs",
    components: {
        userJob,
    },
    props: {
        user: {type: Object as PropType<givenType>, required: true},
        setCurr: {type: Function, required: true},
    },
    async setup(props) {
        const posts = ref<jobType[]>()
        try{ 
            const response = await axios.get("https://localhost:8000/jobs/my_jobs/"+props.user._id);
            // console.log(response.data)
            posts.value = response.data
        }catch(error){
            console.log("**MY JOBS ERROR**")
        }

        const resize = (e: Event) => {
            (e.target as HTMLTextAreaElement).style.height = 'auto';
            (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight +'px';
        }

        const postJob = async() => {
            try {
                // const response = await axios.post("https://localhost:8000/jobs", {
                //     author: ,
                //     Description: ,
                //     Skills: [],
                // })
            }catch(error){
                console.log("***ERROR POST JOB***")
            }
        }

        return { resize, posts, getPic }
    },
})
</script>
<style scoped>
.rest ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
}
.rest ul li {
    margin-top: 15px;
}
.rest ul li:first-child {
    margin-top: 0px;
}

.outer-input {
    margin-top: 15px;
}

.inner-input {
    width: 450px;
    min-height: 100px;
    display: flex;
    justify-content:space-between;
    flex-direction:column;
    border-radius: 15px;
    background-color: rgb(248, 248, 248);
}
.top-input {
    padding: 5px;
}
.top-input img {
    border-radius: 30px;
    float: left;
    margin-right: 5px;
}
.text-input {
    margin-top: 13px;
}
.text-input span {
    font-size: 18px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bolder;
}

textarea {
    margin: 5px 15px 15px 15px;
    background: transparent;
    border: none;
    resize: none;
    font-size: 16px;
}
textarea:focus {
    outline: none !important;
}

.postButton {
    padding: 0;
    margin: 0;
    text-align: center;
}
.postButton button {
    border: none;
    background-color: rgb(25, 119, 242);
    color: white;
    width: 80%;
    padding: 1.5%;
    border-radius: 10px;
    font-weight: bold;
    font-size: 19px;
    transition: all 0.25s;
}
.postButton button:hover{
    background-color: rgb(20, 95, 192);
    cursor: pointer;
}
</style>