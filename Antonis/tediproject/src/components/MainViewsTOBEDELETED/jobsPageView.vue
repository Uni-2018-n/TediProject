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
                    <myjobs v-if="curr===1" />
                    <jobs v-else-if="curr===2" />
                    <requests v-else-if="curr===3" />
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import navBar from "../../components/navBar.vue";
import Footer from "../../components/footer.vue";
import myjobs from "../../components/jobsPage/myJobs.vue";
import jobs from "../../components/jobsPage/jobs.vue";
import requests from "../../components/jobsPage/requests.vue";

export default defineComponent({
    name: "jobsPageView",
    components: {
        navBar,
        Footer,
        myjobs,
        jobs,
        requests,
    },
    setup() {
        const curr= ref(3);
        return { curr }
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
}
.internal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    min-width: 60%;
    max-width: 80%;
    border-radius: 25px;
    margin-bottom: 20px;
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