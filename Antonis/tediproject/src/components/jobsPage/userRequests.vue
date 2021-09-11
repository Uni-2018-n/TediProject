<template>
    <div class="external">
        <div class="internal" @click="popupFlag= true">
            <img
                :src="getPic(src.avatar)"
                width="75"
                height="75"
            />
            <div class="info">
                <span>User {{ src.name }} applied for a job you offered!</span>
            </div>
        </div>
    </div>
    <jobRequestPopup v-if="popupFlag" :src="src" :close="()=>{popupFlag = false;}" />
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { applicationType } from '../../tsLibs/jobs'
import {getPic} from '../../tsLibs/funcs'
import jobRequestPopup from './jobRequestPopup.vue'

export default defineComponent({
    name: "userRequests",
    props: {
        src: {type: Object as PropType<applicationType>, required: true}
    },
    components: {
        jobRequestPopup,
    },
    setup(props) {
        console.log(props.src)
        const popupFlag = ref(false)
        return { getPic, popupFlag  }
    },
})
</script>
<style scoped>
.external {
    display: flex;
    justify-content: center;
}
.internal {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgb(241, 241, 241);
    padding: 15px;
    border-radius: 25px;
    max-width: 80%;
    min-width: 350px;
    height: 100px;
}

.internal:hover {
    cursor: pointer;
}

.internal img {
    border-radius: 50px;
}
.info {
    margin-top: 10px;
    margin-left: 15px;
}
</style>