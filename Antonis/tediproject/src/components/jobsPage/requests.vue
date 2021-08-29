<template>
    <div class="external">
        <div class="internal">
            <ul v-if="requests.length">
                <li v-for="request in requests" :key="request">
                    <userRequests :name="request.name" :flag="request.flag" />
                </li>
            </ul>
            <div class="else" v-else>
                <span>No information available</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import userRequests from '../jobsPage/userRequests.vue';

export default defineComponent({
    name: "requests",
    components: {
        userRequests,
    },
    setup() {
        const requests = reactive([
            {
                name: "Antonis Kalamakis",
                flag: false,
            },
            {
                name: "Antonis Kalamakis",
                flag: false,
            },
            {
                name: "Antonis Kalamakis",
                flag: false,
            }
        ])
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