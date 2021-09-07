<template>
    <img
        :src="getPic(src.avatar)"
        width="75"
        height="75"
    />
    <div class="info">
        <span> {{src.name}} </span>
        <div v-if="flag" class="btns">
            <button @click="accept()" class="btn accept">Accept</button>
            <button @click="reject()" class="btn reject">Reject</button>
        </div>
    </div>
</template>
<script lang="ts">
import { PropType, ref } from '@vue/runtime-core'
import axios from 'axios'
import { defineComponent } from 'vue'
import { notificationRequestType } from "../../tsLibs/auth"
import { getPic } from "../../tsLibs/funcs";


export default defineComponent({
    name: "requestCard",
    props: {
        userId: {type: String, required: true},
        src: {type: Object as PropType<notificationRequestType>, required: true},
    },
    components: {
        
    },
    setup(props) {
        const flag = ref(true);

        const accept = async () => {
            try {
                const response = await axios.post("https://localhost:8000/users/connect/accept/"+props.userId+"/"+props.src.id)
                console.log("accepted")
                flag.value = false;
            }catch(error){
                console.log("**ACCEPT ERROR**")
            }
        }

        const reject = async () => {
            try {
                const response = await axios.post("https://localhost:8000/users/connect/reject/"+props.userId+"/"+props.src.id)
                console.log("rejected")
                flag.value = false;
            }catch(error){
                console.log("**REJECT ERROR**")
            }
        }

        return { flag, accept, reject, getPic }
    },
})
</script>
<style scoped>
img {
    border-radius: 50px;
}
.info {
    margin-top: 10px;
    margin-left: 15px;
}
.info span {
    font-size: 18px;
    font-weight: 600;
}

.btns {
    margin: 10px 10px 0px 30px;
}
.btn {
    margin: 0px 5px;
    background-color: lightgray;
    border: none;
    padding: 10px 15px;
    border-radius: 10px;
}
.accept{
    border: solid;
    background-color: rgba(66, 101, 255, 0.404);
    border-color: rgba(66, 101, 255, 0.663);
    border-width: 2px;
}
.accept:hover {
    background-color: rgba(66, 101, 255, 0.663);
    cursor: pointer;
}
.reject:hover {
    background-color: rgb(173, 173, 173);
    cursor: pointer;
}
</style>