<template>
  <div id="all">
    <div id="inputs">
      <input v-model="fName" @blur="blurfName" :class="{ nonerror: !fNameError }" type="text" size="25" placeholder="First Name" />
      <span id="errors" v-if="fNameError">*First name field cant be empty</span>
      <input v-model="lName" @blur="blurlName" :class="{ nonerror: !lNameError }" type="text" size="25" placeholder="Last Name" />
      <span id="errors" v-if="lNameError">*Last name field cant be empty</span>
      <input v-model="email" @blur="blurEmail" :class="{ nonerror: !emailError && !emailErrorB }" type="email" size="25" placeholder="Email" />
      <span id="errors" v-if="emailError">*Email field cant be empty</span>
      <span id="errors" v-if='emailErrorB'>*Wrong email</span>
      <input v-model="pass" @blur="blurPass" :class="{ nonerror: !PassError }" type="password" size="25" placeholder="Password" />
      <span id="errors" v-if="PassError">*Password field cant be empty</span>
      <!-- <span id="errors" v-if='errorFlag'>*Use better password</span> -->
      <input v-model="vPass" @blur="blurVPass" :class="{ nonerror: !vPassError && !vPassErrorB }" type="password" size="25" placeholder="Verify Password" />
      <span id="errors" v-if="vPassError">*Please verify the password</span>
      <span id="errors" v-if='vPassErrorB'>*Password and verified password are diffrent</span>
      <input v-model="phoneNumber" @blur="blurPhoneNumber" :class="{ nonerror: !phoneNumberError }" type="tel" size="25" placeholder="Phone Number" />
      <span id="errors" v-if="phoneNumberError">*Phone number field cant be empty</span>
      <!-- <span id="errors" v-if='errorFlag'>*Wrong phone number format</span> -->

      <input @change="selectedFile" @blur="blurPhoto" type="file" name="file" id="file" class="inputfile" accept="image/*" />
      <label for="file" id="fileLabel" :class="{ nonerror: !photoError }">Choose a file</label>
      <span id="fileName" v-if="photo" :title="photo.name">{{ fileName }}</span>
      <span id="errors" v-if="photoError">*Please select an image</span>
    </div>
    <div id="button">
      <button @click="submit">Register</button>
    </div>
  </div>



  
</template>

<script>
import { defineComponent, ref, watch } from "@vue/runtime-core"
import axios from 'axios'

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
    const fileName = ref("")

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

    const blurPhoto = () => {
      if(!photo.value){
        photoError.value = true;
      }
    }


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
    watch(photo, () => {
      photoError.value = false
    })

    const submit = async () => {
      blurfName();blurlName();blurPass();blurVPass();blurEmail();blurPhoneNumber();blurPhoto();
      if(fNameError.value || lNameError.value || PassError.value || emailError.value || vPassError.value || phoneNumberError.value || photoError.value){

      }else{
        if(pass.value != vPass.value && !PassError.value){
          vPassErrorB.value = true
        }else{
          // const fd = new FormData();
          // fd.append('photo', photo.value, photo.value.name)
          try {
            const response = await axios.post('localhost:5000/users', {
            // const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
              "firstname": fName.value,
              "lastname": lName.value,
              "email": email.value,
              "password": pass.value,
              // "photo": fd,
              // title: 'sftest',
              // body: 'bar',
              // userId: 1,
            })
            const data = response.data
            console.log(data)
            //if server responded with email already inside
            // emailErrorB.value = true
          }catch (e){
            console.error(e)
          }
        }
      }
    }
    const selectedFile = (event) => {
      if(event){
        if(event.target.files[0].size > 100000){
          console.log('error image more than 50k') //TODO
        }else{
          photo.value = event.target.files[0]
          // console.log(photo.value)
          fileName.value = photo.value.name.substring(0,16)
        }
      }
    }
    return { fName, lName, email, pass, vPass, phoneNumber, fileName, photo, 
    fNameError, lNameError, PassError, emailError, emailErrorB, vPassError, vPassErrorB, phoneNumberError, photoError, 
    blurfName, blurlName, blurEmail, blurPass, blurVPass, blurPhoneNumber, blurPhoto, 
    submit, selectedFile };
  },
});
</script>

<style scoped>
@import "../styles/formGlobal.css";

.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
  right: 0%;
	z-index: -1;
}

#fileLabel {
  display: inline-block;
  border: 2px solid #808080;
  color: gray;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

#fileName {
  display: inline-block;
  margin-left: 10px;
}

.inputfile:focus + label,
.inputfile + label:hover {
  background-color: #f3f3f3;
} 
.inputfile + label {
	cursor: pointer;
}
</style>