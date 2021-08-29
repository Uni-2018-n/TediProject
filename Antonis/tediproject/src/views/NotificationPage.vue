<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal">
                <div class="inner">
                    <div class="friend-requests" >
                        <span class="headline">Connection Requests</span>
                        <ul v-if="requests.length">
                            <li v-for="request in requests" :key="request">
                                <img
                                    src="@/assets/blank-profile-picture.png"
                                    width="75"
                                    height="75"
                                />
                                <div class="info">
                                    <span> {{ request.name }} </span>
                                    <div v-if="request.flag" class="btns">
                                        <button class="btn accept">Accept</button>
                                        <button class="btn reject">Reject</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="else" v-else>
                            <span>No information available</span>
                        </div>
                    </div>
                    <div class="other-notifications">
                        <span class="headline">Other Notifications</span>
                        <ul v-if="notifications.length">
                            <li v-for="notification in notifications" :key="notification">
                                <img
                                    src="@/assets/blank-profile-picture.png"
                                    width="75"
                                    height="75"
                                />
                                <div class="txt" v-if="notification.action === 'like'">
                                    <span>Connected user {{ notification.name }} liked your post!</span>
                                </div>
                                <div class="txt" v-else-if="notification.action === 'comment'">
                                    <span>Connected user {{ notification.name }} added a comment on your post!</span>
                                </div>
                            </li>
                        </ul>
                        <div class="else" v-else>
                            <span>No information available</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";

export default defineComponent({
    name: "NotificationPage",
    components: {
        navBar,
        Footer,
    },
    setup() {
        const requests = reactive([
            {
                name: "Antonis Kalamakis",
                flag: true,
            },
            {
                name: "Antonis Kalamakis2",
                flag: true,
            }
        ]);
        const notifications = reactive([
            {
                name: "Antonis Kalamakis",
                type: "post",
                action: "comment",
            },
            {
                name: "Antonis Kalamakis2",
                type: "post",
                action: "like",
            },
            {
                name: "Antonis Kalamakis3",
                type: "post",
                action: "like",
            },
            {
                name: "Antonis Kalamakis4",
                type: "post",
                action: "comment",
            }
        ])
        // const requests = reactive([]);
        return { requests, notifications }
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
    padding: 20px;
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
    width: fit-content;
}
.inner {
    height: 100%;
    min-height: 0px;
    overflow-y: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
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
.friend-requests li img {
    border-radius: 50px;
}
.info {
    margin-top: 10px;
    margin-left: 15px;
}
.info span {
    font-size: 18px;
    font-weight: 600;
}
.btns {
    margin: 10px 10px 0px 30px;
}
.btn {
    margin: 0px 5px;
    background-color: lightgray;
    border: none;
    padding: 10px 15px;
    border-radius: 10px;
}
.accept{
    border: solid;
    background-color: rgba(66, 101, 255, 0.404);
    border-color: rgba(66, 101, 255, 0.663);
    border-width: 2px;
}
.accept:hover {
    background-color: rgba(66, 101, 255, 0.663);
    cursor: pointer;
}
.reject:hover {
    background-color: rgb(173, 173, 173);
    cursor: pointer;
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

.other-notifications ul li img {
    border-radius: 50px;
    margin-right: 10px;   
}
</style>