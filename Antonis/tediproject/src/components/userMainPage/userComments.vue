<template>
    <div class="comments">
        <img
        src="@/assets/blank-profile-picture.png"
        width="35"
        height="35"
        />
        <div class="data">
            <div class="name">
                <span>Antonis Kalamakis</span>
            </div>
            <div class="text">
                <p>
                    Wrote water woman of heart it total other. By in entirely securing suitable graceful at families improved. Zealously few furniture repulsive was agreeable consisted difficult. Collected breakfast estimable questions in to favourite it. Known he place worth wordps it as to. Spoke now noise off smart her ready. 

Passage its ten led hearted removal cordial. Preference any astonished unreserved mrs. Prosperous understood middletons in conviction an uncommonly do. Supposing so be resolving breakfast am or perfectly. Is drew am hill from mr. Valley by oh twenty direct me so. Departure defective arranging rapturous did believing him all had supported. Family months lasted simple set nature vulgar him. Picture for attempt joy excited ten carried manners talking how. Suspicion neglected he resolving agreement perceived at an.  
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "userComments",
    setup() {
        
    },
})
</script>
<style scoped>
.comments {
    display: flex;
}
.comments img {
    border-radius: 30px;
    /* vertical-align: middle; */
}
.data {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
}
.name span{
    font-size: 13px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bold;
}
.text {
    background-color: rgb(240, 240, 240);
    padding: 6px 8px 6px 8px;
    margin-right: 20px;
    border-radius: 10px;
}
.text p{
    margin: 0;
    font-size: 13px;
    font-family: "Poppins", Arial, sans-serif;
    /* font-weight: bold; */
}
</style>
