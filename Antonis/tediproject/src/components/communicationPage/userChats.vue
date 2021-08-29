<template>
    <div class="external">
        <div class="internal">
            <div :class="{ selected: selected}" class="tag">
                <img
                src="@/assets/blank-profile-picture.png"
                width="55"
                height="55"
                />
                <div class="text">
                    <span class="name">{{ name }}</span>
                    <!-- <div class="lastmsg">
                        <span class="msg">{{ text }}</span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "userChats",
    props: [ "name", "text", "selected"],
    setup() {
        return {  }
    },
})
</script>
<style scoped>
.tag {
    background-color: rgb(248, 248, 248);
    display: flex;
    padding: 8px;
    width: inherit;
    min-width: 280px;
}
.selected {
    background-color: rgb(230, 230, 230);
}
.tag img {
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
.lastmsg {
    margin: 0;
}
.msg {
    font-size: 13px;
    font-family: "Poppins", Arial, sans-serif;
    color: rgb(146, 146, 146);
}
</style>