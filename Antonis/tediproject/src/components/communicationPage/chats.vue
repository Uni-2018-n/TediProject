<template>
    <div class="external">
        <div class="internal">
            <ul>
                <li v-for="user in users" :key="user">
                    <userChats @click="load(chatter(user), user._id)" :user="chatter(user)" :selected="chatter(user) === current" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue'
import userChats from '../communicationPage/userChats.vue'
import { chatsListType } from "../../tsLibs/auth"

export default defineComponent({
    name: "chats",
    props: {
        id: {type: String, required: true},
        loaded: {type: Function, required: true},
        users: {type: Array as PropType<Array<chatsListType>>, required: true },
    },
    components: {
        userChats,
    },
    setup(props) {
        const chatter = (user: chatsListType) => {
            if(user.chaters[0] === props.id){
                return user.chaters[1]
            }else{
                return user.chaters[0]
            }
        }
        
        const current = ref(chatter(props.users[0]));
        onMounted(() => {
            props.loaded(current.value);
        });
        const load = (id: string) =>{
            current.value = id;
            props.loaded(current.value);
        }


        return {current, load, chatter }
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