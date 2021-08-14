<template>
    <div class="outer">
        <div class="inner">
            <div class="top">
                <img
                src="@/assets/blank-profile-picture.png"
                width="55"
                height="55"
                />
                <div class="text">
                    <span>Antonis Kalamakis</span>
                </div>
                <div class="textarea">
                    <textarea></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "userPostInput",
    setup() {
        
    },
})
</script>
<style scoped>
.outer {
    margin-bottom: 10px;
}
.inner {
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 5px;
    width: 450px;
    min-height: 100px;
}
.top {
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: rgb(248, 248, 248);
    padding: 5px;
}
.top img {
    border-radius: 30px;
    float: left;
    margin-right: 5px;
}
.text {
    margin-top: 13px;
}
.text span {
    font-size: 15px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bolder;
}
</style>