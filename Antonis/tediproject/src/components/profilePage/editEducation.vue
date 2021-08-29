<template>
    <div class="external">
        <div class="internal">
            <input type="text" autocomplete="off" id="text" placeholder="Enter New Email"/>
            <input v-model="checked" id="check" type="checkbox" /><label class="label" for="check">Information <span v-if="checked">Public</span><span v-else>Private</span></label>
            <button>Update</button>
        </div>
    <a @click="close" class="close" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "editEducation",
    props: {
        close: {type: Function, required: true},
    },
    setup() {
        const checked = ref(true);
        return { checked }
    },
})
</script>
<style scoped>
.external {
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

.internal {
    background-color: rgba(0,0,0,0.8);
    border-radius: 25px;
    padding: 3em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.internal input[type=text] {
    border: solid;
    background-color: white;
    border-radius: 25px;
    line-height: 50px;
    width: 80%;
    font-size: 2em;
    color: #222;
    padding: 0px;
    text-align: center;
}
.internal input:focus {
    outline: none;
}
.internal input[type=checkbox]{
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
.label {
    font-size: 24px;
    padding: 10px;
    color: black;
    background-color: white;
    border-radius: 10px;
    margin-top: 20px;
}
.internal input[type=checkbox]:checked ~ .label {
    background-color: rgb(189, 255, 189);
}
.label:hover {
    cursor: pointer;
}
button {
    margin-top: 20px;
    background-color: rgb(66, 132, 255);
    padding: 25px 35px 25px 35px;
    font-size: 22px;
    color: rgb(235, 235, 235);
    border: none;
    border-radius: 35px;
}
button:hover{
    cursor: pointer;
    background-color: rgb(139, 176, 245);
}
</style>