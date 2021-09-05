<template>
    <div class="card-External">
        <div class="card-Internal">
            <div class="img">
                <img
                   :src="src.avatar"
                    width="85"
                    height="85"
                />
            </div>
            <div class="text">
                <span>{{ src.name }}</span>
                <div class="text-internal">
                    <span v-if="src.professional_position">{{ src.professional_position }}</span>
                    <span v-if="src.Employment_institution">{{ src.Employment_institution }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { PropType } from '@vue/runtime-core'
import { defineComponent } from 'vue'
import { networkUserType } from "../../tsLibs/auth"

export default defineComponent({
    name: "networkUserCard",
    props: {
        src: {type: Object as PropType<networkUserType>, required: true},
    },
    setup(props) {
        console.log(props.src)
        if(props.src.avatar){
            props.src.avatar = "https://localhost:8000/upload/files/"+props.src.avatar
        }else{
            props.src.avatar = require("@/assets/blank-profile-picture.png")
        }
        return {  }
    },
})
</script>
<style scoped>
.card-External {
    width: fit-content;

}
.card-Internal {
    display: flex;
    align-items: center;
    width: max-content;
    border: solid;
    border-color: rgb(210, 210, 210);
    border-radius: 15px;
    border-width: 1px;
}
.card-Internal img {
    object-fit: cover;
    border-radius: 15px;
    padding: 0;
    margin: 0;
}
.img{
    border-right: solid;
    border-width: 1px;
    border-color: rgb(207, 207, 207);
    padding: 5px;
}
.text {
    margin-left: 5px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
}
.text-internal {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}
.text-internal span{
    font-size: 15px;
    color: rgb(82, 82, 82);
}
</style>