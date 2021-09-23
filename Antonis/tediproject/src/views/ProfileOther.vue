<template>
    <div class="big">
        <navBar />
        <div class="external" v-if="userOther">
            <div class="internal">
                <div class="top">
                    <img
                        :src="getPic(userOther.ProfilePic)"
                        width="185"
                        height="185"
                    />
                    <div class="top-text">
                        <span>{{ userOther.name }}</span>
                    </div>
                    <div class="btn">
                        <button @click="msg()" v-if="userOther.friends">Message!</button>
                        <button @click="connect()" v-else>Connect!</button>
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
                            <span v-if="jobFlag">{{ job }}</span>
                            <span v-else>No information available</span>
                        </div>
                    </div>
                    <div class="prof-exp">
                        <div class="curr">
                            <img
                                src="@/assets/outline_school_black_24dp.png"
                                width="35"
                                height="35"
                            />
                            <span v-if="educationFlag">{{ education }}</span>
                            <span v-else>No information available</span>
                        </div>
                    </div>
                    <div class="skill-tags">
                        <div class="tags-curr">
                            <img
                                src="@/assets/pencil.png"
                                width="35"
                                height="35"
                            />
                            <ul v-if="skillsFlag">
                                <li v-for="skill in skills" :key="skill">
                                    {{ skill }}
                                </li>
                            </ul>
                            <span v-else>No information available</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import editEducation from "../components/profilePage/editEducation.vue"
import editSkills from "../components/profilePage/editSkills.vue"
import { useRoute } from 'vue-router';
import axios from 'axios';
import { getPic } from "../tsLibs/funcs";
import { loginCheck, givenType, otherProfileType } from "../tsLibs/auth"
import router from '../router'

export default defineComponent({
    name: "Profile",
    components: {
        navBar,
        Footer,
        editEducation,
        editSkills
    },
    async setup() {
        const route = useRoute();
        const input = route.params.input
        const user = ref<givenType>();
        await loginCheck().then((data: givenType) =>{
             user.value = data;
        })

        const educationFlag = ref(false);
        const education = ref("");
        const skillsFlag = ref(false);
        const skills = ref<String[]>([]);
        const jobFlag = ref(false);
        const job = ref("");
        
        const userOther = ref<otherProfileType>();
        watchEffect(async() => {
            if(input && user.value)
            try {
                console.log('test')
                const response = await axios.get("https://localhost:8000/users/profile/"+input+'/'+user.value?._id);
                // console.log(response.data)

                userOther.value = response.data
                // console.log(userOther.value)

                 if(userOther.value){
                     if(userOther.value.friends){
                         if(userOther.value.Skills && userOther.value.Skills.skills.length){
                             skills.value = userOther.value.Skills.skills
                             skillsFlag.value = true
                         }
                         if(userOther.value.Education && userOther.value.Education.string){
                             education.value = userOther.value.Education.string
                             educationFlag.value = true;
                         }
                         if(userOther.value.Experience && userOther.value.Experience.Experience.length){
                             job.value = userOther.value.Experience.Experience[0]
                             jobFlag.value = true
                         }
                     }else{
                         if(userOther.value.Skills && !(userOther.value.Skills.private) && userOther.value.Skills.skills.length){
                             skills.value = userOther.value.Skills.skills
                             skillsFlag.value = true;
                         }
                         if(userOther.value.Education && !(userOther.value.Education.private) && userOther.value.Education.string){
                             education.value = userOther.value.Education.string
                             educationFlag.value = true;
                         }
                         if(userOther.value.Experience && !(userOther.value.Experience.private) && userOther.value.Experience.Experience.length){
                             job.value = userOther.value.Experience.Experience[0]
                             jobFlag.value = true;
                         }
                        
                     }
                 }

            }catch(error){
                console.log("**SEARCH ERROR**")
            }  
        })
        
        const connect = async() =>{
            try {
                const response = await axios.post("https://localhost:8000/users/connect/"+ user.value!._id +'/'+ route.params.input)
            }catch(err){
                console.log("**CONNECT ERRR**")
            }
        }

        const msg = async() => {
            // console.log("test")
            try {
                const response = await axios.post("https://localhost:8000/chat/get/"+user.value!._id+"/"+route.params.input)
                router.push({path: "/communication"})
                

            }catch(err){
                console.log("**CONNECT ERRR**")
            }
        }

        return { skills, educationFlag, skillsFlag, getPic, education, user, userOther, connect, msg, jobFlag, job }
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
    margin-bottom: 20px;
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
}
.top-text span {
    font-size: 35px;
    font-weight: bolder;
    opacity: 0.9;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.btn {
    display: flex;
    justify-content: space-between;
    margin: 10px;
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
}
.curr span {
    font-size: 18px;
    font-weight: bold;
    opacity: 0.9;
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
.tags-curr img {
    /* background-color: rgb(240, 240, 240); */
    border-radius: 10px;
    padding: 5px;
    margin-right: 15px;
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

.tags-curr span {
    font-size: 18px;
    font-weight: bold;
    opacity: 0.9;
}
</style>