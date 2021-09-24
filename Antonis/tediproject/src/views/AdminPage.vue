<template>
  <div class="outer">
    <div id="top">
      <userSearch :updateQuery="currSearch"/>
      <div class="container">
        <div class="buttons">
          <ul>
            <li>
              <button @click="select=!select; selectedArray=[];">Select</button>
            </li>
            <li>
              <button @click="sendExport()" :disabled="!select" :class="{ disabled: !select }">Export</button>
            </li>
          </ul>
        </div>
        <div class="radios">
          <ul>
              <li>
                  <input v-model="opt" value="a" type=radio name="expOpt" id="radio3" :class="{ radioDis: !select}" checked :disabled="!select">
                  <label for="radio3" :class="{ radioDis: !select}" >XML</label>
              </li>
              <li>
                  <input v-model="opt" value="b" type=radio name="expOpt" id="radio4" :class="{ radioDis: !select}" :disabled="!select">
                  <label for="radio4" :class="{ radioDis: !select}" >JSON</label>
              </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="genera">
      <ul>
        <li v-for="item in items" :key="item._id">
          <Users @click="if(!select){idprop=item;flag=true;}else{if(selectedArray.includes(item._id)){selectedArray.splice(selectedArray.indexOf(item._id), 1)}else{selectedArray.push(item._id)}}" :user="item" :selected="selectedArray.includes(item._id)" />
          <input class="inpcheck" type="checkbox" :value="item._id" v-model="selectedArray" :id="item._id" />
        </li>
      </ul>
    </div>
    <Footer />
  </div>
  <userInfo v-if=flag :popupTriger="() => popupTriger()" :user="idprop" />
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import Footer from "../components/footer.vue";
import Users from "../components/adminPage/users.vue";
import userInfo from "../components/adminPage/userInfo.vue"
import userSearch from "../components/adminPage/userSearch.vue"
import {userListType, givenType, loginCheck} from '../tsLibs/auth'
import axios from "axios";
import router from "../router/index"

export default defineComponent({
  name: "AdminPage",
  components: {
    Footer,
    Users,
    userInfo,
    userSearch,
  },
  async setup() {
    const user = ref<givenType>();
    await loginCheck().then((data: givenType) =>{
        user.value = data;
        if(user.value && user.value.email != 'admin'){
          router.go(-1)
          // router.push({path: "/user"})
        }
    })

    const items = ref<userListType[]>([])

    try {
      const response = await axios.get("https://localhost:8000/users/admin/users")
      // console.log(response.data)
      items.value = response.data
    }catch(error){
      console.log("**ADMIN ERROR**")
    }

    const query = ref({}); //to send

    const flag = ref(false);
    const idpop = ref<userListType>();

    const select = ref(false);
    const selectedArray = ref([]);

    const popupTriger = () => {
      flag.value = false;
    }
    const currSearch = async(input: string, type: string) =>{
      if(input === ''){
        console.log("empty")
        try {
          const response = await axios.get("https://localhost:8000/users/admin/users")
          console.log(response.data)
          items.value = response.data
        }catch(error){
          console.log("**ADMIN ERROR**")
        }
        return;
      }
      if(type === '1'){
        //id
        console.log("checking with id")
        try {
          const response = await axios.get("https://localhost:8000/search/search/id/"+input)
          console.log(response.data)
          items.value = response.data
        }catch(error){
          console.log("**ADMIN SEARCH ID**")
        }
      }else{
        //name
        console.log("checking with name")
        try {
          const response = await axios.get("https://localhost:8000/search/"+input)
          console.log(response.data)
          items.value = response.data
        }catch(error){
          console.log("")
        }

      }
    }

    const opt = ref("a");

    const sendExport = async () => {
      if(opt.value === "a"){
        try {
          const response = await axios.post("https://localhost:8000/users/admin/xml", {
            users: selectedArray.value,
          })
          // console.log(response.data)
          var fileUrl = URL.createObjectURL(new Blob([response.data], {type: 'application/xml'}))
          let fURL = document.createElement('a');
          fURL.href = fileUrl;
          fURL.setAttribute('download', 'users.xml');
          document.body.appendChild(fURL);
          fURL.click();
          document.body.removeChild(fURL);
        }catch(error){
          console.log("**B ERROR**")
        }
      }else{
        try {
          const response = await axios.post("https://localhost:8000/users/admin/json", {
            users: selectedArray.value,
          })
          var fileUrl = URL.createObjectURL(new Blob([JSON.stringify(response.data.users, null, 2)], {type: 'application/json'}))
          let fURL = document.createElement('a');
          fURL.href = fileUrl;
          fURL.setAttribute('download', 'users.json');
          document.body.appendChild(fURL);
          fURL.click();
          document.body.removeChild(fURL);
        }catch(error){
          console.log("**B ERROR**")
        }
      }
    }



    return { items, flag, idpop, popupTriger,
             select, selectedArray, opt, sendExport, currSearch}
  }
});
</script>
<style scoped>
.outer {
  display: flex;
  flex-direction: column;
  /* margin: 25px; */
  height: 100%;
}
#genera {
  text-align: center;
  flex: 1;
  height: 100%;
}
ul {
  list-style-type: none;
  display: grid;
  column-gap: 5px;
  row-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr;
}
#top {
  /* margin-bottom: 10px; */
  margin: 25px;
}
.inpcheck {
  opacity: 0;
  position: fixed;
  width: 0;
  margin: 0;
  padding: 0;
}
.container {
    height: 50px;
    float: right;
}
.buttons {
  height: 50px;
  float: left;
}
.buttons ul {
  display: block;
  margin: 0;
  padding: 0;
  height: 100%;
}
.buttons li {
  margin: 0 5px 5px 0;
}
.buttons li:hover {
  cursor: pointer;
}
.buttons button {
  border: none;
  text-decoration: none;
  background-color: transparent;
  user-select: none;
  padding: 0 10px;
  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  background: #fafafa;
  color: #222;
  border-radius: 4px;
  box-shadow: inset 0 -2px 0 0 rgb(0 0 0 / 15%);
  font-size: 14px;
  font-weight: bold;
  height: 50%;
  width: 70px;
  line-height: 23px;
}
.buttons li button:disabled {
  background-color: rgb(190, 190, 190);
}
.buttons button.disabled:hover {
  background-color: rgb(190, 190, 190);
  cursor: not-allowed;
}
.buttons li button:hover {
  background-color: rgb(228, 228, 228);
  cursor: pointer;
}
.radios {
  margin: 0;
  padding: 0;
  float: right;
}
.radios ul {
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
}
.radios li {
    text-align: center;
    display: inline-block;
    width: 50px;
    margin: 0;
    margin-right: 17px;
}
.radios li:last-child {
  margin-right: 0px;
}
.radios input {
    opacity: 0;
    position: fixed;
    width: 0;
    margin: 0;
    padding: 0;
}
.radios label {
    cursor: pointer;
    border-style: none none solid none;
    border-width: 2px;
    border-color: white;
    padding: 11px;
    display: block;
    width: 100%;
    margin: 0;
    font-size: 22px;
    font-weight: bold;
    color: white;
}
.radios input:checked + label {
    border-color: rgb(201, 201, 201);
}
.radios label:hover {
    background-color: rgba(0, 0, 0, 0.226);
}
.radios input:disabled + label {
  border-color: rgba(0, 0, 0, 0.226);
  background-color: rgba(0, 0, 0, 0.226);
  color: rgb(161, 161, 161);
}
.radios input.radioDis:hover + label.radioDis:hover {
  cursor: not-allowed;
}
</style>