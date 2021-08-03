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
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 30s ease infinite;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

#form {
  margin-left: 55%;
  margin-top: 1%;
  margin-right: 10%;
}
#logo {
  margin-top: 1%;
  margin-left: 150px;
}
#logo h3 {
  margin-left: 50px;
}


html {
    position: relative;
    min-height: 100%;
}

body {
    margin: 0 0 100px; /*change 100 for more space of footer*/
    /* bottom = footer height */
    padding: 25px;
}

footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
}
</style>
