<template>
    <div class="external">
        <div class="internal">
            <searchBar :request="request" />
            <div class="list">
                <ul>
                    <li v-for="user in searchCurr" :key="user">
                        <div class="inner" @click="chose(user._id)">
                            <img
                                :src="getPic(user.ProfilePic)"
                                width="75"
                                height="75"
                            />
                            <div class="text">
                                <span class="name">{{user.firstname}} {{ user.lastname }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    <a @click="close" class="close" />
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue'
import searchBar from '../searchBar.vue'
import { userListType } from "../../tsLibs/auth";
import { getPic } from "../../tsLibs/funcs";

export default defineComponent({
    name: "editEducation",
    props: {
        id: {type: String, required: true},
        close: {type: Function, required: true},
        chooseNew: {type: Function, required: true},
    },
    components: {
        searchBar,
    },
    setup(props) {
        const searchCurr = ref<userListType[]>([]);


        const request = async(input: String) => {
            if(input != '')
            try {
                const response = await axios.get("https://localhost:8000/search/"+props.id+"/"+input.toString());
                // console.log(response.data)
                searchCurr.value = response.data;
            }catch(error){
                console.log("**SEARCH ERROR**")
            }
        }

        const chose = (chosen: String) =>{
            props.chooseNew(chosen);
            props.close()
        }

        return { searchCurr, request, getPic, chose }
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
    background-color: rgba(0, 0, 0, 0.767);
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    padding: 1em 4em 4em 4em;
    border-radius: 25px;
}
.internal ul {
    padding: 0;
    margin: 20px 0 0px 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    width: 100%;
}
.inner {
    display: flex;
    flex-direction: row;
    padding: 15px;
    border-bottom: solid;
    border-color: white;
    color: white;
    border-width: 1px;
    font-size: 25px;
    align-items: center;
    transition: all 0.15s ease-in-out;
}

.inner:hover {
    background-color: white;
    color: black;
    cursor: pointer;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
}

.inner img {
    border-radius: 40px;
    margin-right: 15px;
}


:deep(.searchInput) {
    font-size: 35px;
    border-width: 1px;
    z-index: 0;
    font-weight: bold;
    width: 400px;
}

:deep(.searchInput::placeholder) {
    font-size: 35px;
}
:deep(.searchButton){
    z-index: 2;
    border-width: 1px;
}
</style>