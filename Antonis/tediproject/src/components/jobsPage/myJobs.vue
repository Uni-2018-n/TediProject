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
                                <span @click="router.push({path: '/profile'})" >{{ user.firstname }} {{ user.lastname }}</span>
                            </div>
                        </div>
                        <textarea v-model="desc" id="postTextArea" @input="resize($event)" :class="{ textError: textFlag }" rows="1" placeholder="Type Here..."></textarea>
                    </div>
                    <div class="skills">
                        <input @keyup.enter.prevent="skillAppend()" v-model="currSkilltxt" class="skillInput" :class="{ currSkillError: currSkillsFlag }" type="text" placeholder="Add a skill"/>
                        <ul>
                            <li v-for="(skill, index) in currSkills" :key="index">
                                <span @click="skillRemove(index)">{{skill}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="postButton">
                    <button @click="postJob()">Post!</button>
                </div>
            </div>
            <div class="rest">
                <ul>
                    <li v-for="post in posts" :key="post">
                        <userJob :src="post" :userId="user._id" :setCurr="setCurr" :my="true"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <loading v-if="loadingFlag"/>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, PropType, ref } from 'vue';
import userJob from '../jobsPage/userJob.vue';
import { jobType } from '../../tsLibs/jobs';
import { givenType } from "../../tsLibs/auth";
import {getPic} from '../../tsLibs/funcs'
import router from "../../router/index"
import loading from "../loading.vue"

export default defineComponent({
    name: "myJobs",
    components: {
        userJob,
        loading,
    },
    props: {
        user: {type: Object as PropType<givenType>, required: true},
        setCurr: {type: Function, required: true},
    },
    async setup(props) {
        const desc = ref("");
        const posts = ref<jobType[]>()
        try{ 
            const response = await axios.get("https://localhost:8000/jobs/my_jobs/"+props.user._id);
            // console.log(response.data)
            posts.value = response.data
        }catch(error){
            console.log("**MY JOBS ERROR**")
        }
        const loadingFlag = ref(false);

        const textFlag = ref(false);
        const currSkillsFlag = ref(false);

        const resize = (e: Event) => {
            textFlag.value = false;
            (e.target as HTMLTextAreaElement).style.height = 'auto';
            (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight +'px';
        }

        const postJob = async() => {
            if(desc.value != '' && currSkills.value.length != 0){
                loadingFlag.value=true;
                try {
                    const response = await axios.post("https://localhost:8000/jobs", {
                        author: props.user._id,
                        Description: desc.value,
                        Skills: currSkills.value,
                    })
                    router.go(0)
                    loadingFlag.value=false;
                }catch(error){
                    loadingFlag.value=false;
                    console.log("***ERROR POST JOB***")
                }
            }else{
                if(desc.value === ''){
                    textFlag.value = true;
                }
                if(currSkills.value.length === 0){
                    currSkillsFlag.value = true;
                }

            }
        }

        const currSkills = ref<String[]>([])
        const currSkilltxt = ref("")
        const skillRemove = (indx: number) =>{
            currSkills.value.splice(indx, 1);
        }
        
        const skillAppend = () =>{
            currSkillsFlag.value = false;
            if(currSkilltxt.value != "")
            if(currSkills.value.includes(currSkilltxt.value)) {
                currSkilltxt.value = "";
            }else{
                currSkills.value.push(currSkilltxt.value);
                currSkilltxt.value ="";
            }
        }


        return { resize, posts, getPic, currSkills, currSkilltxt, skillAppend, skillRemove, desc, loadingFlag, postJob, router, currSkillsFlag, textFlag }
    },
})
</script>
<style scoped>
.external {
    width: 100%;
    height: 100%;
}
.internal {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.outer-input {
    margin-top: 15px;
    margin-bottom: 5px;
    border-radius: 15px;
    background-color: rgb(248, 248, 248);
    display: flex;
    flex-direction: column;
    width: 450px;
}

.inner-input {
    min-height: 100px;
    display: flex;
    justify-content:space-between;
    flex-direction:column;
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
.text-input span:hover {
    cursor: pointer;
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


.inner-input .textError{
    border-style: solid solid solid solid;
    border-width: 2px;
    border-color: rgb(255, 0, 0);
    border-radius: 10px;
    padding: 10px;
}

.skills {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.skills input {
    background-color: transparent;
    border: solid;
    border-radius: 25px;
    border-color: rgba(211, 211, 211, 0.473);
    font-size: 19px;
    line-height: 30px;
    text-align: center;
    min-width: 40%;
}
.skills input:focus {
    outline: none;
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

.skills .currSkillError {
    border-color: rgba(212, 0, 0, 0.473);
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

</style>