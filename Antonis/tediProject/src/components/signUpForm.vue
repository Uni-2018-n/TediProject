<template>
  <div id="all">
    <div id="inputs">
      <input class="nonerror" type="text" size="25" placeholder="First Name" /><br />
      <input class="nonerror" type="text" size="25" placeholder="Last Name" /><br />
      <input type="email" size="25" placeholder="Email" /><br />
      <span id="errors">*Wrong email</span>
      <input type="password" size="25" placeholder="Password" /><br />
      <span id="errors">*Use better password</span>
      <input type="password" size="25" placeholder="Verify Password" /><br />
      <span id="errors">*Password and verified password are diffrent</span>
      <input class="nonerror" type="tel" size="25" placeholder="Phone Number" /><br />
      <input class="nonerror" type="text" size="25" placeholder="Photo*TODO*" /><br />
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