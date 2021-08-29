<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal">
                <ul>
                    <li v-for="user in searchCurr" :key="user">
                        <img
                            src="@/assets/blank-profile-picture.png"
                            width="75"
                            height="75"
                        />
                        <div class="text">
                            <span class="name">{{user.name}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import navBar from "../../components/navBar.vue";
import Footer from "../../components/footer.vue";

export default defineComponent({
    name: "UserListView",
    components: {
        navBar,
        Footer,
    },
    setup() {
        const searchCurr = reactive([
{"_id":1,"name":"Bibbie Mougenel"},
{"_id":2,"name":"Bordie Gillise"},
{"_id":3,"name":"Kiley Washtell"},
{"_id":4,"name":"Immanuel Clemoes"},
]);


        return { searchCurr }
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