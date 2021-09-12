<template>
    <searchBar :request="request" />
    <div class="container">
        <ul>
            <li>
                <input type=radio name="searchOpt" value="1" v-model="query" id="radio1" checked>
                <label for="radio1">ID</label>
            </li>
            <li>
                <input type=radio name="searchOpt" value="0" v-model="query" id="radio2">
                <label for="radio2">Name</label>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";
import searchBar from "../searchBar.vue"

export default defineComponent({
  name: "userSearch",
  props: {
      updateQuery: {type: Function, required: true},
  },
  components: {
      searchBar,
  },
  setup(props) {
    const query = ref("1");
    const request = async(input: string) => {
        // router.push({path: "/userList/"+input.toString()})
        props.updateQuery(input, query.value)
    }

    return { query, request};
  },
});
</script>
<style scoped>
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
    border-color: white;

    padding: 11px;
    display: block;
    width: 100%;
    margin: 0;
    font-size: 22px;
    font-weight: bold;
    color: white;

}
.container input:checked + label {
    border-color: rgb(201, 201, 201);
}
.container label:hover {
    background-color: rgba(0, 0, 0, 0.226);
}
</style>