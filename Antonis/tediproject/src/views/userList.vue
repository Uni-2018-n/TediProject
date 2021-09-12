<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal">
                <ul>
                    <li @click="go(user._id)" v-for="user in searchCurr" :key="user">
                        <userCard :src="user"/>
                    </li>
                </ul>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import userCard from "../components/userListPage/userCard.vue"
import {userListType} from '../tsLibs/auth'
import axios from 'axios';
import { useRoute } from 'vue-router';
import router from '../router'

export default defineComponent({
    name: "UserList",
    components: {
        navBar,
        Footer,
        userCard,
    },
    async setup(props) {
        const route = useRoute();
        const searchCurr = ref<userListType[]>([])
        watchEffect(async() => {
            try { 
                const response = await axios.get("https://localhost:8000/search/"+route.params.input);
                searchCurr.value = response.data;
            }catch(error){
                console.log("**SEARCH ERROR**")
            }  
        })

        const go = (id: string) =>{
            router.push({path: "/profileOther/"+id})
        }
        return { searchCurr, go }
    },
})
</script>
<style scoped>
.big {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.external {
    flex: 1;
    display: flex;
    justify-content: center;
}

.internal {
    background-color: rgb(255, 255, 255);
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 4em 4em 4em;
    border-radius: 25px;
}
.internal ul {
    padding: 0;
    margin: 20px 0 0px 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    width: 100%;
}
.internal ul li {
    display: flex;
    flex-direction: row;
    padding: 15px;
    border-bottom: solid;
    border-color: rgb(0, 0, 0);
    color: rgb(0, 0, 0);
    border-width: 1px;
    font-size: 25px;
    align-items: center;
    transition: all 0.15s ease-in-out;
}

.internal ul li:hover {
    background-color: rgba(0, 0, 0, 0.11);
    color: rgb(54, 54, 54);
    cursor: pointer;
}

.internal ul li img {
    border-radius: 40px;
    margin-right: 15px;
}
</style>