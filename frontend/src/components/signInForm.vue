<template>
  <div id="all">
    <form @submit.prevent="submit()" novalidate>
      <div id="inputs">
        <input v-model="email" @blur="blurEmail" :class="{ nonerror: !emailError }" type="email" placeholder="Email"/>
        <span id="errors" v-if="emailError">*Email address cant be empty</span>
        <input v-model="pass" @blur="blurPass" type="password" :class="{ nonerror: !passErrorA && !passErrorB }" placeholder="Password" />
        <span id="errors" v-if="passErrorA">*Password cant be empty</span>
        <span id="errors" v-if="passErrorB">*Wrong email or password</span>
      </div>
      <div id="button">
        <button type="submit">Sign in!</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";
import { login } from '../tsLibs/auth';

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
        login(email.value, pass.value).then(data => {
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