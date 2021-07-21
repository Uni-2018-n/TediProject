<template>
  <div id="logo">
    <h1>LinkedIn Project</h1>
    <h3>By SDI1800056 and SDI1800000</h3>
  </div>
  <div id="form">
    <welcomeForms />
  </div>
  <footer>
    <div id="footer">
      <Footer />
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import welcomeForms from "../components/welcomeForms.vue";
import Footer from "../components/footer.vue";

export default defineComponent({
  name: "Home",
  components: {
    welcomeForms,
    Footer,
  },
  setup() {},
});
</script>

<style>
body {
  margin: 0;
  background-color: rgb(158, 198, 211);
}
#form {
  margin-left: 55%;
  margin-top: 5%;
  margin-right: 10%;
}
#logo {
  margin-top: 80px;
  margin-left: 150px;
}
#logo h3 {
  margin-left: 50px;
}
</style>
