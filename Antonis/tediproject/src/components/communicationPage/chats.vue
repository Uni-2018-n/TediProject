<template>
    <div class="external">
        <div class="internal">
            <ul>
                <li v-for="user in temp" :key="user">
                    <userChats @click="load(user._id)" :name="user.name" :text="user.text" :selected="user._id === current" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import userChats from '../communicationPage/userChats.vue'

export default defineComponent({
    name: "chats",
    props: {
        loaded: {type: Function, required: true},
    },
    components: {
        userChats,
    },
    setup(props) {
        const temp = reactive([
  {
    "_id": "6122b9bae9466ae106d9e510",
    "name": "Chelsea Mccall"
  },
  {
    "_id": "6122b9baede1f3277afe810c",
    "name": "Beatrice Becker"
  },
  {
    "_id": "6122b9baf55ee587aea1e580",
    "name": "Cote Morgan"
  },
  {
    "_id": "6122b9ba5b7175ddedaa90cf",
    "name": "Opal Faulkner"
  },
  {
    "_id": "6122b9ba0b88fc51bda63644",
    "name": "Stacey Banks"
  },
  {
    "_id": "6122b9badf8a2157276c37ca",
    "name": "Deann Parrish"
  },
  {
    "_id": "6122b9bafcdf45253095ba50",
    "name": "Merrill Mcgowan"
  },
  {
    "_id": "6122b9ba947d06f7ae6e4292",
    "name": "Frazier Sparks"
  },
  {
    "_id": "6122b9ba471d54070c635613",
    "name": "Miranda May"
  },
  {
    "_id": "6122b9ba52fb67b031f92423",
    "name": "Rosario Flynn"
  }
]);
        const current = ref(temp[0]._id);
        onMounted(() => {
            props.loaded(current.value);
        });
        const load = (id: string) =>{
            current.value = id;
        }
        return { temp, current, load }
    },
})
</script>
<style scoped>
.external {
    height: inherit;
    overflow-y: auto;
}
.internal {
    width: max-content;
}
.internal ul {
    list-style-type: none;
    padding: 0;
    margin: 5px;
}
.internal li {
    padding: 0;
    margin-bottom: 5px;
}
.internal li:last-child {
    margin-bottom: 0px;
}
.internal li:hover {
    cursor: pointer;
}
</style>