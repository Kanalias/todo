<template>
    <div id="main">
        <header id="header">
              <Menu></Menu>
        </header>
        <div class="content">
            <router-view ></router-view>
        </div>
    </div>
</template>

<script>
    import Menu from '../components/Menu.vue'
    export default {
        name: "App",
        data() {
            return {
               authFlag: false
            }
        },
        components: {
            Menu
        },
        mounted() {
            // console.log(localStorage.getItem('laravel-jwt-auth'));
            // if(localStorage.getItem('laravel-jwt-auth')){
            //     const redirectTo = 'todolist';
            //     this.$router.replace(redirectTo);
            // }
        }
    }
</script>
