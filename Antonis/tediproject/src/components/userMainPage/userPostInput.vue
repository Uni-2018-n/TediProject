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
                    <span>{{ userName }}</span>
                </div>
            </div>
            <textarea v-model="text" id="postTextArea" @input="resize($event)" rows="1" placeholder="Type Here..."></textarea>
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
            <userUnderPostImg :imgOpenTriger="imgOpenTriger" :only="only" :first="first" :imgElse="imgElse" :imgLast="imgLast" :n="n" :indx="indx" :allCount="allCount" :voicesURL="voicesURL" :totalURL="totalURL" />
        </div>
        <div class="postButton">
            <button @click="post()">Post!</button>
        </div>
    </div>
    <imgSlideShow v-if="imgFlag" :src="totalURL" :indx="indx" :closeTriger="() => imgCloseTriger()"/>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, reactive, ref, watch } from 'vue'
import imgSlideShow from "../imgSlideShow.vue"
import userUnderPostImg from "../userMainPage/userUnderPostImg.vue"

export default defineComponent({
    name: "userPostInput",
    props: {
        userName: {type: String, required: true},
        id: {type: String, required: true},
    },
    components: {
        imgSlideShow,
        userUnderPostImg,
    },
    setup(props) {
        const text = ref("");

        const photos = ref<File[]>([]);
        const videos = ref<File[]>([]);
        const voices = ref<File[]>([]);
        const photosURL = reactive<{}[]>([]);
        const videosURL = reactive<{}[]>([]);
        const voicesURL = reactive<{}[]>([]);
        
        const totalURL = reactive<{}[]>([]);

        const allCount = ref(photos.value.length + videos.value.length + voices.value.length);

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
                photos.value.splice(0);
                photosURL.splice(0);
                for (let photo of ((event.target as HTMLInputElement).files as FileList)) {
                    if(photo.size > 10000000){
                        console.log("error image too big");
                    }else{
                        photosURL.push({photo: URL.createObjectURL(photo), t: 0});
                        photos.value.push(photo);
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
                videos.value.splice(0);
                videosURL.splice(0);
                for (let video of ((event.target as HTMLInputElement).files as FileList)) {
                    if(video.size > 100000000){
                        console.log("error image too big");
                    }else{
                        videosURL.push({video: URL.createObjectURL(video), t:1});
                        videos.value.push(video);
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
                voices.value.splice(0);
                voicesURL.splice(0);
                for (let voice of ((event.target as HTMLInputElement).files as FileList)) {
                    if(voice.size > 1000000){
                        console.log("error image too big");
                    }else{
                        voicesURL.push(URL.createObjectURL(voice));
                        voices.value.push(voice);
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

        const post = async () => {

            const fd = new FormData();
            fd.append('author', JSON.stringify({id: props.id}));
            fd.append('text', text.value);
            // fd.append('files', photos.value[0]);
            for(let i =0;i < photos.value.length ; i++){
                fd.append('photos', photos.value[i]);
            }

            for(let i =0;i < videos.value.length ; i++){
                fd.append('videos', videos.value[i]);
            }

            for(let i =0;i < voices.value.length ; i++){
                fd.append('voices', voices.value[i]);
            }

            try {
                const response = await axios.post('https://localhost:8000/posts', fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                })
                // const data = response.data
                // console.log(data)
            }catch (e){
                console.log("**USER INPUT POST ERROR**");
                console.error(e);
            }
        }

        return { text, resize, focus,
         selectPhotos, selectVideos, selectVoices,
          photos, videos, voices,
          photosURL, videosURL, voicesURL, totalURL,
          allCount, only, first, imgElse, imgLast, n,
          imgFlag, indx, imgCloseTriger, imgOpenTriger,
          post };
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
</style>