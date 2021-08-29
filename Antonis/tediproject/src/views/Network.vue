<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal" v-if="users.length">
                <ul>
                    <li v-for="user in users" :key="user">
                        <networkUserCard />
                    </li>
                </ul>
            </div>
            <div class="none" v-else>
                No users found
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

export default defineComponent({
    name: "Network",
    components: {
        navBar,
        Footer,
        networkUserCard,
    },
    setup() {
        const users = reactive([{"id":1,"first_name":"Derron","last_name":"Brickell"},
{"id":2,"first_name":"Alica","last_name":"Moline"},
{"id":3,"first_name":"Shana","last_name":"Cheeney"},
{"id":4,"first_name":"Wald","last_name":"Beccles"},
{"id":5,"first_name":"Lindsey","last_name":"Godfroy"},
{"id":6,"first_name":"Suzanna","last_name":"Bouzek"},
{"id":7,"first_name":"Maribel","last_name":"Gut"},
{"id":8,"first_name":"Roy","last_name":"Brumbie"},
{"id":9,"first_name":"Vance","last_name":"Connold"},
{"id":10,"first_name":"Fredric","last_name":"Lander"},
{"id":11,"first_name":"Monti","last_name":"Tithecote"},
{"id":12,"first_name":"Claire","last_name":"Yexley"}])
        return { users }
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
.none {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    background-color: white;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 10px;
}
</style>