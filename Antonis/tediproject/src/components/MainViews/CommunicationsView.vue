<template>
    <div class="big">
        <navBar />
        <div class="external-com">
            <div class="left">
                <div class="top">
                    <span>Chats</span>
                    <img @click="popupSearchFlag=true;"
                    src="@/assets/outline_chat_black_24dp.png"
                    width="25"
                    height="25"
                    />
                </div>
                <chats :loaded="loaded" :users="temp" />
            </div>
            <div class="right">
                <chat v-if="current" :id="current"/>
            </div>
        </div>
        <Footer />
    </div>
    <popupSearch v-if="popupSearchFlag" :close="()=>{popupSearchFlag=false;}"/>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import chats from '../components/communicationPage/chats.vue'
import chat from '../components/communicationPage/chat.vue'
import popupSearch from '../components/communicationPage/popupSearch.vue'

export default defineComponent({
    name: "CommunicationsView",
    components: {
        chat,
        chats,
        navBar,
        Footer,
        popupSearch,
    },
    setup() {
        const temp = reactive([
  {
    "_id": "6122b9bae9466ae106d9e510",
    "name": "Chelsea Mccall"
  },
  {
    "_id": "6122b9baede1f3277afe810c",
    "name": "Beatrice Becker"
  },
  {
    "_id": "6122b9baf55ee587aea1e580",
    "name": "Cote Morgan"
  },
  {
    "_id": "6122b9ba5b7175ddedaa90cf",
    "name": "Opal Faulkner"
  },
  {
    "_id": "6122b9ba0b88fc51bda63644",
    "name": "Stacey Banks"
  },
  {
    "_id": "6122b9badf8a2157276c37ca",
    "name": "Deann Parrish"
  },
  {
    "_id": "6122b9bafcdf45253095ba50",
    "name": "Merrill Mcgowan"
  },
  {
    "_id": "6122b9ba947d06f7ae6e4292",
    "name": "Frazier Sparks"
  },
  {
    "_id": "6122b9ba471d54070c635613",
    "name": "Miranda May"
  },
  {
    "_id": "6122b9ba52fb67b031f92423",
    "name": "Rosario Flynn"
  }
]);

        const current = ref("")
        const loaded = (id: string) =>{
            current.value = id;
        }

        const popupSearchFlag = ref(false);
        return { temp, current, loaded, popupSearchFlag }
    },
})
</script>
<style scoped>
.big {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.external-com {
    margin: 1%;
    flex: 1;
    height: 100%;
    min-height: 0px;
    display: flex;
}
.left {
    background-color: white;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: max-content;

    display: flex;
    flex-direction: column;
}
.right {
    flex: 1;
    margin-left: 5px;
    height: 100%;
    min-height: 0px;
    display: flex;
}
.top {
    padding: 10px;
}
.top span {
    font-size: 27px;
    font-weight: bolder;
    font-family: "Poppins", Arial, sans-serif;
    margin-left: 35px;
}
.top img {
    border: solid;
    border-color: rgb(248, 248, 248);
    background-color: rgb(249, 249, 249);
    border-radius: 15px;
    border-width: 1px;
    padding: 5px;
    float: right;
}
.top img:hover {
    opacity: 0.7;
    cursor: pointer;
}
</style>