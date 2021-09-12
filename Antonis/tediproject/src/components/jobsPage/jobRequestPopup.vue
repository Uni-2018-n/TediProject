<template>
    <div class="external">
        <div class="internal">
            <div class="left">
                <img
                :src="getPic(src.avatar)"
                width="155"
                height="155"
                />
            </div>
            <div class="right">
                <span>{{ src.Description }}</span>
                <div class="skills">
                    <ul>
                        <li v-for="(skill, index) in src.Skills" :key="index">
                            <span>{{skill}}</span>
                        </li>
                    </ul>
                </div>
                <div class="resume">
                    <span v-if="fileName">{{fileName}}</span>
                    <span v-else>No resume provided</span>
                </div>
                <div class="btns">
                    <button class="btn accept">Accept</button>
                    <button class="btn reject">Reject</button>
                </div>
            </div>
        </div>
    <a @click="close" class="close" />
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, PropType, ref, watch } from 'vue'
import router from "../../router/index"
import { jobType } from '../../tsLibs/jobs'
import { getPic } from "../../tsLibs/funcs";

export default defineComponent({
    name: "jobIntrestPopup",
    props: {
        src: {type: Object as PropType<jobType>, required: true},
        close: {type: Function, required: true},
    },
    setup(props) {
        const text = ref("");
        // /upload/files/+filename //TODO
        watch(text, () =>{
            const e = document.getElementById('postTextArea') as HTMLTextAreaElement;
            if(text.value == ""){
                e.style.height = 'initial'
            }else{
                e.style.height = 'auto';
                e.style.height = e.scrollHeight +'px';
            }
        })

        const focus = () => {
            document.getElementById('postTextArea')!.focus();
        }

        const applyForJob = async() => {
            if(text.value != '' && currSkills.value.length != 0){
                try {
                    // const response = await axios.post("https://localhost:8000/jobs", {
                    //     author: props.userId,
                    //     Description: text.value,
                    //     Skills: currSkills.value,
                    // })
                    router.go(0)
                }catch(error){
                    console.log("***ERROR POST JOB***")
                }
            }
        }

        const currSkills = ref<String[]>([])
        const currSkilltxt = ref("")
        const skillRemove = (indx: number) =>{
            currSkills.value.splice(indx, 1);
        }
        
        const skillAppend = () =>{
            if(currSkilltxt.value != "")
            if(currSkills.value.includes(currSkilltxt.value)) {
                currSkilltxt.value = "";
            }else{
                currSkills.value.push(currSkilltxt.value);
                currSkilltxt.value ="";
            }
        }

        const photo = ref<File>()
        const fileName = ref("")

        const selectedFile = (event: Event) => {
            if(event){
                if(((event.target as HTMLInputElement).files as FileList)[0].size > 100000){

                console.log('error image more than 50k') //TODO
                }else{
                photo.value = ((event.target as HTMLInputElement).files as FileList)[0]
                fileName.value = photo.value.name
                }
            }
        }

        return { text,focus, applyForJob, currSkills, currSkilltxt, skillRemove, skillAppend, selectedFile, fileName, getPic }
    },
})
</script>
<style scoped>
.external {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}
.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.7;
}
.close:hover {
  opacity: 1;
  cursor: pointer;
}
.close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
.internal {
    background-color: rgb(255, 255, 255);
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: row;
    padding: 1em 1em 1em 1em;
    border-radius: 25px;
    min-width: 300px;
    width: 30%;
}

.left img {
    border-radius: 100px;
    float: left;
    margin-right: 5px;
}

.right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.skills {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.skills ul {
    list-style-type: none;
    padding: 0;
    margin: 10px 0 0px 0;
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

.resume {
    margin: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.resume span {
    flex:1;
    padding: 5px;
    white-space: nowrap;
    display: inline-block;
    overflow: hidden !important;
    text-overflow: ellipsis;
    font-size: 16px;
    max-width: 70%;
}

.resume span:hover {
    cursor: pointer;
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