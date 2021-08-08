<template>
  <div id="external">
    <div id="inside">
      <span id="head">User Information</span>
      <div id="info">
        <img src="@/assets/blank-profile-picture.png" 
        width="200" 
        height="200" />
        <div id="text">
          <ul>
            <li>
              <label>ID:</label>
              <span>{{ userId }}</span>
            </li>
            <li>
              <label>Full Name:</label>
              <span>Antonis Kalamakis</span>
            </li>
            <li>
              <label>Email:</label> 
              <span>xxx.xxxxxxxx@hotmail.com</span>
            </li>
            <li>
              <label>Phone Number:</label>
              <span>690000000</span>
            </li>
          </ul>
        </div>
      </div>

      <button @click="popupTriger()" id="btn">CLOSE</button>
    </div>
    <!-- <h1>test</h1> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: ["popupTriger", "userId"],
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