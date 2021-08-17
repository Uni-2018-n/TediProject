<template>
    <div class="external">
        <div class="internal">
            <div class="image">
                <ul>
                    <li v-for="(photo, index) in src" :key="index">
                        <img :src="photo" width: >
                    </li>
                </ul>
            </div>
        </div>

        <button @click="closeTriger()">test</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "imgSlideShow",
    props: ["src", "indx", "closeTriger"],
    setup() {
        
    },
})
</script>
<style scoped>
.external {
  background-color: rgb(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image ul li img {
    /* object-fit: scale-down; */
    width: 500px;
    height: 500px;

}
</style>