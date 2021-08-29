<template>
    
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import router from '../router/index'
import { useStore } from "vuex";

export default defineComponent({
    name: "logout",
    setup() {
        localStorage.clear();
        router.push('/');
        return {  }
    },
})
</script>
<style scoped>

</style>