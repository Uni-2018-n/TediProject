<template>
    <div class="outer">    
        <ul>
            <li>Αρχική Σελίδα</li>
            <li>Δίκτυο</li>
            <li>Αγγελίες</li>
            <li>Συζητήσεις</li>
            <li>Ειδοποιήσεις</li>
            <li>Προσωπικά Στοιχεία</li>
            <li>Ρυθμίσεις</li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "navBar",
    components: {
        
    },
    setup() {
        return {  }
    },
})
</script>
<style scoped>
.outer {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;

}
.outer ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    border-style: solid;
    border-width: 0px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    /* background-color: rgb(43, 43, 43) */
    background: #2B2B2B;
    background-image: linear-gradient(rgb(250, 250, 250), rgb(228, 228, 228));
    width: max-content;
}
.outer ul li {
    display: inline-block;
    padding: 15px;
    border-right-style: solid;
    border-width: 1px;
    border-color:rgb(80, 80, 80);
    color: rgb(0, 0, 0);
    font-weight: bold;
    width: 150px;
    text-align: center;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: linear;
}
.outer ul li:last-child {
    border-right-style: none;
    border-bottom-right-radius: 8px;
}
.outer ul li:first-child {
    border-bottom-left-radius: 8px;
}
.outer ul li:hover {
    color: rgb(223, 223, 223);
    background-color: rgb(71, 71, 71);
    cursor: pointer;
}
</style>