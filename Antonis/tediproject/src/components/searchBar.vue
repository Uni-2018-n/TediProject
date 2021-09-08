<template>
   <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div class="searchBox">
        <button class="searchButton" type="submit">
            <i @click="request(txt)" class="material-icons"> search </i>
        </button>
        <input @keyup.enter.prevent="request(txt)" class="searchInput" v-model="txt" type="search" name="q" placeholder="Type to search...">
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "searchBar",
  props: {
      request: {type: Function, required: true},
  },
  setup() {
      const txt = ref("");
      return { txt }
  },
});
</script>
<style scoped>
.searchBox {
    height: 50px;
    float: left;
}

.searchInput {
    border-style: none none solid none;
    border-color: rgb(255, 255, 255);
    background: none;
    height: 50px;
    padding: 0;
    outline: none;
    font-size: 22px;
    font-weight: bold;
    color: rgb(255, 255, 255);
    float: left;
}

.searchInput::placeholder {
    color: rgb(255, 255, 255);
}

.searchInput::-webkit-search-cancel-button {
    display: none;
    width: 0;
    height: 0;
}
.searchButton {
    height: 50px;
    width: 50px;
    background: none;
    padding: 0;
    border-style: none none solid none;
    float:right;
    border-color: rgb(255, 255, 255);
    color: rgb(255, 255, 255);
    text-align: center;
    cursor: pointer;
}
.searchButton:hover {
    background-color: rgba(0, 0, 0, 0.226);
}
</style>