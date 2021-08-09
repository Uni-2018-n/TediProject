<template>
  <div class="outer">
    <div id="top">
      <userSearch :updateQuery="(value) => updateQuery(value)"/>
      <div class="container">
        <div class="buttons">
          <ul>
            <li>
              <button @click="select=!select; selectedArray=[];">Select</button>
            </li>
            <li>
              <button :disabled="!select" :class="{ disabled: !select }">Export</button>
            </li>
          </ul>
        </div>
        <div class="radios">
          <ul>
              <li>
                  <input type=radio name="expOpt" id="radio3" :class="{ radioDis: !select}" checked :disabled="!select">
                  <label for="radio3" :class="{ radioDis: !select}" >XML</label>
              </li>
              <li>
                  <input type=radio name="expOpt" id="radio4" :class="{ radioDis: !select}" :disabled="!select">
                  <label for="radio4" :class="{ radioDis: !select}" >JSON</label>
              </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="genera">
      <ul>
        <li v-for="item in items" :key="item.id">
          <Users @click="if(!select){idprop=item.id;flag=true;}else{if(selectedArray.includes(item.id)){selectedArray.splice(selectedArray.indexOf(item.id), 1)}else{selectedArray.push(item.id)}}" :userId="item.id" :name="item.name" :selected="selectedArray.includes(item.id)" />
          <input class="inpcheck" type="checkbox" :value="item.id" v-model="selectedArray" :id="item.id" />
        </li>
      </ul>
    </div>
  </div>
  <footer>
    <Footer />
  </footer>
  <userInfo v-if=flag :popupTriger="() => popupTriger()" :userId="idprop" />
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import Footer from "../components/footer.vue";
import Users from "../components/adminPage/users.vue";
import userInfo from "../components/adminPage/userInfo.vue"
import userSearch from "../components/adminPage/userSearch.vue"

export default defineComponent({
  name: "AdminPage",
  components: {
    Footer,
    Users,
    userInfo,
    userSearch,
  },
  setup() {
    const items = [
      {
        id: "123456789012345678901234",
        name: "Antonis Kalamakis1"
      },
      {
        id: "223456789012345678901234",
        name: "Antonis Kalamakis2"
      },
      {
        id: "323456789012345678901234",
        name: "Antonis Kalamakis3"
      },
      {
        id: "423456789012345678901234",
        name: "Antonis Kalamakis4"
      },
      {
        id: "523456789012345678901234",
        name: "Antonis Kalamakis5"
      },
      {
        id: "623456789012345678901234",
        name: "Antonis Kalamakis6"
      },
    ]

    const query = ref({}); //to send

    const flag = ref(false);
    const idpop = ref(null);

    const select = ref(false);
    const selectedArray = ref([]);

    const popupTriger = () => {
      flag.value = false;
    }
    const updateQuery = (value: Object) => {
      query.value = value;
    }
    return { items, flag, idpop, popupTriger,
             select, selectedArray, updateQuery, }
  }
});
</script>
<style scoped>
.outer {
  display: flex;
  flex-direction: column;
}
#genera {
  text-align: center;
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