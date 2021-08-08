<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div class="searchBox">
        <input class="searchInput" type="search" name="q" placeholder="Type to search...">
        <button class="searchButton" type="submit">
            <i class="material-icons"> search </i>
        </button>
    </div>
    <div class="container">
        <ul>
            <li>
                <input type=radio name="searchOpt" id="radio1" checked>
                <label for="radio1">ID</label>
            </li>
            <li>
                <input type=radio name="searchOpt" id="radio2">
                <label for="radio2">Name</label>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "userSearch",
  components: {},
  setup() {
    return {};
  },
});
</script>
<style scoped>
.searchBox {
    height: 50px;
    width: max-content;
    float: left;
}
.searchInput {
    border-style: none none solid none;
    border-color: white;
    background: none;
    height: 50px;
    padding: 0;
    outline: none;
    font-size: 22px;
    font-weight: bold;
    color: white;
    float: left;
}

.searchInput::placeholder {
    color: white;
}
.searchButton {
    height: 50px;
    width: 50px;
    background: none;
    padding: 0;
    border-style: none none solid none;

    border-color: white;
    color: white;
    text-align: center;
    cursor: pointer;
}
.searchButton:hover {
    background-color: rgba(0, 0, 0, 0.226);
}
.container {
    height: 50px;
    float: left;
}
.container ul {
    list-style: none;
    width: 100%;
    padding: 0;
    /* margin: 0 0 0 30px; */
    border-style: none none none solid;
    border-width: 2px;
    border-color: rgb(241, 241, 241);
    margin: 0;
}
.container li {
    text-align: center;
    /* border: solid; */
    display: inline-block;
    width: 50px;
    margin: 0;
    margin-right: 22px;
}
.container input {
    opacity: 0;
    position: fixed;
    width: 0;
    margin: 0;
    padding: 0;
}
.container label {
    cursor: pointer;
    border-style: none none solid none;
    /* border: solid; */
    border-width: 2px;
    border-color: rgb(201, 201, 201);
    padding: 11px;
    display: block;
    width: 100%;
    margin: 0;
    font-size: 22px;
    font-weight: bold;
    color: white;

}
.container input:checked + label {
    border-color: white;
}
.container label:hover {
    background-color: rgba(0, 0, 0, 0.226);
}
</style>