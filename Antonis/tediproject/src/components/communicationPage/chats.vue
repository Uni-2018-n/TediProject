<template>
    <div class="external">
        <div class="internal">
            <ul>
                <li v-for="user in users" :key="user">
                    <userChats @click="load(chatter(user), user._id, user.messages)" :user="chatter(user)" :selected="findOther(user.chaters) === current"/>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import userChats from '../communicationPage/userChats.vue'
import { chatsListType, chatsMessagesType, userListType } from "../../tsLibs/auth"
import axios from 'axios'

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
    async setup(props) {
        const chatter = async(user: chatsListType) => {
            if(user.chaters[0] === props.id){
                try {
                    const response = await axios.get("https://localhost:8000/users/"+user.chaters[1])
                    return response.data
                }catch(err){
                    console.log("**LEFT USER ERROR**")
                }
            }else{
                try {
                    const response = await axios.get("https://localhost:8000/users/"+user.chaters[0])
                    return response.data
                }catch(err){
                    console.log("**LEFT USER ERROR**")
                }
            }
        }
        const findOther = (chatters: Array<String>) =>{
            return chatters[0] === props.id ? chatters[1] : chatters[0]
        }
        
        const current = ref(findOther(props.users[0].chaters))
        const load = async(other: Promise<userListType>, msg_id: string, msgs: Array<chatsMessagesType>) =>{
            other.then(data =>{
                current.value = data._id;
                props.loaded({id: data, msg_id: msg_id, msgs: msgs})
            })
        }
        load(chatter(props.users[0]), props.users[0]._id.toString(), props.users[0].messages)
        return {current, load, chatter, findOther }
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