<template>
    <div class="external">
        <div class="internal">
            <ul>
                <li v-for="user in users" :key="user">
                    <userChats @click="load(user._id)" :name="user.name" :text="user.text" :selected="user._id === current" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, ref, onMounted } from 'vue'
import userChats from '../communicationPage/userChats.vue'

export default defineComponent({
    name: "chats",
    props: {
        loaded: {type: Function, required: true},
        users: {type: Array as PropType<Array<{_id: String, name: String}>>, required: true },
    },
    components: {
        userChats,
    },
    setup(props) {
        const current = ref(props.users[0]._id);
        onMounted(() => {
            props.loaded(current.value);
        });
        const load = (id: string) =>{
            current.value = id;
            props.loaded(current.value);
        }
        return {current, load }
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