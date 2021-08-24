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
            <div class="icons">
                <input multiple @change="selectPhotos" type="file" name="photoFile" id="photoFile" class="inputfile" accept="image/*" />
                <label for="photoFile" id="fileLabel"><img src="@/assets/outline_collections_black_24dp.png"></label>
                
                <input multiple @change="selectVideos" type="file" name="videoFile" id="videoFile" class="inputfile" accept="video/*" />
                <label for="videoFile" id="fileLabel"><img src="@/assets/outline_video_library_black_24dp.png"></label>
                
                <input multiple @change="selectVoices" type="file" name="voiceFile" id="voiceFile" class="inputfile" accept="audio/*" />
                <label for="voiceFile" id="fileLabel"><img src="@/assets/outline_voicemail_black_24dp.png"></label>
            </div>
        </div>
        <div class="media">
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
        </div>
    </div>
    <imgSlideShow v-if="imgFlag" :src="totalURL" :indx="indx" :closeTriger="() => imgCloseTriger()"/>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import imgSlideShow from "../imgSlideShow.vue"

export default defineComponent({
    name: "userPostInput",
    components: {
        imgSlideShow,
    },
    setup() {
        const photos = reactive<File[]>([]);
        const videos = reactive<File[]>([]);
        const voices = reactive<File[]>([]);

        const photosURL = reactive<{}[]>([]);
        const videosURL = reactive<{}[]>([]);
        const voicesURL = reactive<{}[]>([]);
        
        const totalURL = reactive<{}[]>([]);

        const allCount = ref(photos.length + videos.length + voices.length);

        const only = ref(false);
        const first = ref(false);
        const imgElse = ref(false);
        const imgLast = ref(false);
        const n = ref(0);
        const indx= ref(0);

        const imgFlag = ref(false);

        const resize = (e: Event) => {
            (e.target as HTMLTextAreaElement).style.height = 'auto';
            (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight +'px';
        };
        const focus = () => {
            document.getElementById('postTextArea')!.focus();
        }

        const selectPhotos = (event: Event) => {
            if(event){
                photos.splice(0);
                photosURL.splice(0);
                for (let photo of ((event.target as HTMLInputElement).files as FileList)) {
                    if(photo.size > 10000000){
                        console.log("error image too big");
                    }else{
                        photosURL.push({photo: URL.createObjectURL(photo), t: 0});
                        photos.push(photo);
                    }
                }
            }
            totalURL.splice(0, totalURL.length);
            totalURL.push(...videosURL);
            totalURL.push(...photosURL);
            allCount.value = totalURL.length;


        }

        const selectVideos = (event: Event) => {
            if(event){
                videos.splice(0);
                videosURL.splice(0);
                for (let video of ((event.target as HTMLInputElement).files as FileList)) {
                    if(video.size > 100000000){
                        console.log("error image too big");
                    }else{
                        videosURL.push({video: URL.createObjectURL(video), t:1});
                        videos.push(video);
                    }
                }
            }
            totalURL.splice(0, totalURL.length);
            totalURL.push(...videosURL);
            totalURL.push(...photosURL);
            allCount.value = totalURL.length;
        }

        const selectVoices = (event: Event) => {
            if(event){
                voices.splice(0);
                voicesURL.splice(0);
                for (let voice of ((event.target as HTMLInputElement).files as FileList)) {
                    if(voice.size > 1000000){
                        console.log("error image too big");
                    }else{
                        voicesURL.push(URL.createObjectURL(voice));
                        voices.push(voice);
                    }
                }
            }
        }

        watch(allCount, () => {
            if(allCount.value == 1){
                first.value = false;
                only.value = true;
                imgElse.value = false;
                imgLast.value = false;
                n.value=4;
            }else if(allCount.value % 2 != 0){
                if(allCount.value == 3){
                    first.value = true;
                    imgElse.value = false;
                }else{
                    first.value = false;
                    imgElse.value = true;
                }
                only.value = false;
                imgLast.value = false;
            }else {
                first.value = false;
                only.value = false;
                imgElse.value = true;
                imgLast.value = false;
            }
            if(allCount.value > 4){
                imgLast.value = true;
            }
        })

        const imgCloseTriger = () => {
            imgFlag.value = false;
            document.body.classList.remove("popupOpen");
        }

        const imgOpenTriger = (index: number) => {
            indx.value=index;
            imgFlag.value=true;
            document.body.classList.add("popupOpen");
        }

        return { resize, focus,
         selectPhotos, selectVideos, selectVoices,
          photos, videos, voices,
          photosURL, videosURL, voicesURL, totalURL,
          allCount, only, first, imgElse, imgLast, n,
          imgFlag, indx, imgCloseTriger, imgOpenTriger };
    },
})
</script>
<style scoped>
.outer {
    margin-bottom: 10px;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 5px;
    width: 450px;
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
.icons {
    display: flex;
    justify-content: flex-end;
    text-align: end;
    margin-right: 5px;
}
.icons img {
    padding: 5px;
}

.inputfile {
	width: 0.01px;
	height: 0.01px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
    right: 0%;
	z-index: -1;
}

#fileLabel {
  display: inline-block;
  padding: 0;
  margin: 0;
}
#fileLabel:hover {
    cursor: pointer;
    opacity: 40%;
}

.media {
    margin-top: 10px;
}

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