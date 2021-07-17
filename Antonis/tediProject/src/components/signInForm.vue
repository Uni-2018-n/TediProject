<template>
  <div id="all">
    <div id="inputs">
      <input type="email" size="25" placeholder="Email" /><br /> <!-- TODO: if error remove this class class="nonerror" -->
      <span id="errors">*Wrong email</span>
      <input type="password" size="25" placeholder="Password" /><br />
      <span id="errors">*Wrong password</span>
    </div>
    <div id="button">
      <button>Sign in!</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import "../styles/formGlobal.css";
</style>