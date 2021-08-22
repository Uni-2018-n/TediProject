<template>
    <div class="external">
        <div class="internal">
            <ul>
                <li v-for="user in temp" :key="user">
                    <userChats :name="user.name" :text="user.text" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import userChats from '../communicationPage/userChats.vue'

export default defineComponent({
    name: "chats",
    components: {
        userChats,
    },
    setup() {
        const temp = reactive([
            {
                name: "Antonis Kalamakis",
                text: "Image sent"
            },
            {
                name: "Antonis Kalamakislloejroijwo",
                text: "Image sent"
            },
            {
                name: "Antonis Kalamakioijois",
                text: "Image sent"
            },
            {
                name: "Antonis Kalamakisreirjoeirjeorgijerog",
                text: "Image sentpwgjeorghelovejltborjthlo rjrlto jrlohrjloyhjr lohejirlthirjhoijrtlhor ithlr tihlr tohir jltohir jtlhorithjro hitjrltohrithl rtohi "
            },
        ])
        return { temp }
    },
})
</script>
<style scoped>
.external {

}
.internal {
    width: max-content;
}
.internal ul {
    list-style-type: none;
    padding: 0;
    margin: 5px;
}
.internal li {
    padding: 0;
    margin-bottom: 5px;
}
.internal li:last-child {
    margin-bottom: 0px;
}
</style>