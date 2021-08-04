<template>
  <div id="general">
    <span id="id">{{ id }}</span>
    <div id="inside">
        <img
          src="@/assets/blank-profile-picture.png"
          width="65"
          height="65"
        />
        <div id="text">
          <span>{{ name }}</span><br>
          <!-- <span>{{ name }}</span> -->
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Users",
  props: ['id', 'name'],
  setup() {
    return {};
  },
});
</script>

<style scoped>
#general {
  background-color: white;
  display: inline-block;
  border-bottom: solid;
  border-color: lightgray;
  border-width: 2px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /* margin-bottom: 10px; */
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  width: 210px;
  /* max-width: 250px; */
}

#inside {
  display: flex;
  align-items: center;
  justify-content: center;
}

#inside img {
  vertical-align: middle;
  border-style: solid;
  border-color: transparent;
  border-radius: 10px;
}

#id {
  color: rgb(143, 143, 143);
  font-size: 12px;
  margin-left: 20px;
}
#text {
  padding-left: 10px;
}
#text span {
  font-size: 16px;
}
</style>