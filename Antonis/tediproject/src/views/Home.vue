<template>
  <div id="logo">
    <h1>LinkedIn Project</h1>
    <h3>By SDI1800056 and SDI1800000</h3>
  </div>
  <div id="form">
    <welcomeForms />
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import welcomeForms  from '../components/welcomeForms.vue'

export default defineComponent({
  name: "Home",
  components: {
    welcomeForms,
  },
  setup(){

  }
});
</script>

<style>
body {
  background-color: rgb(158, 198, 211);
}
#form {
  margin-left: 55%;
  margin-top: 5%;
}
#logo {
  margin-top: 80px;
  margin-left: 150px;
}
#logo h3{
  margin-left: 50px;
}
</style>
