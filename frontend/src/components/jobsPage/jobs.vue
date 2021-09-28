<template>
    <div class="external">
        <div class="internal">
            <ul v-if="posts.length">
                <li v-for="post in posts" :key="post">
                    <userJob :src="post" :userId="myId" :my="false"/>
                </li>
            </ul>
            <div class="else" v-else>
                <span>No Jobs Available</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import userJob from '../jobsPage/userJob.vue';
import { jobType } from '../../tsLibs/jobs'

export default defineComponent({
    name: "jobs",
    props: {
        myId: {type: String, required: true},
    },
    components: {
        userJob,
    },
    async setup(props) {
        const posts = ref<jobType[]>()
        try {
            const response = await axios.get("https://localhost:8000/jobs/"+props.myId)
            posts.value = response.data.all_jobs
        }catch(error){
            console.log("**GET JOBS ERROR**")
        }
        return { posts }
    },
})
</script>
<style scoped>
.internal ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}
.internal ul li {
    margin-top: 15px;
}

.else {
    text-align: center;
    margin: 25px;
}
.else span {
    font-size: 40px;
    font-weight: bolder;
    color: rgb(116, 116, 116);
}
</style>