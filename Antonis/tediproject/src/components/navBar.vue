<template>
    <div class="outer">
        <div class="inner">
            <div class="logo">
                <span class="text">LinkedIn</span>
            </div>
            <div class="right">
                <div class="search">
                    <searchBar />
                </div>
                <div class="navbar">
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
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import searchBar from './searchBar.vue'

export default defineComponent({
    name: "navBar",
    components: {
        searchBar,
    },
    setup() {
        return {  }
    },
})
</script>
<style scoped>
.outer {
    padding: 10px;
    margin: 1%;
    border-radius: 5px;
    background: #ffffff;
    line-height: 1.8;
}
.inner {
    padding: 0 15px 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.logo .text {
    font-weight: bold;
    font-size: 25px;
    padding: 5px 0 5px 0;
    line-height: inherit;
    font-family: "Poppins", Arial, sans-serif;
}

.right {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    border-style: solid;
    border-width: 0px;
}
.navbar ul li {
    display: inline-block;
    padding: 10px 20px 10px 20px;
    border-right-style: solid;
    border-width: 1px;
    font-weight: 400;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: linear;
    font-size: 14px;
    color: rgb(51, 51, 51);
    border-color: rgb(51, 51, 51);
}
.navbar ul li:last-child {
    border-right-style: none;
}
.navbar ul li:hover {
    cursor: pointer;
    color: rgb(0, 119, 255);
}

/deep/ .searchBox {
    /* transform: translate(-50%); */ /*use this in case of middle and remove the divs */
}
/deep/ .searchInput {
    font-size: 14px;
    border-width: 1px;
    transition: width 0.75s;
    -o-transition: width 0.75s;
    border-color: rgb(0, 0, 0);
    color: rgb(0, 0, 0);
    z-index: 0;
    font-weight: 400;
    width: 0;
}
/deep/ .searchButton:hover + .searchInput {
    width: 200px;
}
/deep/ .searchInput:hover {
    width: 200px;
}
/deep/ .searchInput:focus {
    width: 200px;
}

/deep/ .searchInput::placeholder {
    color: rgb(0, 0, 0);
    font-size: 14px;
}
/deep/ .searchButton{
    z-index: 2;
    border-color: rgb(0, 0, 0);
    color: rgb(0, 0, 0);
    border-width: 1px;
}
</style>