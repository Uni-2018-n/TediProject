<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal">
                <div class="top">
                    <label for="img">
                        <img
                            src="@/assets/blank-profile-picture.png"
                            width="180"
                            height="180"
                        />
                    </label>
                    <input type="file" id="img" accept="image/*"/>
                </div>
                <div class="rest">
                    <div class="email">
                        <span>Update Email:</span>
                        <div class="input" @click="atClick">
                            <input id="email" v-model="currEmail" :disabled="emailDisabled" />
                        </div>
                    </div>
                    <div class="pass">
                        <span>Update Password:</span>
                        <input />
                        <span>Verify Password:</span>
                        <input />
                    </div>
                    <div class="btn">
                        <button>Reset</button>
                        <button>Update</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import navBar from "../../components/navBar.vue";
import Footer from "../../components/footer.vue";

export default defineComponent({
    name: "SettingsView",
    components: {
        navBar,
        Footer,
    },
    setup() {
        const currEmail = ref("email@hotmail.com")
        const emailDisabled = ref(true);
        const atClick = () => {
            emailDisabled.value=false;
            currEmail.value='';
            window.setTimeout(function () { 
                (document.getElementById("email") as HTMLInputElement).focus();
            }, 0); 
        }
        return { currEmail, emailDisabled, atClick }
    },
})
</script>
<style scoped>
.big {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.external {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-bottom: 1%;
}
.internal {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 25px;
    min-width: fit-content;
    padding: 40px;
    /* width: 30%; */
    flex-direction: column;
}
.top label img {
    border-radius: 100px;
}
.top label:hover {
    cursor: pointer;
}
.top {
    margin: 50px 0 60px 0;
}
.top input{
    display: none;
}
.rest {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
}
.email, .pass {
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
}
.pass {
    margin-bottom: 20px;
}
.email > input, .pass > input {
    font-family: Arial, Helvetica, sans-serif;
    border: solid;
    border-width: 1px;
    border-radius: 35px;
    border-color: rgb(197, 197, 197);
    font-size: 22px;
    padding: 15px;
}
.input > input {
    font-family: Arial, Helvetica, sans-serif;
    border: solid;
    border-width: 1px;
    border-radius: 35px;
    border-color: rgb(197, 197, 197);
    font-size: 22px;
    padding: 15px;
}
.input > input:focus{
    outline: none;
}
.rest .email,.pass > input:focus {
    outline: none;
}
.pass > input {
    margin-bottom: 20px;
}
.btn {
    display: flex;
    justify-content: space-between;
}
.btn button {
    background-color: rgb(66, 132, 255);
    padding: 25px 35px 25px 35px;
    font-size: 22px;
    color: rgb(235, 235, 235);
    border: none;
    border-radius: 35px;
}
.btn button:hover{
    cursor: pointer;
    background-color: rgb(139, 176, 245);
}
</style>