<template>
    <b-navbar type="light" variant="light" class="nav">

        <router-link :to="{ name : 'home' }" class="navbar-brand">ToDo</router-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto" v-if="!$auth.check()">
                <li class="nav-item" v-for="(route, key) in routes.unlogged" v-bind:key="route.path">
                    <router-link :to="{ name : route.path }" :key="key" class="nav-link" @click.prevent="checkLink()">{{route.name}}</router-link>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto" v-if="$auth.check()">
                <li class="nav-item">
                    <a class="nav-link" href="/" @click.prevent="$auth.logout()">Выйти</a>
                </li>
            </ul>
        </div>
    </b-navbar>
</template>

<script>
    import config from "../auth";

    export default {
        data() {
            return {
                home_name: '',
                routes: {
                    // UNLOGGED
                    unlogged: [
                        { name: 'Регистрация', path: 'register' },
                        { name: 'Войти', path: 'login'},
                    ],
                    // LOGGED USER
                    user: [
                        { name: 'ToDoList', path: 'todolist' }
                    ]
                }
            }
        },
        methods:{
        },
    }
</script>

<style scoped>
    .nav{
        margin-bottom: 30px;
    }
</style>
