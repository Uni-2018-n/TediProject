<template>
    <div class="external">
        <div class="internal">
            <div class="information">
                <img
                    :src="getPic(ProfilePic)"
                    width="90"
                    height="90"
                />
                <div class="text">
                    <span @click="router.push({path: '/profile'})" class="name">{{ userName }}</span>
                    <span v-if="userEducation" class="inf">{{userEducation}}</span>
                </div>
            </div>
            <div class="left-other" @click="router.push({path: '/network'})">
                <span class="network">Connections</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { getPic } from "../../tsLibs/funcs";
import router from "../../router/index"

export default defineComponent({
    props: {
        userEducation: {type: String, required: false},
        userName: {type: String, required: true},
        ProfilePic: {type: String, required: true},
    },
    name: "userLeftCompartment",
    setup() {
        return { getPic, router }
    },
})
</script>
<style scoped>
.external {
    margin-right: 15px;
    background-color: white;
    border-radius: 20px;
    width: 200px;
}
.internal {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.information{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-bottom: solid;
    border-width: 1px;
    border-color: rgb(218, 218, 218);
    padding: 0px 0px 5px 0px;
} 
.information img {
    border-radius: 100px;
    margin-bottom: 20px;
    margin-top: 20px;
    -webkit-user-drag: none;
}
.text {
    margin: 0px 15px 0px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.name {
    font-size: 19px;
    font-weight: bold;
    opacity: 0.8;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: center;
    margin-bottom: 5px;
}
.name:hover {
    cursor: pointer;
}
.inf {
    font-size: 13px;
    opacity: 0.6;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: center;
    margin-bottom: 20px;
    
}
.left-other {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.network {
    margin: 15px;
    text-decoration: none;
}
.network {
    text-decoration: none;
}
.network:visited{
    color: black;
}
.network:active{
    color: black;
}
.network:hover {
    cursor: pointer;
    color: black;
}
.network:link {
    color: black;
}

.left-other:hover {
    background-color: rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    cursor: pointer;
}
</style>