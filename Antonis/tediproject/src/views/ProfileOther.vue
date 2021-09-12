<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal">
                <div class="top">
                    <img
                        src="@/assets/blank-profile-picture.png"
                        width="185"
                        height="185"
                    />
                    <div class="top-text">
                        <span>Antonis Kalamakis</span>
                    </div>
                </div>
                <div class="middle">
                    <div class="prof-exp">
                        <div class="curr">
                            <img
                                src="@/assets/outline_school_black_24dp.png"
                                width="35"
                                height="35"
                            />
                            <span v-if="educationFlag">Student at National & Kapodistrian University of Athens</span>
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
                            <span>No information available</span>
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
import { loginCheck, givenType, networkUserType, otherProfileType } from "../tsLibs/auth"

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
        const user = ref<givenType>();
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })
        const userOther = ref<otherProfileType>();
        const educationFlag = ref(false);
        const education = ref("");
        const skillsFlag = ref(false);
        const skills = ref<String[]>([]);
        watchEffect(async() => {
            try {
                const response = await axios.get("https://localhost:8000/users/profile/"+route.params.input+'/'+user.value?._id);
                // console.log(response.data)
                userOther.value = response.data
                // console.log(userOther.value)
            }catch(error){
                console.log("**SEARCH ERROR**")
            }  
        })
        return { skills, educationFlag, skillsFlag, getPic, education, user, userOther }
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