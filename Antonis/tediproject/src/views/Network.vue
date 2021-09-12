<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal" v-if="users.length">
                <ul>
                    <li v-for="user in users" :key="user">
                        <networkUserCard @click="redirect(user.id)" :src="user" />
                    </li>
                </ul>
            </div>
            <div class="else" v-else>
                <span>No users found</span>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import networkUserCard from "../components/networkPage/networkUserCard.vue"
import { loginCheck, givenType, networkUserType } from "../tsLibs/auth"
import axios from 'axios';
import router from '../router'

export default defineComponent({
    name: "Network",
    components: {
        navBar,
        Footer,
        networkUserCard,
    },
    async setup() {
        const user = ref<givenType>();
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })
        const users = ref<networkUserType[]>()
        if(user.value)
        try {
            const response = await axios.get("https://localhost:8000/users/connect/"+user.value._id);
            users.value = response.data
        }catch(err){
            console.log("**NETWORK ERROR**")
        }

        const redirect = (id: string,) => {
            router.push({path: "/profileOther/"+id})
        }

        return { user, users, redirect }
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
    display: flex;
    justify-content: center;
}
.internal {
    background-color: white;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 10px;
}
.internal ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 15px;
    row-gap: 15px;
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.internal ul li:hover {
    cursor: pointer
}
.else {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    background-color: white;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 10px;
}
.else span {
    font-size: 40px;
    font-weight: bolder;
    color: rgb(116, 116, 116);
}
</style>