<template>
    <div class="big">
        <navBar />
        <div class="external">

        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import navBar from '../../components/navBar.vue'
import Footer from '../../components/footer.vue'
import userPost from '../../components/userMainPage/userPost.vue'

export default defineComponent({
    name: "postPageView",
    components: {
        navBar,
        Footer,
        userPost
    },
    setup() {
        
    },
})
</script>
<style scoped>

</style>