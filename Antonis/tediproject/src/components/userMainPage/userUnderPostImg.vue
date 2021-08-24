<template>
    <div class="voice">
        <ul>
            <li v-for="voice in voicesURL" :key="voice">
                <audio controls>
                    <source :src="voice" type="audio/mpeg"> 
                </audio>
            </li>
        </ul>
    </div>
    <div class="other">
        <ul>
            <li v-for="(photo, index) in totalURL.slice(0,4)" :key="index">
                <div class="img-container">
                    <div v-if="!photo.t">
                        <img @click="imgOpenTriger(index)" :src="photo.photo" :class="{ imgOnly: only && index === 0, imgFirst: first && index === 0, imgElse: imgElse || index != 0, imgLast: imgLast && index === 3 }">
                        <div v-if="imgLast && index === 3" @click="imgOpenTriger(index)"  class="img-text">
                            <span>+ {{ allCount-4 }}</span>
                        </div>
                    </div>
                    <div v-else>
                        <video @click="imgOpenTriger(index)" :class="{ imgOnly: only && index === 0, imgFirst: first && index === 0, imgElse: imgElse || index != 0, imgLast: imgLast && index === 3 }">
                            <source :src="photo.video" />
                        </video>
                        <div @click="imgOpenTriger(index)" class="video-play">
                            <img src="@/assets/outline_play_arrow_black_48dp.png">         
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
    name: "userUnderPostImg",
    props: {
        imgOpenTriger: {type: Function, required: true},
        only: {type: Boolean, required: true},
        first: {type: Boolean, required: true},
        imgElse: {type: Boolean, required: true},
        imgLast: {type: Boolean, required: true},
        n: {type: Number, required: true},
        indx: {type: Number, required: true},
        allCount: {type: Number, required: true},
        voicesURL: {type: Array , required: true},
        totalURL: {type: Array, required: true},
    },
    setup() {
        
    },
})
</script>
<style scoped>
.voice ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.other {
    display: flex;
    justify-content: center;
    text-align: center;
}

.other ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.other ul li {
    display: inline-block;
    margin: 3px;
}


.imgFirst {
    object-fit: cover;
    width: 360px;
    height: 180px;
}
.imgOnly {
    object-fit: contain;
    width: auto;
    max-width: 420px;
    height: auto;
}
.imgElse {
    object-fit: cover;
    width: 180px;
    height: 180px;
}
.imgLast {
    filter: blur(2px);
}

.img-container {
    position: relative;
}

.img-container img:hover {
    cursor: pointer;
}

.img-container video:hover {
    cursor: pointer;
}

.img-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.img-text:hover {
    cursor: pointer;
}

.img-text span {
    font-size: 30px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 5px rgb(0, 0, 0);
}

.video-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.video-play:hover {
    cursor: pointer;
}

.video-play img {
    object-fit: contain;
    width: auto;
    height: 100px;
}
</style>