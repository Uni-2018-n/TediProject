<template>
    <Suspense>
        <userMainPageView />
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>
<script lang="ts">
import { defineComponent, ref,  } from 'vue';
import UserMainPageView from '../components/MainViews/UserMainPageView.vue'

export default defineComponent({
    name: "UserMainPage",
    components: {
        UserMainPageView,
    },
    setup() {

    },
})
</script>
<style scoped>

</style>