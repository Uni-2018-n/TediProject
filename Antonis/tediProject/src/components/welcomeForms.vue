<template>
  <div id="forms">
    <ul>
      <li @click="flag = false">Sign in</li>
      <li @click="flag = true">Register</li>
    </ul>
    <div v-if="!flag" class="inside">
      <signInForm />
    </div>
    <div v-else class="inside">
      <signUpForm />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import signInForm from "./signInForm.vue";
import signUpForm from "./signUpForm.vue";

export default {
  name: "welcomeForms",
  components: {
    signInForm,
    signUpForm,
  },
  setup() {
    const flag = ref(false);
    return { flag };
  },
};
</script>

<style>
.inside {
  margin-bottom: 20px;/*todo move this to global form css*/
}
#forms {
  display: inline-block;
  border-style: solid;
  border-radius: 40px;
  border-color: rgb(247, 247, 247);
  background-color: rgb(240, 240, 240);
}
#forms ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-left: 30px;
  margin-top: 10px;
  padding-top: 10px;
}
#forms ul li {
  font-size: 30px;
  display: inline;
  cursor: pointer;
  margin-left: 1px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 5px;
  border-style: none none solid none;
}
#forms ul li:hover {
  background-color: rgb(211, 212, 212);
}
</style>