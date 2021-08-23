<template>
    <div class="outside-ul">
        <ul>
            <li v-for="message in src" :key="message">
                <div v-if="message.me" class="me">
                    <div class="in">
                        <div class="span" style="margin-left: 39px;">
                            <span>{{ message.message }}</span>
                        </div>
                        <img
                        src="@/assets/blank-profile-picture.png"
                        width="35"
                        height="35"
                        style="margin-left: 4px;"
                        />
                    </div>
                </div>
                <div v-else class="other">
                    <div class="in">
                        <img
                        src="@/assets/blank-profile-picture.png"
                        width="35"
                        height="35"
                        style="margin-right: 4px;"
                        />
                        <div class="span" style="margin-right: 39px;">
                            <span>{{ message.message }}</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Bubles",
    props: ["src"],
    setup() {
        return {  }
    },
})
</script>
<style scoped>
.outside-ul {
    height: 100%;
}
ul {
    overflow-y: auto;
    list-style-type: none;
    padding: 5px;
    margin: 0;
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
}
.me {
    display: flex;
    justify-content:flex-end;
}
.other {
    display: flex;
    justify-content: flex-start;
}
.in {
    display: flex;
    align-items: center;
}
.in img {
    border-radius: 25px;
    vertical-align: middle;
}
.span {
    padding: 5px;
    background-color: rgb(235, 235, 235);
    border-radius: 10px;
}
</style>