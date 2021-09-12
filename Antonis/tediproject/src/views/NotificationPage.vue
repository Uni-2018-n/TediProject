<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal">
                <div class="inner">
                    <div class="friend-requests" >
                        <span class="headline">Connection Requests</span>
                        <ul v-if="requests && requests.length">
                            <li v-for="request in requests" :key="request.id">
                                <requestCard :src="request" :userId="user._id"/>
                            </li>
                        </ul>
                        <div class="else" v-else>
                            <span>No new requests</span>
                        </div>
                    </div>
                    <div class="other-notifications">
                        <span class="headline">Other Notifications</span>
                        <ul v-if="notifications && notifications.length">
                            <li v-for="notification in notifications" :key="notification">
                                <notificationCard :src="notification"/>
                            </li>
                        </ul>
                        <div class="else" v-else>
                            <span>No new notifications</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import { loginCheck, givenType, notificationRequestType, notificationNotificationsType } from "../tsLibs/auth"
import axios from 'axios';
import notificationCard from '../components/notificationPage/notificationCard.vue'
import requestCard from '../components/notificationPage/requestCard.vue'

export default defineComponent({
    name: "NotificationPage",
    components: {
        navBar,
        Footer,
        requestCard,
        notificationCard,
    },
    async setup() {
        const user = ref<givenType>();
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })


        const requests = ref<notificationRequestType[]>();

        if(user.value)
        try {
            const response = await axios.get("https://localhost:8000/users/connect_request/"+user.value._id);
            requests.value = response.data
        }catch(error){
            console.log("**REQUEST ERROR**")
        }

        const notifications = ref<notificationNotificationsType[]>()
        if(user.value)
        try {
            const response = await axios.get("https://localhost:8000/users/notifications/"+user.value._id);
            notifications.value = response.data
        }catch(error){
            console.log("**REQUEST ERROR**")
        }
        return { user,requests, notifications }
    },
})
</script>
<style scoped>
.big {
    display: flex;
    height: 100%;
    flex-direction: column;
}
.external {
    flex: 1;
    padding: 0px 1% 20px 1%;
    height: 100%;
    min-height: 0px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}
.internal {
    background-color: white;
    height: 100%;
    min-height: 0px;
    border-radius: 25px;
    padding: 10px;
    width: max-content;
}
.inner {
    height: 100%;
    min-height: 0px;
    overflow-y: auto;
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    width: max-content;
    align-items: center;
}
.else {
    text-align: center;
}
.else span {
    font-size: 40px;
    font-weight: bolder;
    color: rgb(116, 116, 116);
}
.friend-requests {
    border-bottom: solid;
    border-color: lightgray;
    padding-bottom: 15px;
    border-width: 2px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.friend-requests .headline {
    margin-right: 15em;
    font-size: 28px;
    font-weight: bolder;
    opacity: 0.8;
}
.friend-requests ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
}
.friend-requests li {
    display: flex;
    margin: 15px 15px 0px 15px;
    padding: 15px 20px;
    background-color: rgb(240, 240, 240);
    border-radius: 50px;
}

.other-notifications {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.other-notifications .headline {
    margin-right: 15em;
    font-size: 28px;
    font-weight: bolder;
    opacity: 0.8;
}
.other-notifications ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}
.other-notifications ul li {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 23em;
    padding: 15px 20px;
    background-color: rgb(240, 240, 240);
    border-radius: 50px;
    margin: 15px 15px 0px 15px;
}
.other-notifications ul li:hover {
    opacity: 0.8;
    cursor: pointer;
}

</style>