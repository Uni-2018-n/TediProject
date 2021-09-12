<template>
    
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { logout } from '../tsLibs/auth'

export default defineComponent({
    name: "logout",
    setup() {
        logout();
        return {  }
    },
})
</script>
<style scoped>

</style>