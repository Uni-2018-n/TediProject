<template>
    <div class="outer">
        <div class="inner">
            <div class="top" @click.self="focus()">
                <img
                :src="getPic(ProfilePic)"
                width="55"
                height="55"
                />
                <div class="text">
                    <span @click="router.push({path: '/profile'})">{{ userName }}</span>
                </div>
            </div>
            <textarea v-model="text" id="postTextArea" rows="1" placeholder="Type Here..."></textarea>
            <div class="icons" @click.self="focus()">
                <input multiple @change="selectPhotos" type="file" name="photoFile" id="photoFile" class="inputfile" accept="image/*" />
                <label for="photoFile" id="fileLabel"><img src="@/assets/outline_collections_black_24dp.png"></label>
                
                <input multiple @change="selectVideos" type="file" name="videoFile" id="videoFile" class="inputfile" accept="video/*" />
                <label for="videoFile" id="fileLabel"><img src="@/assets/outline_video_library_black_24dp.png"></label>
                
                <input multiple @change="selectVoices" type="file" name="voiceFile" id="voiceFile" class="inputfile" accept="audio/*" />
                <label for="voiceFile" id="fileLabel"><img src="@/assets/outline_voicemail_black_24dp.png"></label>
            </div>
        </div>
        <div class="media">
            <userUnderPostImg :imgOpenTriger="imgOpenTriger" :allCount="allCount" :voicesURL="voicesURL" :totalURL="totalURL" :resetFlag="resetFlag"/>
        </div>
        <div class="postButton">
            <button @click="post()">Post!</button>
        </div>
    </div>
    <imgSlideShow v-if="imgFlag" :src="totalURL" :closeTriger="() => imgCloseTriger()"/>
    <loading v-if="loadingFlag"/>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, watch } from 'vue'
import imgSlideShow from "../imgSlideShow.vue"
import userUnderPostImg from "../userMainPage/userUnderPostImg.vue"
import loading from "../loading.vue"
import { getPic } from "../../tsLibs/funcs";
import router from "../../router/index"

export default defineComponent({
    name: "userPostInput",
    props: {
        userName: {type: String, required: true},
        ProfilePic: {type: String, required: true},
        id: {type: String, required: true},
    },
    components: {
        imgSlideShow,
        userUnderPostImg,
        loading,
    },
    setup(props) {
        const text = ref("");
        const loadingFlag = ref(false);

        const photos = ref<File[]>([]);
        const videos = ref<File[]>([]);
        const voices = ref<File[]>([]);
        const photosURL = ref<{}[]>([]);
        const videosURL = ref<{}[]>([]);
        const voicesURL = ref<{}[]>([]);
        
        const totalURL = ref<{}[]>([]);

        const allCount = ref(photos.value.length + videos.value.length + voices.value.length);

        const imgFlag = ref(false);
        const resetFlag = ref(false);

        const reset = () => {
            text.value= "";
            photos.value.splice(0,photos.value.length);
            videos.value.splice(0,videos.value.length);
            voices.value.splice(0,voices.value.length);

            photosURL.value.splice(0,photosURL.value.length);
            videosURL.value.splice(0,videosURL.value.length);
            voicesURL.value.splice(0,voicesURL.value.length);

            totalURL.value.splice(0,totalURL.value.length);
            imgFlag.value = false;
            resetFlag.value = !resetFlag.value
        }

        watch(text, () =>{
            const e = document.getElementById('postTextArea') as HTMLTextAreaElement;
            if(text.value == ""){
                e.style.height = 'initial'
            }else{
                e.style.height = 'auto';
                e.style.height = e.scrollHeight +'px';
            }
        })

        const focus = () => {
            document.getElementById('postTextArea')!.focus();
        }

        const selectPhotos = (event: Event) => {
            if(event){
                photos.value.splice(0);
                photosURL.value.splice(0);
                for (let photo of ((event.target as HTMLInputElement).files as FileList)) {
                    photosURL.value.push({photo: URL.createObjectURL(photo), t: 0});
                    photos.value.push(photo);
                }
            }
            totalURL.value.splice(0, totalURL.value.length);
            totalURL.value.push(...videosURL.value);
            totalURL.value.push(...photosURL.value);
            allCount.value = totalURL.value.length;


        }

        const selectVideos = (event: Event) => {
            if(event){
                videos.value.splice(0);
                videosURL.value.splice(0);
                for (let video of ((event.target as HTMLInputElement).files as FileList)) {
                    videosURL.value.push({video: URL.createObjectURL(video), t:1});
                    videos.value.push(video);
                }
            }
            totalURL.value.splice(0, totalURL.value.length);
            totalURL.value.push(...videosURL.value);
            totalURL.value.push(...photosURL.value);
            allCount.value = totalURL.value.length;
        }

        const selectVoices = (event: Event) => {
            if(event){
                voices.value.splice(0);
                voicesURL.value.splice(0);
                for (let voice of ((event.target as HTMLInputElement).files as FileList)) {
                    voicesURL.value.push(URL.createObjectURL(voice));
                    voices.value.push(voice);
                }
            }
        }
        const imgCloseTriger = () => {
            imgFlag.value = false;
            document.body.classList.remove("popupOpen");
        }

        const imgOpenTriger = (index: number) => {
            imgFlag.value=true;
            document.body.classList.add("popupOpen");
        }

        const post = async () => {
            if(!text.value && !allCount.value){

                return;
            }
            loadingFlag.value=true;
            const fd = new FormData();
            fd.append('author', props.id);
            fd.append('text', text.value);
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
                reset();
                loadingFlag.value=false;
            }catch (e){
                loadingFlag.value=false;
                console.log("**USER INPUT POST ERROR**");
                console.error(e);
            }
        }

        return { text, loadingFlag, focus,
         selectPhotos, selectVideos, selectVoices,
          photos, videos, voices,
          photosURL, videosURL, voicesURL, totalURL,
          allCount, imgFlag, imgCloseTriger, imgOpenTriger,
          post, resetFlag, getPic, router };
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
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.inner:hover {
    cursor:text;
}
.top img {
    border-radius: 30px;
    margin-right: 5px;
    -webkit-user-drag: none;
}
.top img:hover {
    cursor:default;
}

.text span {
    font-size: 15px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bolder;
}
.text span:hover {
    cursor: pointer;
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
    -webkit-user-drag: none;
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

.postButton {
    padding: 0;
    margin: 0;
    text-align: center;
}
.postButton button {
    border: none;
    background-color: rgb(25, 119, 242);
    color: white;
    width: 80%;
    padding: 1.5%;
    border-radius: 10px;
    font-weight: bold;
    font-size: 19px;
    transition: all 0.25s;
}
.postButton button:hover{
    background-color: rgb(20, 95, 192);
    cursor: pointer;
}
</style>