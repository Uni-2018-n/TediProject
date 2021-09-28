<template>
    <div class="modal-mask">
        <div class="external">
            <div class="internal">
                <div class="image">
                    <ul>
                        <li v-for="(photo, index) in src" :key="index">
                            <div v-if="!photo.t">
                                <img :src="photo.photo">
                            </div>
                            <div v-else>
                                <video controls>
                                    <source :src="photo.video">
                                </video>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <a @click="closeTriger()" class="close" />
    </div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "imgSlideShow",
    props: {
        src: {type: Array, required: true},
        closeTriger: {type: Function, required: true},
    },
    setup() {
        
    }
})
</script>
<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}
.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.7;
}
.close:hover {
  opacity: 1;
  cursor: pointer;
}
.close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
.external {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.button {
    margin: 0;
    padding: 0;

}
.internal {
    overflow-y: scroll;
    height: 100vh;
    /* height: 100px; */
}
.image ul li {
    max-height: 500px;
    max-width: 700px;
    background-color: rgba(0, 0, 0, 0.9);
    margin-bottom: 20px;
    border-style: solid solid solid solid;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    padding: 10px;
}
.image ul {
    list-style-type: none;
    padding: 0;
}
.image ul li img {
    object-fit: contain;
    width: auto;
    max-height: 350px;
    height: auto;
    padding: 0;
}

.image ul li video {
    object-fit: contain;
    width: auto;
    max-height: 350px;
    height: auto;
    padding: 0;
}
</style>