<template>
  <div id="general" class="disable-select">
    <ul>
      <div class="btn">
        <li class="wborders">©copyright</li>
      </div>
      <div class="btn">
        <li @click="termsFlag=true;overflow=true" class="wborders">terms of use</li>
      </div>
      <div class="btn">
        <li class="wborders">privacy notice</li>
      </div>
      <div class="btn">
        <li class="wborders">cookie policy</li>
      </div>
      <div class="btn">
        <li class="wborders">Made in Greece</li>
      </div>
    </ul>
  </div>
  <terms v-if="termsFlag" :termTriger="() => termTriger()" />
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import terms from "./terms.vue";

export default defineComponent({
  name: "Footer",
  components: {
    terms,
  },
  setup() {
    const termsFlag = ref(false);

    const termTriger = () => {
      termsFlag.value = false;
    }

    return { termsFlag, termTriger }
  },
});
</script>

<style scoped>
.disable-select {
  -webkit-user-select: none;  
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;
}

#general {
  display: block;
  /* margin-top: 5%; */
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 5%;
  background-color: rgb(0, 132, 255);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -2px 15px rgba(0, 0, 0, 0.671);
}
#general ul {
  padding: 0;
}
#general ul li {
  display: inline;
  padding: 5px;
  margin-right: 10px;
}

.btn {
  display: inline;
}

.btn {
  margin-right: 10px;
  padding: 10px;
  border-style: none none none solid;
  border-color: rgb(150, 150, 150);
  border-width: 3px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  /* width: 100px; */
  /* height: 30px; */
  /* display: block; */

  font-size: 15px;
  
  background: linear-gradient(
    to right,
    rgb(150, 150, 150) 50%,
    rgba(255, 255, 255, 0) 50%
  );
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 0.5s ease-out;
}

.btn:hover {
  background-position: left bottom;
  cursor: pointer;
}
</style>