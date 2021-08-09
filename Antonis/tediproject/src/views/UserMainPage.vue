<template>
    <navBar />
    <footer>
        <Footer />
    </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Footer from "../components/footer.vue";
import navBar from "../components/navBar.vue";


export default defineComponent({
    name: "UserMainPage",
    components: {
        Footer,
        navBar,
    },
    setup() {
        return {  }
    },
})
</script>
<style scoped>

</style>