<template>
    <div class="external">
        <div class="internal">
            <input type="text" v-model="temp" autocomplete="off" id="text" placeholder="Update your work place"/>
            <!-- <span class="msg">Click on a skill to remove</span> -->
            <ul class="skills">
                <li v-for="(skill, index) in tempAppend" :key="index">
                    <span class="span-skill">{{ skill }}</span>
                </li>
            </ul>
            <input v-model="checked" id="check" type="checkbox" /><label class="label" for="check">Information <span v-if="checked">Public</span><span v-else>Private</span></label>
            <button @click="update()">Update</button>
        </div>
    <a @click="close" class="close" />
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, PropType, ref } from 'vue'
import router from "../../router/index"

export default defineComponent({
    name: "editSkills",
    props: {
        id: {type: String, required: true},
        private: {type: Boolean, required: false, default: true},
        curr: {type: Array as PropType<Array<string>>, required: false, default: []},
        close: {type: Function, required: true},
    },
    setup(props) {
        const checked = ref(!props.private);
        const toAppend = ref<string []>([]);
        const tempAppend = ref(toAppend.value.concat(props.curr));
        const temp= ref("");
        const append = () => {
            if(toAppend.value.includes(temp.value)) {
                temp.value = "";
            }else{
                toAppend.value.push(temp.value);
                tempAppend.value.push(temp.value);
                temp.value ="";
            }
        }

        const update = async() =>{
            try {
                if(temp.value != ''){
                    append();
                }
                const response = await axios.patch("https://localhost:8000/users/"+props.id, {
                    Experience: {
                        private: !(checked.value),
                        Experience: tempAppend.value,
                    }
                })
                router.go(0)
            }catch(error){
                console.log("**UPDATE ERROR**")
            }
        }
        return { checked, temp, append, tempAppend, update }
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
    max-width: 80%;

}
.msg {
    color: white;
    font-size: 25px;
    font-weight: bolder;
    margin: 15px 15px 5px 15px;
}
.skills{
    list-style-type: none;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    /* flex-wrap: wrap; */
    max-width: 80%;
    padding: 0px;
}

.skills li {
    margin: 5px 5px 35px 5px;
}
.span-skill {
    color: white;
    border: solid;
    border-color: white;
    padding: 15px;
    border-radius: 25px;
    text-align: center;
    transition: all 0.2s;
}
.span-skill:hover {
    background-color: white;
    color: black;
    cursor: pointer;
}

.internal input[type=text] {
    border: solid;
    background-color: white;
    border-radius: 25px;
    line-height: 50px;
    width: 80%;
    font-size: 2em;
    color: #222;
    padding: 5px;
    /* text-align: center; */
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