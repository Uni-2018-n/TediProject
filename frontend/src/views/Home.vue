<template>
  <div class="outer">
    <div id="logo">
      <h1>LinkedIn Project</h1>
      <h3>By SDI1800056 and SDI1800286</h3>
    </div>
    <div id="form">
      <welcomeForms />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import welcomeForms from "../components/welcomeForms.vue";
import Footer from "../components/footer.vue";
import router from '../router/index'


export default defineComponent({
  name: "Home",
  components: {
    welcomeForms,
    Footer,
  },
  setup() {
    if(localStorage.getItem("user")){
      router.push('/user');
    }
  },
});
</script>

<style scoped>
.outer {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#form {
  margin-left: 55%;
  margin-top: 1%;
  margin-right: 10%;
  flex: 1;
}
#logo {
  margin-top: 1%;
  margin-left: 150px;
}
#logo h3 {
  margin-left: 50px;
}
</style>
