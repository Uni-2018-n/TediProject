<template>
  <div class="general" :class="{ selected: selected }">
    <span id="id">{{ user._id }}</span>
    <div id="inside">
        <img
          :src="getPic(user.ProfilePic)"
          width="65"
          height="65"
        />
        <div id="text">
          <span>{{ user.firstname }} {{ user.lastname }}</span><br>
          <!-- <span>{{ name }}</span> -->
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "@vue/runtime-core";
import { defineComponent } from "@vue/runtime-core";
import {userListType} from '../../tsLibs/auth'
import { getPic } from "../../tsLibs/funcs";

export default defineComponent({
  name: "Users",
  props: {
    user: {type: Object as PropType<userListType>, required: true}
  },
  setup() {
    return {getPic, };
  },
});
</script>

<style scoped>
.general {
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
  width: 250px;
  /* max-width: 250px; */
  user-select: none;
}
.selected {
  background-color: rgb(65, 209, 214);
}
.general:hover {
  cursor: pointer;
}
#inside {
  display: flex;
  align-items: center;
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
}
#text {
  padding-left: 10px;
}
#text span {
  font-size: 16px;
}
</style>