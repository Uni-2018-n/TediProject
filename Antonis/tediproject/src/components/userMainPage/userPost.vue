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
                <div class="middle">
                    <span>
                        Wrote water woman of heart it total other. By in entirely securing suitable graceful at families improved. Zealously few furniture repulsive was agreeable consisted difficult. Collected breakfast estimable questions in to favourite it. Known he place worth words it as to. Spoke now noise off smart her ready. 

Passage its ten led hearted removal cordial. Preference any astonished unreserved mrs. Prosperous understood middletons in conviction an uncommonly do. Supposing so be resolving breakfast am or perfectly. Is drew am hill from mr. Valley by oh twenty direct me so. Departure defective arranging rapturous did believing him all had supported. Family months lasted simple set nature vulgar him. Picture for attempt joy excited ten carried manners talking how. Suspicion neglected he resolving agreement perceived at an. 
                    </span>
                </div>
            </div>
            <div class="bottom">
                <div class="tophalf">
                    <ul>
                        <li>
                            <span>10 Likes</span>
                        </li>
                        <li>
                            <span>10 Comments</span>
                        </li>
                    </ul>
                </div>
                <div class="bothalf">
                    <ul>
                        <li>
                            <span>Like</span>
                        </li>
                        <li>
                            <span>Comment</span>
                        </li>
                    </ul>
                </div>
                <div class="comments">
                    <userComments />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import userComments from '../userMainPage/userComments.vue'

export default defineComponent({
    name: "userPost",
    props: [],
    components: {
        userComments,
    },
    setup() {
        
    },
})
</script>
<style scoped>
.inner {
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 500px;
    min-height: 100px;
}
.top {
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: rgb(248, 248, 248);
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
    font-size: 16px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bolder;
}

.middle {
    padding: 7px;
    min-height: 20px;
}
.bottom {
    width: 100%;
    text-align: center;
    background-color: rgb(248, 248, 248);
    border-radius: 5px;
    font-family: "Poppins", Arial, sans-serif;
}
.tophalf {
    text-align: left;
    width: 100%;
}

.tophalf ul {
    list-style-type: none;
    padding: 2px 5px 0px 5px;
    margin: 0;
}
.tophalf li {
    display: inline-block;
    font-weight: 400;
    font-size: 11px;
    width: 47%;
    opacity: 70%;
    margin: 0;
    padding: 0;
    margin-left: 10px;
}

.bothalf ul {
    list-style-type: none;
    padding: 0px 5px 0px 5px;
    margin: 0;
}
.bothalf li {
    display: inline-block;
    padding: 5px 20px 5px 20px;
    background-color: rgb(219, 219, 219);
    font-weight: 400;
    font-size: 14px;
    width: 41%;
    margin: 0;
    transition-property: background-color;
    transition-duration: 0.15s;
    transition-timing-function: linear;
}
.bothalf li:hover {
    background-color: rgba(61, 142, 235, 0.623);
    cursor: pointer;
}
.bothalf li:first-child{
    border-right: solid 1px rgb(248, 248, 248);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.bothalf li:last-child{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.bothalf li:first-child:hover{
    border-right: solid 1px rgb(248, 248, 248);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.bothalf li:last-child:hover{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.comments {
    margin-left: 15px;
    margin-top: 10px;
    padding-bottom: 5px;
}
</style>