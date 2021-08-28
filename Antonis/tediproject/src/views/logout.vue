<template>
    
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from "vuex";
import router from '../router/index'

export default defineComponent({
    name: "logout",
    setup() {
        if(useStore().state.user){
            useStore().state.flag = false;
            useStore().state.user = null;
            router.push("/");
        }
        return {  }
    },
})
</script>
<style scoped>

</style>