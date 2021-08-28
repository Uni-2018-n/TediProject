<template>
  <div id="all">
    <div id="inputs">
      <input v-model="email" @blur="blurEmail" :class="{ nonerror: !emailError }" type="email" placeholder="Email" />
      <span id="errors" v-if="emailError">*Email address cant be empty</span>
      <input v-model="pass" @blur="blurPass" type="password" :class="{ nonerror: !passErrorA && !passErrorB }" placeholder="Password" />
      <span id="errors" v-if="passErrorA">*Password cant be empty</span>
      <span id="errors" v-if="passErrorB">*Wrong email or password</span>
    </div>
    <div id="button">
      <button @click="submit()">Sign in!</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";
import axios from "axios";
import { useStore } from "vuex";
import router from '../router/index'

export default defineComponent({
  name: "signInForm",
  setup() {
    const store = useStore();
    if(store.state.user) {
      console.log(store.state.user);
      router.push('/user');
    }
    const email = ref("")
    const pass = ref("")
    const emailError = ref(false)
    const passErrorA = ref(false)
    const passErrorB = ref(false)


    const error = (t: Number) => {
      if (t == 0) {
        emailError.value = true
      } else if (t == 1) {
        passErrorA.value = true
      } else if (t == 2) {
        passErrorB.value = true
      }
    };
    const submit = async () => {
      if (!email.value || !pass.value) {
        if (!email.value) {
          error(0)
        }
        if (!pass.value) {
          error(1)
        }
      }else{
        //check if server returned error
        //if yes:
        await axios.post("https://localhost:8000/login", {
          email: email.value,
          password: pass.value
        }).then((response) => {
          if(!response.data.flag){
            console.log(response.data.message);
            error(2);//TODO make this so it prints wrong email or password
          }else{
            if(response.data.token) {
              // console.log(response.data.token);
              // localStorage.setItem('user', JSON.stringify(response.data));
              store.state.user = response.data;
              router.push('/user');
            }
          }
          console.log("OK");
        }).catch((errors) => {
          console.log("**LOGIN ERROR**");
        })
      }
    };
    const blurEmail = () => {
      if(!email.value){
        error(0)
      }
    };
    const blurPass = () => {
      if(!pass.value){
        error(1)
      }
    };
    watch(email, () => {
      emailError.value = false
      passErrorB.value = false
    })
    watch(pass, () => {
      passErrorA.value = false
      passErrorB.value = false
    })

    return { email, pass, 
    emailError, passErrorA, passErrorB, 
    submit, blurPass, blurEmail };
  },
});
</script>

<style scoped>
@import "../styles/formGlobal.css";
</style>