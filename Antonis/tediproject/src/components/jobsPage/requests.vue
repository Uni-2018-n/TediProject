<template>
    <div class="external">
        <div class="internal">
            <ul v-if="requests && requests.length">
                <li v-for="request in requests" :key="request">
                    <userRequests :src="request" />
                </li>
            </ul>
            <div class="else" v-else>
                <span>No information available</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue'
import userRequests from '../jobsPage/userRequests.vue';
import { applicationType } from '../../tsLibs/jobs'

export default defineComponent({
    name: "requests",
    components: {
        userRequests,
    },
    props: {
        myId: {type: String, required: false},
        postId: {type: String, required: false},
    },
    async setup(props) {
        const requests = ref<applicationType[]>();
        if(props.myId && props.postId){
            try {
                const response = await axios.get("https://localhost:8000/jobs/applications/"+props.postId)
                console.log(response.data)
                requests.value = response.data
            }catch(error){
                console.log("")
            }
        }
        return { requests }
    },
})
</script>
<style scoped>
.internal ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
    margin: 40px 0 0px 0;
}
.internal ul li {
    margin-bottom: 25px;
}
</style>