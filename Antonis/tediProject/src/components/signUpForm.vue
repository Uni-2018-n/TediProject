<template>
  <div id="all">
    <div id="inputs">
      <input class="nonerror" type="text" size="25" placeholder="First Name" /><br />
      <input class="nonerror" type="text" size="25" placeholder="Last Name" /><br />
      <input type="email" :class="{ nonerror: !errorFlag }" size="25" placeholder="Email" /><br />
      <span id="errors" v-if='errorFlag'>*Wrong email</span>
      <input type="password" :class="{ nonerror: !errorFlag }" size="25" placeholder="Password" /><br />
      <span id="errors" v-if='errorFlag'>*Use better password</span>
      <input type="password" :class="{ nonerror: !errorFlag }" size="25" placeholder="Verify Password" /><br />
      <span id="errors" v-if='errorFlag'>*Password and verified password are diffrent</span>
      <input type="tel" :class="{ nonerror: !errorFlag }" size="25" placeholder="Phone Number" /><br />
      <span id="errors" v-if='errorFlag'>*Wrong phone number format</span>
      <input class="nonerror" type="text" size="25" placeholder="Photo*TODO*" /><br />
    </div>
    <div id="button">
      <button @click="error">Sign in!</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core"

export default defineComponent({
  name: "signInForm",
  setup() {
    const errorFlag= ref(false)
    const error = () => {
      errorFlag.value = true;
    }
    return { errorFlag, error };
  },
});
</script>

<style scoped>
@import "../styles/formGlobal.css";
</style>