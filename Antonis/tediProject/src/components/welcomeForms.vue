<template>
  <div id="forms">
      <ul>
          <li @click="flag=false">Sign in</li>
          <li @click="flag=true">Register</li>
      </ul>
      <div v-if="!flag" class="inside">
          <input size=25 /><br>
          <input size=25 /><br>
          <input size=25 />
      </div>
      <div v-else class="inside">
          <input size=25 /><br>
          <input size=25 /><br>
          <input size=25 /><br>
          <input size=25 /><br>
          <input size=25 /><br>
      </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    name: "welcomeForms",
    setup(){
        const flag = ref(false)
        return { flag }
    }
}
</script>

<style>
.inside input {
    margin: 0;
    padding: 4px;
    margin-bottom: 20px;
}
.inside {
    display: inline-block;
    margin-top: 15px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
}
#forms {
    display: inline-block;
    border-style: solid;
    border-radius: 40px;
    border-color: rgb(247, 247, 247);
    background-color: rgb(240, 240, 240);
    /* padding-right: 150px; */
    /* padding-bottom: 400px; */

}
#forms ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-left: 30px;
    margin-top: 10px;
    padding-top: 10px;
}
#forms ul li {
    font-size: 20px;
    display: inline;
    cursor: pointer;
    margin-left: 1px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 5px;
    padding-left: 5px;
    border-style: none none solid none;
}
#forms ul li:hover {
    background-color: rgb(211, 212, 212);
}
</style>