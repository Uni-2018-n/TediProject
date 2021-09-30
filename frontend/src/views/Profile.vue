<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal">
                <div class="top">
                    <label for="img">
                    <img
                        :src="currPic"
                        width="185"
                        height="185"
                    />
                    </label>
                    <div class="btn">
                        <button @click="updatePic()">update photo</button>
                    </div>
                    <input @change="selectedFile" type="file" name="file" id="img" accept="image/*"/>
                    <div class="top-text">
                        <span>{{ user.firstname }} {{ user.lastname }}</span>
                    </div>
                </div>
                <div class="middle">
                    <div class="prof-exp">
                        <div class="curr">
                            <img
                                src="@/assets/outline_work_outline_black_24dp.png"
                                width="35"
                                height="35"
                            />
                            <span v-if="job">{{ job }}</span>
                            <span v-else>No Information</span>
                        </div>
                        <div class="edit">
                            <img @click="jobsFlag=true;"
                                src="@/assets/outline_edit_black_24dp.png"
                                width="35"
                                height="35"
                            />
                        </div>
                    </div>
                    <div class="prof-exp">
                        <div class="curr">
                            <img
                                src="@/assets/outline_school_black_24dp.png"
                                width="35"
                                height="35"
                            />
                            <span v-if="education">{{ education }}</span>
                            <span v-else>No Information</span>
                        </div>
                        <div class="edit">
                            <img @click="educationFlag=true;"
                                src="@/assets/outline_edit_black_24dp.png"
                                width="35"
                                height="35"
                            />
                        </div>
                    </div>
                    <div class="skill-tags">
                        <div class="tags-curr">
                            <img
                                src="@/assets/pencil.png"
                                width="35"
                                height="35"
                            />
                            <ul v-if="skills.length">
                                <li v-for="skill in skills" :key="skill">
                                    {{ skill }}
                                </li>
                            </ul>
                            <span v-else>No information</span>
                        </div>
                        <div class="edit">
                            <img @click="skillsFlag=true;"
                                src="@/assets/outline_edit_black_24dp.png"
                                width="35"
                                height="35"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    <editEducation v-if="educationFlag" :id="user._id" :private="educationPrivate" :curr="education" :close="()=>{educationFlag=false;}"/>
    <editSkills v-if="skillsFlag" :id="user._id" :private="skillsPrivate" :close="()=>{skillsFlag=false;}" :curr="skills"/>
    <editWork v-if="jobsFlag" :id="user._id" :private="workPrivate" :close="()=>{jobsFlag=false;}" :curr="jobs"/>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import editEducation from "../components/profilePage/editEducation.vue"
import editSkills from "../components/profilePage/editSkills.vue"
import editWork from "../components/profilePage/editWork.vue"
import { loginCheck, givenType, updateUser } from "../tsLibs/auth";
import { getPic } from "../tsLibs/funcs";
import axios from 'axios';
import router from "../router/index"

export default defineComponent({
    name: "Profile",
    components: {
        navBar,
        Footer,
        editEducation,
        editSkills,
        editWork,
    },
    async setup() {
        const user = ref<givenType>();
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })
        const currPic = ref(getPic(user.value!.ProfilePic));
        const photo = ref<File>()

        const skills = ref<String[]>([]);
        const skillsPrivate = ref<Boolean>();
        const jobs = ref<String[]>([]);
        const job = ref("");
        const workPrivate = ref<Boolean>();
        const education = ref("");
        const educationPrivate = ref<Boolean>();
        if(user.value)
        try {
            const response = await axios.get("https://localhost:8000/users/profile/"+user.value._id+"/"+user.value._id)
            skills.value = response.data.Skills.skills;
            skillsPrivate.value = response.data.Skills.private;
            education.value = response.data.Education.string;
            educationPrivate.value = response.data.Education.private;
            jobs.value = response.data.Experience.Experience;
            workPrivate.value = response.data.Experience.private;
            if(jobs.value.length != 0){
                job.value = jobs.value[0].toString();
            }else{
                job.value = '';
            }
        }catch(error){
            console.log("**GET DATA ERROR**")
        }
        
        const educationFlag = ref(false);
        const skillsFlag = ref(false);
        const jobsFlag = ref(false);

        const updatePic = async () =>{
            if(photo.value){
                const fd = new FormData();
                fd.append('file', photo.value!)
                if(user.value)
                try {
                    const response = await axios.patch("https://localhost:8000/users/"+user.value._id, fd, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    // console.log(response.data)
                    // console.log("test")
                    user.value = updateUser(response.data)
                    router.go(0)
                }catch(error){
                    console.log("**UPDATE ERROR**")
                }
            }
        }

        const selectedFile = (event: Event) => {
            if(event){
                photo.value = ((event.target as HTMLInputElement).files as FileList)[0]
                currPic.value = URL.createObjectURL(photo.value);
            }
        }

        return { user, education, educationPrivate, skills, skillsPrivate, educationFlag, skillsFlag, getPic, updatePic, currPic, selectedFile,
        jobsFlag, jobs, job, workPrivate }
    },
})
</script>
<style scoped>
.big {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.external {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 0px 20px 0px;
    width: 100%;
}
.internal {
    background-color: white;
    border-radius: 35px;
    width: 60%;
    height: 100%;
    padding-bottom: 10px;
}
.top {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: solid;
    border-width: 1px;
    border-color: rgba(136, 136, 136, 0.473);
}
.top img{
    border-radius: 150px;
    margin-bottom: 35px;
    -webkit-user-drag: none;
}
.top-text span {
    font-size: 35px;
    font-weight: bolder;
    opacity: 0.9;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.top label:hover {
    cursor: pointer;
}
.top input {
    display: none;
}

.btn {
    display: flex;
    justify-content: space-between;
}
.btn button {
    background-color: rgb(66, 132, 255);
    padding: 5px 15px 5px 15px;
    font-size: 16px;
    color: rgb(235, 235, 235);
    border: none;
    border-radius: 35px;
}
.btn button:hover{
    cursor: pointer;
    background-color: rgb(139, 176, 245);
}

.middle {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
}
.prof-exp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 20px 0px 20px;
    margin-bottom: 20px;
}
.curr {
    display: flex;
    align-items: center;
}
.curr img{
    margin-right: 15px;
    /* background-color: rgb(240, 240, 240); */
    border-radius: 25px;
    padding: 5px;
    -webkit-user-drag: none;
}
.curr span {
    font-size: 18px;
    font-weight: bold;
    opacity: 0.9;
}
.edit {
    display: flex;
    align-items: center;
}
.edit img {
    -webkit-user-drag: none;
}
.edit img:hover {
    opacity: 0.7;
    cursor:  pointer;
}
.skill-tags {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 20px 0px 20px;
}
.tags-curr {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.tags-curr span {
    font-size: 18px;
    font-weight: bold;
    opacity: 0.9;
}
.tags-curr img {
    /* background-color: rgb(240, 240, 240); */
    border-radius: 10px;
    padding: 5px;
    margin-right: 15px;
    -webkit-user-drag: none;
}
.tags-curr ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.tags-curr ul li {
    display: inline-block;
    margin: 5px;
    padding: 10px;
    border: solid;
    border-width: 2px;
    border-color: rgb(238, 238, 238);
    border-radius: 25px;
    transition: background-color 0.2s;
}
.tags-curr ul li:hover {
    background-color: rgba(135, 206, 250, 0.644);
    cursor: pointer;
}
</style>