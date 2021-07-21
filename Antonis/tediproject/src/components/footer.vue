<template>
  <div id='general'>
      <ul>
          <li id="wborders">copyright</li>
          <li id="wborders">terms of use</li>
          <li id="wborders">privacy notice</li>
          <li id="wborders">cookie policy</li>
          <li id="wborders">Made in Greece</li>
      </ul>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "Footer",
    setup(){

    }
})
</script>

<style>
#general {
    display: block;
    margin-top: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 5%; 
    /* padding-right: 20%;  */
    background-color: rgb(0, 132, 255);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0px -2px 15px rgba(0, 0, 0, 0.671);

}
#general ul{
    padding: 0;
}
#general ul li{
    display: inline;
    padding: 5px;
    margin-right: 10px;
}
#wborders {
    border-style: none none none solid;
    border-color: rgb(150, 150, 150);
    border-width: 3px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
#general ul li:hover {
    background-color: rgb(150, 150, 150);
    cursor: pointer;
}
</style>