<template>
    <div class="external">
        <div class="inside">
            <div class="top">
                <img
                src="@/assets/blank-profile-picture.png"
                width="55"
                height="55"
                />
                <div class="text">
                    <span class="name">Antonis Kalamakis</span>
                </div>
            </div>
            <div class="chat">
                <Bubles :src="messages"/>
            </div>
            <div class="input">

            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Bubles from "../communicationPage/bubles.vue"
export default defineComponent({
    name: "chat",
    components: {
        Bubles,
    },
    setup() {
        const messages = reactive([
            {
                me: true,
                message: "test1"
            },
            {
                me: false,
                message: "test2"
            },
            {
                me: true,
                message: "test3"
            },
            {
                me: false,
                message: "test4;erovijser ;oiejg;oeitjg;e togijt;g oritj roh jr;tohi rtho;rt ihrjt;h ortih r;tho rth;r tohirt h;roth irt;h ortih rt;r; hortihr thrtrtrthri eogi jtpog ri;ho tih; orh ;thoirohr ohir;hortih;r toh;rothr; thorth;rtrot;horthirtoh "
            }
        ])
        return { messages }
    },
})
</script>
<style scoped>
.external {
    background-color: white;
    border: solid;
    border-width: 3px;
    border-color: rgb(212, 212, 212);
    border-radius: 15px;
    padding: 2px;
}
.top {
    display: flex;
    padding: 10px;
    border-bottom: solid;
    border-color: rgb(201, 201, 201);
    border-width: 1px;
}
.top img {
    border-radius: 30px;
    vertical-align: middle;
    margin-right: 5px;
}
.text {
    margin-top: 10px;
}
.name {
    font-size: 15px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bolder;
}
.chat {
    margin-top: 10px;
}
</style>