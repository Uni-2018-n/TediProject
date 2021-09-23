<template>
  <div id="external">
    <div id="inside">
      <span id="head">User Information</span>
      <div id="info">
        <img 
        :src="getPic(user.avatar)"
        width="200" 
        height="200" />
        <div id="text">
          <ul>
            <li>
              <label>ID:</label>
              <span>{{ user._id }}</span>
            </li>
            <li>
              <label>Full Name:</label>
              <span>{{user.name}}</span>
            </li>
            <li>
              <label>Email:</label> 
              <span>{{ user.email }}</span>
            </li>
            <li>
              <label>Phone Number:</label>
              <span>{{ user.phoneNumber }}</span>
            </li>
          </ul>
        </div>
      </div>

      <button @click="popupTriger()" id="btn">CLOSE</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
import { getPic } from "../../tsLibs/funcs";
import { adminUserType } from "../../tsLibs/auth";
import { ref } from "@vue/reactivity";

export default defineComponent({
  name: "Users",
  props: {
    popupTriger: {type: Function, required: true},
    userId: {type: String, required: true}
  },
  async setup(props) {
    const user = ref<adminUserType>()

    try {
      const response = await axios.get("https://localhost:8000/test/"+props.userId)
      user.value = response.data
    }catch (error){
      console.log("**ADMIN USER LOAD ERROR**")
    }
    return {getPic, user, };
  },
});
</script>

<style scoped>
#external {
  background-color: rgb(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
#inside {
  margin: 25%;
  border: solid;
  border-color: rgba(224, 224, 224);
  border-radius: 20px;
  background-color: rgba(224, 224, 224);
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 0.5%;
  text-align: center;
}
#head {
  font-size: 40px;
  font-weight: bold;
  color:rgb(56, 56, 56)
}
#info img {
  border-style: solid;
  border-color: transparent;
  border-radius: 150px;
}
#text {
  /* padding-left: 5%; */
  text-align: left;
}
#text ul {
  list-style-type: none;
  display: table;
  padding: 0;
  border-spacing: 5px;
}
#text li {
  display: table-row;
}
#text label, span {
  font-size: 17px;
  font-weight: bold;
  color: rgb(53, 53, 53);
  display: table-cell;
}
#btn {
  /* text-align: center; */
  background-color: rgb(194, 194, 194);
  border: none;
  border-radius: 20px;
  padding: 15px 40px 15px 40px;
  font-weight: bold;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}

#btn:hover {
  cursor: pointer;
  background-color: rgb(175, 175, 175)
}
</style>