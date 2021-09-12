<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal">
                <div class="top">
                    <ul>
                        <li @click="curr=1" :class="{ active: curr===1 }">My Jobs</li>
                        <li @click="curr=2" :class="{ active: curr===2 }">Jobs</li>
                        <li @click="curr=3" :class="{ active: curr===3 }">Requests</li>
                    </ul>
                </div>
                <div class="middle">
                    <myjobs :user="user" :setCurr="setCurr" v-if="curr===1" />
                    <jobs :myId="user._id" v-else-if="curr===2" />
                    <requests :myId="user._id" :postId="currRequests" v-else-if="curr===3" />
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import myjobs from "../components/jobsPage/myJobs.vue";
import jobs from "../components/jobsPage/jobs.vue";
import requests from "../components/jobsPage/requests.vue";
import { loginCheck, givenType } from "../tsLibs/auth";

export default defineComponent({
    name: "jobsPage",
    components: {
        navBar,
        Footer,
        myjobs,
        jobs,
        requests,
    },
    async setup() {
        const user = ref<givenType>();
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })

        const curr= ref(2);

        const currRequests = ref("")

        const setCurr = (c: string) =>{
            currRequests.value = c;
            curr.value = 3;
        }

        return { curr, user, currRequests, setCurr }
    },
})
</script>
<style scoped>
.big {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.external {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
.internal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    min-width: max-content;
    /* min-width: 60%; */
    width: 60%;
    border-radius: 25px;
    padding-bottom: 20px;
}
.top {
    width: 100%;
}
.top ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    border-bottom: solid;
    border-width: 4px;
    background-color: rgb(73, 73, 73);
    border-radius: 25px;
}
.top ul li {
    padding: 20px;
    font-size: 35px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    position: relative;
    color: white;
}
.top ul li:hover {
    background-color: rgba(0, 0, 0, 0.116);
    cursor: pointer;
    box-shadow: 0 4px 0 rgb(255, 255, 255);
}
.active {
    box-shadow: 0 4px 0 rgb(255, 255, 255);
}

.middle {
    flex: 1;
}
</style>