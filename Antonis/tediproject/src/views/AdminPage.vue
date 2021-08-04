<template>
  <div id="genera">
    <div id="inside">
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="223456789012345678901234" name="Antonis Kalamakis" />
      <Users id="323456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
      <Users id="123456789012345678901234" name="Antonis Kalamakis" />
    </div>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Footer from "../components/footer.vue";
import Users from "../components/adminPage/users.vue";

export default defineComponent({
  name: "AdminPage",
  components: {
    Footer,
    Users,
  },
});
</script>
<style scoped>
#genera {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  margin-left: 10%;
}

#inside {
  display: grid;
  column-gap: 5px;
  row-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr;
}

.top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>