<template>
  <div id="genera">
    <div id="inside">
      <ul>
        <li v-for="item in items" :key="item.id">
          <Users @click="idprop=item.id;flag=true;" :userId="item.id" :name="item.name" />
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

export default defineComponent({
  name: "AdminPage",
  components: {
    Footer,
    Users,
    userInfo,
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

    const flag = ref(false);
    const idpop = ref(null);

    const popupTriger = () => {
      flag.value = false;
    }
    return { items, flag, idpop, popupTriger }
  }
});
</script>
<style scoped>
#genera {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* margin-left: 10%; */
}
ul {
  list-style-type: none;
  display: grid;
  column-gap: 5px;
  row-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr;
}
#inside {
  
}

.top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>