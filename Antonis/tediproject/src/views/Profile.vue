<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal">
                <div class="top">
                    <label for="img">
                    <img
                        src="@/assets/blank-profile-picture.png"
                        width="185"
                        height="185"
                    />
                    </label>
                    <input type="file" id="img" accept="image/*"/>
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
                            <span>Student at National & Kapodistrian University of Athens</span>
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
                            <ul>
                                <li v-for="skill in skills" :key="skill">
                                    {{ skill }}
                                </li>
                            </ul>
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
    <editEducation v-if="educationFlag" :close="()=>{educationFlag=false;}"/>
    <editSkills v-if="skillsFlag" :close="()=>{skillsFlag=false;}" :curr="skills"/>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import editEducation from "../components/profilePage/editEducation.vue"
import editSkills from "../components/profilePage/editSkills.vue"

export default defineComponent({
    name: "Profile",
    components: {
        navBar,
        Footer,
        editEducation,
        editSkills
    },
    setup() {
        const educationFlag = ref(false);
        const skillsFlag = ref(false);
        const skills = reactive(["second", "third", "forth", "first", "second", "third", "forth", "first", "second", "third", "forth", "first", "second", "third", "forth"]);
        // const skills = reactive(["second", "third", "forth", "first", "second"]);
        return { skills, educationFlag, skillsFlag }
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
.top label:hover {
    cursor: pointer;
}
.top input {
    display: none;
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
.edit {
    display: flex;
    align-items: center;
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
</style>