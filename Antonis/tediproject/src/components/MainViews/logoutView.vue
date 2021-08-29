<template>
    
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { logout } from '../../jsLibs/auth'

export default defineComponent({
    name: "logoutView",
    setup() {
        logout();
        return {  }
    },
})
</script>
<style scoped>

</style>