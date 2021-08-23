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
                        <li v-for="item in list" :key="item">
                            <router-link class="routerLink" :to="item.to">{{ item.name }}</router-link>
                        </li>
                    </ul>
                </div> 
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import searchBar from './searchBar.vue'

export default defineComponent({
    name: "navBar",
    components: {
        searchBar,
    },
    setup() {
        const list = reactive([
            {
                name: "Αρχική Σελίδα",
                to: "/user",
            },
            {
                name: "Δίκτυο",
                to: "/network",
            },
            {
                name: "Αγγελίες",
                to: "/user",
            },
            {
                name: "Συζητήσεις",
                to: "/communication",
            },
            {
                name: "Ειδοποιήσεις",
                to: "/user",
            },
            {
                name: "Προσωπικά Στοιχεία",
                to: "/user",
            },
            {
                name: "Ρυθμίσεις",
                to: "/user",
            },
        ])
        return { list }
    },
})
</script>
<style scoped>
.routerLink {
    text-decoration: none;
}
.routerLink:visited{
    color: rgb(51, 51, 51);
}
.routerLink:hover {
    cursor: pointer;
    color: rgb(0, 119, 255);
}
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
    padding: 18px 20px 18px 20px;
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

::v-deep .searchBox {
    /* transform: translate(-50%); */ /*use this in case of middle and remove the divs */
}
::v-deep .searchInput {
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
::v-deep .searchButton:hover + .searchInput {
    width: 200px;
}
::v-deep .searchInput:hover {
    width: 200px;
}
::v-deep .searchInput:focus {
    width: 200px;
}

::v-deep .searchInput::placeholder {
    color: rgb(0, 0, 0);
    font-size: 14px;
}
::v-deep .searchButton{
    z-index: 2;
    border-color: rgb(0, 0, 0);
    color: rgb(0, 0, 0);
    border-width: 1px;
}
</style>