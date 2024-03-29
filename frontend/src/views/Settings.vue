<template>
    <div class="big">
        <navBar />
        <div class="external">
            <div class="internal">
                <div class="top">
                    <label for="img">
                        <img
                            :src="photoURL"
                            width="180"
                            height="180"
                        />
                    </label>
                    <input @change="selectedFile" type="file" name="file" id="img" accept="image/*"/>
                </div>
                <div class="rest">
                    <div class="email">
                        <span>Update Email:</span>
                        <div class="input" @click="atClick">
                            <input id="email" v-model="currEmail" :disabled="emailDisabled" />
                        </div>
                    </div>
                    <div class="phoneNumber">
                        <span>Update Phone Number:</span>
                        <input v-model="currPhone" />
                    </div>
                    <div class="pass" :class="{ passError: passFlag }">
                        <span>Update Password:</span>
                        <input type="password" v-model="pass" />
                        <span>Verify Password:</span>
                        <input type="password" v-model="vpass" />
                    </div>
                    <div class="btn">
                        <button @click="reset()">Reset</button>
                        <button @click="update()">Update</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    <loading v-if="loadingFlag"/>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import navBar from "../components/navBar.vue";
import Footer from "../components/footer.vue";
import { loginCheck, updateUser, givenType } from "../tsLibs/auth"
import axios from 'axios';
import { getPic } from "../tsLibs/funcs";
import router from "../router/index"
import loading from "../components/loading.vue"

export default defineComponent({
    name: "Settings",
    components: {
        navBar,
        loading,
        Footer,
    },
    async setup() {
        const user = ref<givenType>();
        await loginCheck().then((data: givenType) =>{
            user.value = data;
        })
        const pass = ref("")
        const vpass = ref("")
        const passFlag = ref(false);
        const photo = ref<File>()
        const oldPhoto = ref(user.value!.ProfilePic)
        const photoURL = ref(getPic(user.value!.ProfilePic))
        const oldEmail = ref(user.value!.email.toString())
        const oldPhone = ref(user.value!.number)
        const loadingFlag = ref(false);

        const currEmail = ref(oldEmail.value)
        const currPhone = ref(oldPhone.value)
        const emailDisabled = ref(true);
        const atClick = () => {
            emailDisabled.value=false;
            currEmail.value='';
            window.setTimeout(function () { 
                (document.getElementById("email") as HTMLInputElement).focus();
            }, 0); 
        }

        const selectedFile = (event: Event) => {
            if(event){
                photo.value = ((event.target as HTMLInputElement).files as FileList)[0]
                photoURL.value = URL.createObjectURL(photo.value);
            }
        }
        let flag = false;

        const update = async() => {
            loadingFlag.value=true;
            const fd = new FormData();
            if(pass.value != ""){
                if(pass.value === vpass.value){
                    fd.append('password', pass.value)
                    flag= true;
                }else{
                    passFlag.value = true;
                }
            }
            if(currEmail.value != "" && currEmail.value != oldEmail.value){
                fd.append('email', currEmail.value)
                    flag= true;
            }
            if(photo.value){
                fd.append('file', photo.value!)
                    flag= true;
            }

            if(currPhone.value != "" && currPhone.value != oldPhone.value){
                fd.append('number', currPhone.value)
                    flag= true;
            }
            if(user.value && flag)
            try {
                const response = await axios.patch('https://localhost:8000/users/'+user.value._id, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                user.value = updateUser(response.data);
                router.go(0)
                loadingFlag.value=false;
            }catch (e){
                loadingFlag.value=false;
                console.log("**USER SIGNUP ERROR**")
            }
        }

        const reset = () => {
            passFlag.value = false;
            currEmail.value = oldEmail.value;
            currPhone.value = oldPhone.value;
            emailDisabled.value = true;
            pass.value =""
            vpass.value =""
            photoURL.value = getPic(oldPhoto.value.toString())
        }
        return { currEmail, emailDisabled, atClick, update, reset, pass, vpass, loadingFlag, selectedFile, photoURL, getPic, currPhone, passFlag }
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
    margin: 0px 1% 20px 1%;
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
    -webkit-user-drag: none;
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
.email, .pass, .phoneNumber {
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
}
.pass {
    margin-bottom: 20px;
}
.email > input, .pass > input, .phoneNumber > input {
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
.rest .email > input:focus ,.pass > input:focus ,.phoneNumber > input:focus {
    outline: none;
}
.pass > input {
    margin-bottom: 20px;
}

.passError > input {
    border-color: rgb(255, 0, 0);
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