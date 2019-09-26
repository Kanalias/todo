<template>
    <div id="main">
        <header id="header">
              <Menu></Menu>
        </header>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Menu from '../components/Menu.vue'
    import config from "../auth";
    export default {
        name: "App",
        data() {
            return {
               authFlag: false,
            }
        },
        components: {
            Menu
        },
        created() {
            if(localStorage.getItem(config.tokenDefaultName) != null){
                this.$route.push({path: '/todolist'})
            }
        }
    }
</script>
