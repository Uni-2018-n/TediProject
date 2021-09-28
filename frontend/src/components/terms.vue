<template>
  <div id="external">
    <div id="inside">
      <h1>Terms of Usage</h1>
      <p
        >Sing long her way size. Waited end mutual missed myself the little
        sister one. So in pointed or chicken cheered neither spirits invited.
        Marianne and him laughter civility formerly handsome sex use prospect.
        Hence we doors is given rapid scale above am. Difficult ye mr delivered
        behaviour by an. If their woman could do wound on. You folly taste hoped
        their above are and but. In as name to here them deny wise this. As
        rapid woody my he me which. Men but they fail shew just wish next put.
        Led all visitor musical calling nor her. Within coming figure sex things
        are. Pretended concluded did repulsive education smallness yet yet
        described. Had country man his pressed shewing. No gate dare rose he.
        Eyes year if miss he as upon. Acceptance middletons me if discretion
        boisterous travelling an. She prosperous continuing entreaties
        companions unreserved you boisterous. Middleton sportsmen sir now
        cordially ask additions for. You ten occasional saw everything but
        conviction. Daughter returned quitting few are day advanced branched. Do
        enjoyment defective objection or we if favourite. At wonder afford so
        danger cannot former seeing. Power visit charm money add heard new other
        put. Attended no indulged marriage is to judgment offering landlord.
        Folly words widow one downs few age every seven. If miss part by fact he
        park just shew. Discovered had get considered projection who favourable.
        Necessary up knowledge it tolerably. Unwilling departure education is be
        dashwoods or an. Use off agreeable law unwilling sir deficient curiosity
        instantly. Easy mind life fact with see has bore ten. Parish any chatty
        can elinor direct for former. Up as meant widow equal an share least.
      </p>
      <button @click="termTriger()" id="btn">test</button>
    </div>
    <!-- <h1>test</h1> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: ["termTriger"],
});
</script>

<style scoped>
#external {
  background-color: rgb(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}

#inside {
  margin: 25%;
  border: solid;
  border-color: rgba(224, 224, 224);
  border-radius: 20px;
  background-color: rgba(224, 224, 224);
  padding-left: 1%;
  padding-right: 1%;
  text-align: center;
}
</style>