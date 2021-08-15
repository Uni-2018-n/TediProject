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
                <input @change="selectPhotos" type="file" name="photoFile" id="photoFile" class="inputfile" accept="image/*" />
                <label for="photoFile" id="fileLabel"><img src="@/assets/outline_collections_black_24dp.png"></label>
                
                <input @change="selectVideos" type="file" name="videoFile" id="videoFile" class="inputfile" accept="video/*" />
                <label for="videoFile" id="fileLabel"><img src="@/assets/outline_video_library_black_24dp.png"></label>
                
                <input @change="selectVoices" type="file" name="voiceFile" id="voiceFile" class="inputfile" accept="audio/*" />
                <label for="voiceFile" id="fileLabel"><img src="@/assets/outline_voicemail_black_24dp.png"></label>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "userPostInput",
    setup() {
        const photos = ref<File[]>();
        const videos = ref<File[]>();
        const voices = ref<File[]>();
        const resize = (e: Event) => {
            (e.target as HTMLTextAreaElement).style.height = 'auto';
            (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight +'px';
        };
        const focus = () => {
            document.getElementById('postTextArea')!.focus();
        }

        const selectPhotos = (event: Event) => {
            if(event){
                for (let photo of ((event.target as HTMLInputElement).files as FileList)) {
                    if(photo.size > 100000){
                        console.log("error image too big");
                    }else{
                        photos.value?.push(photo);
                    }
                }
            }
        }

        const selectVideos = (event: Event) => {
            if(event){
                for (let video of ((event.target as HTMLInputElement).files as FileList)) {
                    if(video.size > 100000){
                        console.log("error image too big");
                    }else{
                        videos.value?.push(video);
                    }
                }
            }
        }

        const selectVoices = (event: Event) => {
            if(event){
                for (let voice of ((event.target as HTMLInputElement).files as FileList)) {
                    if(voice.size > 100000){
                        console.log("error image too big");
                    }else{
                        voices.value?.push(voice);
                    }
                }
            }
        }
        return { resize, focus, selectPhotos, selectVideos, selectVoices };
    },
})
</script>
<style scoped>
.outer {
    margin-bottom: 10px;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 5px;
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
  /* border: 2px solid #808080; */
  /* color: gray; */
  /* padding: 8px 20px; */
  /* border-radius: 8px; */
  /* font-size: 20px; */
  /* font-weight: bold; */
}
#fileLabel:hover {
    cursor: pointer;
    opacity: 40%;
}
</style>