<template>
    <div class="card-External">
        <div class="card-Internal">
            <div class="img">
                <img
                    src="@/assets/blank-profile-picture.png"
                    width="85"
                    height="85"
                />
            </div>
            <div class="text">
                <span>Antonis Kalamakis</span>
                <div class="text-internal">
                    <span>Antonis Kalamakis</span>
                    <span>Antonis Kalamakis</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "networkUserCard",
    setup() {
        return {  }
    },
})
</script>
<style scoped>
.card-External {
    min-width: fit-content;
}
.card-Internal {
    display: flex;
    align-items: center;
    width: fit-content;
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