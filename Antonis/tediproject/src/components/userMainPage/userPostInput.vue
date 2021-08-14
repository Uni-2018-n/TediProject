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
            </div>
            <textarea id="postTextArea" @input="resize($event)" rows="1" placeholder="Type Here..."></textarea>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: "userPostInput",
    setup() {
        const resize = (e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight +'px';
        };
        const focus = () => {
            document.getElementById('postTextArea').focus();
        }

        return { resize, focus };
    },
})
</script>
<style scoped>
.outer {
    margin-bottom: 10px;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 5px;
}
.inner {
    width: 450px;
    min-height: 100px;
    display: flex;
    justify-content:space-between;
    flex-direction:column;
    border-radius: 5px;
    background-color: rgb(248, 248, 248);
}
.top {
    /* margin-bottom: 5px; */
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

textarea {
    margin: 5px 15px 15px 15px;
    background: transparent;
    border: none;
    resize: none;
    font-size: 15px;
}
textarea:focus {
    outline: none !important;
}
</style>