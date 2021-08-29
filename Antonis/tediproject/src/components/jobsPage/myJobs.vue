<template>
    <div class="external">
        <div class="internal">
            <div class="top">
                <div class="outer-input">
                    <div class="inner-input">
                        <div class="top-input">
                            <img
                            src="@/assets/blank-profile-picture.png"
                            width="55"
                            height="55"
                            />
                            <div class="text-input">
                                <span>Antonis Kalamakis</span>
                            </div>
                        </div>
                        <textarea id="postTextArea" @input="resize($event)" rows="1" placeholder="Type Here..."></textarea>
                    </div>
                </div>
            </div>
            <div class="rest">
                <ul>
                    <li v-for="post in posts" :key="post">
                        <userJob :name="post.name" :text="post.text" :intrest="post.intrested"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import userJob from '../jobsPage/userJob.vue';

export default defineComponent({
    name: "myJobs",
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

        const resize = (e: Event) => {
            (e.target as HTMLTextAreaElement).style.height = 'auto';
            (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight +'px';
        }

        return { resize, posts }
    },
})
</script>
<style scoped>
.rest ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
}
.rest ul li {
    margin-top: 15px;
}
.rest ul li:first-child {
    margin-top: 0px;
}

.outer-input {
    margin-top: 15px;
}

.inner-input {
    width: 450px;
    min-height: 100px;
    display: flex;
    justify-content:space-between;
    flex-direction:column;
    border-radius: 15px;
    background-color: rgb(248, 248, 248);
}
.top-input {
    padding: 5px;
}
.top-input img {
    border-radius: 30px;
    float: left;
    margin-right: 5px;
}
.text-input {
    margin-top: 13px;
}
.text-input span {
    font-size: 18px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bolder;
}

textarea {
    margin: 5px 15px 15px 15px;
    background: transparent;
    border: none;
    resize: none;
    font-size: 16px;
}
textarea:focus {
    outline: none !important;
}
</style>