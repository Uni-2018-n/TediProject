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
                    <a v-if="src.Bio_file" :href="'https://localhost:8000/upload/files/'+src.Bio_file" target="_blank">Get resume</a>
                    <span v-else>No resume provided</span>
                </div>
            </div>
        </div>
    <a @click="close" class="close" />
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { applicationType } from '../../tsLibs/jobs'
import { getPic } from "../../tsLibs/funcs";

export default defineComponent({
    name: "jobIntrestPopup",
    props: {
        src: {type: Object as PropType<applicationType>, required: true},
        close: {type: Function, required: true},
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

        const photo = ref<File>()
        const fileName = ref("")

        const selectedFile = (event: Event) => {
            if(event){
                photo.value = ((event.target as HTMLInputElement).files as FileList)[0]
                fileName.value = photo.value.name
            }
        }

        return { text,focus, currSkills, currSkilltxt, skillRemove, skillAppend, selectedFile, fileName, getPic }
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

.resume a {
    flex:1;
    padding: 5px;
    font-size: 16px;
}

.resume a:hover {
    cursor: pointer;
}

.resume a, .resume a:visited, .resume a:hover, .resume a:active {
  color: inherit;
}

.resume span {
    flex:1;
    padding: 5px;
    font-size: 16px;
}
</style>