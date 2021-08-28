<template>
    <div class="external">
        <div class="internal">
            <div class="information">
                <img
                    src="@/assets/blank-profile-picture.png"
                    width="90"
                    height="90"
                />
                <div class="text">
                    <span class="name">{{ userName }}</span>
                    <span class="inf">Student at National & Kapodistrian University of Athens</span>
                </div>
            </div>
            <div class="left-other">
                <span>Connections</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        userName: {type: String, required: true},
    },
    name: "userLeftCompartment",
    setup() {
        
    },
})
</script>
<style scoped>
.external {
    margin-right: 15px;
    background-color: white;
    border-radius: 20px;
    width: fit-content;
    max-width: 200px;
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
.left-other span {
    margin: 15px;
}
.left-other:hover {
    background-color: rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    cursor: pointer;
}
</style>