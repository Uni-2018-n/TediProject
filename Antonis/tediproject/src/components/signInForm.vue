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
import { Store, useStore } from "vuex";
import router from '../router/index'
import { login } from '../jsLibs/auth';

export default defineComponent({
  name: "signInForm",
  setup() {
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
    const submit = () => {
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
        login(email.value, pass.value).then(data => {
          console.log(data);
          error(data);
        });
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