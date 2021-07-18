<template>
  <div id="all">
    <div id="inputs">
      <input v-model="fName" @blur="blurfName" :class="{ nonerror: !fNameError }" type="text" size="25" placeholder="First Name" /><br />
      <span id="errors" v-if="fNameError">*First name field cant be empty</span>
      <input v-model="lName" @blur="blurlName" :class="{ nonerror: !lNameError }" type="text" size="25" placeholder="Last Name" /><br />
      <span id="errors" v-if="lNameError">*Last name field cant be empty</span>
      <input v-model="email" @blur="blurEmail" :class="{ nonerror: !emailError && !emailErrorB }" type="email" size="25" placeholder="Email" /><br />
      <span id="errors" v-if="emailError">*Email field cant be empty</span>
      <span id="errors" v-if='emailErrorB'>*Wrong email</span>
      <input v-model="pass" @blur="blurPass" :class="{ nonerror: !PassError }" type="password" size="25" placeholder="Password" /><br />
      <span id="errors" v-if="PassError">*Password field cant be empty</span>
      <!-- <span id="errors" v-if='errorFlag'>*Use better password</span> -->
      <input v-model="vPass" @blur="blurVPass" :class="{ nonerror: !vPassError && !vPassErrorB }" type="password" size="25" placeholder="Verify Password" /><br />
      <span id="errors" v-if="vPassError">*Please verify the password</span>
      <span id="errors" v-if='vPassErrorB'>*Password and verified password are diffrent</span>
      <input v-model="phoneNumber" @blur="blurPhoneNumber" :class="{ nonerror: !phoneNumberError }" type="tel" size="25" placeholder="Phone Number" /><br />
      <span id="errors" v-if="phoneNumberError">*Phone number field cant be empty</span>
      <!-- <span id="errors" v-if='errorFlag'>*Wrong phone number format</span> -->

      <input @blur="blurPhoto" @change="selectedFile()" :class="{ nonerror: !photoError }" type="file" accept="image/*"/>
      <span id="errors" v-if="photoError">*Please select an image</span>
    </div>
    <div id="button">
      <button @click="submit()">Sign in!</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "@vue/runtime-core"

export default defineComponent({
  name: "signInForm",
  setup() {
    const fName = ref("")
    const lName = ref("")
    const email = ref("")
    const pass = ref("")
    const vPass = ref("")
    const phoneNumber = ref("")
    const photo = ref(null)

    const fNameError = ref(false)
    const lNameError = ref(false)
    const emailError = ref(false)
    const emailErrorB = ref(false)
    const PassError = ref(false)
    const vPassError = ref(false)
    const vPassErrorB = ref(false)
    const phoneNumberError = ref(false)
    const photoError = ref(false)


    const blurfName = () => {
      if(!fName.value){
        fNameError.value = true;
      }
    };
    const blurlName = () => {
      if(!lName.value){
        lNameError.value = true;
      }
    };
    const blurEmail = () => {
      if(!email.value){
        emailError.value = true;
      }
    };
    const blurPass = () => {
      if(!pass.value){
        PassError.value = true;
      }
    };
    const blurVPass = () => {
      if(!vPass.value){
        vPassError.value = true;
      }
    };
    const blurPhoneNumber = () => {
      if(!phoneNumber.value){
        phoneNumberError.value = true;
      }
    };


    watch(fName, () => {
      fNameError.value = false
    })
    watch(lName, () => {
      lNameError.value = false
    })
    watch(email, () => {
      emailError.value = false
      emailErrorB.value = false
    })
    watch(pass, () => {
      PassError.value = false
    })
    watch(vPass, () => {
      vPassError.value = false
      vPassErrorB.value = false
    })
    watch(phoneNumber, () => {
      phoneNumberError.value = false
    })


    const submit = () => {
      if(fNameError.value || lNameError.value || PassError.value || emailError.value || vPassError.value || phoneNumberError.value || photoError.value){

      }else{
        blurfName();blurlName();blurPass();blurVPass();blurEmail();blurPhoneNumber();
        if(pass.value != vPass.value && !PassError.value){
          vPassErrorB.value = true
        }else{
          //send to server
          //if server responded with email already inside
          // emailErrorB.value = true
        }
      }
    }
    const selectedFile = (event) => {
      // photo = event.target.files[0]

      // console.log(event)
    }
    return { fName, lName, email, pass, vPass, phoneNumber, 
    fNameError, lNameError, PassError, emailError, emailErrorB, vPassError, vPassErrorB, phoneNumberError, photoError, 
    blurfName, blurlName, blurEmail, blurPass, blurVPass, blurPhoneNumber, 
    submit, selectedFile };
  },
});
</script>

<style scoped>
@import "../styles/formGlobal.css";
</style>