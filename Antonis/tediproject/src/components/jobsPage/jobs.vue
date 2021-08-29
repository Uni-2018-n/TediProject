<template>
    <div class="external">
        <div class="internal">
            <ul>
                <li v-for="post in posts" :key="post">
                    <userJob :name="post.name" :text="post.text" :intrest="post.intrested" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import userJob from '../jobsPage/userJob.vue';

export default defineComponent({
    name: "jobs",
    components: {
        userJob,
    },
    setup() {
        const posts = reactive([
            {
                name: "Antonis Kalamakis",
                text: "She who arrival end how fertile enabled. Brother she add yet see minuter natural smiling article painted. Themselves at dispatched interested insensible am be prosperous reasonably it. In either so spring wished. Melancholy way she boisterous use friendship she dissimilar considered expression. Sex quick arose mrs lived. Mr things do plenty others an vanity myself waited to. Always parish tastes at as mr father dining at. ",
                intrested: false,
            },
        ])
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

</style>