<template>
    <div class="external">
        <div class="internal">
            <textarea v-model="text" id="postTextArea" rows="1" placeholder="Type Here..."></textarea>
            <div class="skills">
                <input @keyup.enter.prevent="skillAppend()" v-model="currSkilltxt" class="skillInput" type="text" placeholder="Add a skill"/>
                <ul>
                    <li v-for="(skill, index) in currSkills" :key="index">
                        <span @click="skillRemove(index)">{{skill}}</span>
                    </li>
                </ul>
            </div>
            <div class="resume">
                <input @change="selectedFile" type="file" name="file" id="file"/>
                <span>{{fileName}}</span>
                <label for="file">Select Resume</label>
            </div>
            <div class="postButton">
                <button @click="applyForJob()">Post!</button>
            </div>
        </div>
    <a @click="close" class="close" />
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, watch } from 'vue'
import router from "../../router/index"

export default defineComponent({
    name: "jobIntrestPopup",
    props: {
        userId: {type: String, required: true},
        close: {type: Function, required: true},
        jobId: {type: String, required: true},
    },
    setup(props) {
        const text = ref("");
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

        const file = ref<File>()
        const fileName = ref("")

        const selectedFile = (event: Event) => {
            if(event){
                file.value = ((event.target as HTMLInputElement).files as FileList)[0]
                fileName.value = file.value.name
            }
        }

        const applyForJob = async() => {
            if(text.value != '' && currSkills.value.length != 0 && fileName.value != ''){
                const fd = new FormData();
                fd.append('author', props.userId)
                fd.append('Description', text.value)
                fd.append('Skills', JSON.stringify(currSkills.value))
                fd.append('file', file.value!)
                try {
                    const response = await axios.post('https://localhost:8000/jobs/'+props.jobId, fd, { //TODO
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    router.go(0)
                }catch(error){
                    console.log("***ERROR APPLY TO JOB***")
                }
            }
        }
        return { text,focus, applyForJob, currSkills, currSkilltxt, skillRemove, skillAppend, selectedFile, fileName }
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
    flex-direction: column;
    align-items: center;
    padding: 1em 4em 4em 4em;
    border-radius: 25px;
    min-width: 300px;
    width: 30%;
}
.internal textarea {
    margin: 5px 15px 15px 15px;
    background: transparent;
    border: none;
    resize: none;
    font-size: 15px;
    width: 100%;
    height: 50%;
    
}
.internal textarea:focus {
    outline: none !important;
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

.resume {
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.resume input {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.resume span {
    flex:1;
    border: solid;
    border-width: 1px;
    padding: 5px;
    white-space: nowrap;
    display: inline-block;
    overflow: hidden !important;
    text-overflow: ellipsis;
    max-width: 70%;
}

.resume label {
    padding: 5px;
    border: solid;
    border-width: 1px;
    border-color: rgb(161, 161, 161);
    min-width: max-content;
}

.resume label:hover{ 
    cursor: pointer;
}



.postButton {
    padding: 0;
    margin: 0;
    text-align: center;
    width: 100%;
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