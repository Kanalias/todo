<template>
    <b-navbar type="light" variant="light" class="nav">

        <router-link :to="{name: 'home'}" class="navbar-brand">ToDo</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto" v-if="$auth.check(1)">
                <li class="nav-item" v-for="(route, key) in routes.user" v-bind:key="route.path">
                    <router-link :to="{ name : route.path }" :key="key" class="nav-link">{{route.name}}</router-link>
                </li>
            </ul>
            <ul class="navbar-nav mr-auto" v-if="$auth.check(2)">
                <li class="nav-item" v-for="(route, key) in routes.user" v-bind:key="route.path">
                    <router-link :to="{ name : route.path }" :key="key" class="nav-link">{{route.name}}</router-link>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto" v-if="!$auth.check()">
                <li class="nav-item" v-for="(route, key) in routes.unlogged" v-bind:key="route.path">
                    <router-link :to="{ name : route.path }" :key="key" class="nav-link">{{route.name}}</router-link>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto" v-if="$auth.check()">
                <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="$auth.logout()">Выйти</a>
                </li>
            </ul>
        </div>
    </b-navbar>
</template>

<script>
    export default {
        data() {
            return {
                routes: {
                    // UNLOGGED
                    unlogged: [
                        { name: 'Регистрация', path: 'register' },
                        { name: 'Войти', path: 'login'}
                    ],
                    // LOGGED USER
                    user: [
                        { name: 'ToDoList', path: 'todolist' }
                    ]
                }
            }
        },
    }
</script>

<style scoped>
    .nav{
        margin-bottom: 30px;
    }
</style>
