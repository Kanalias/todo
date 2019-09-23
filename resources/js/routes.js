import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from "@/js/pages/Home";
import Login from "@/js/pages/Login";
import Register from "@/js/pages/Register";
import ToDoList from "@/js/pages/user/ToDoList";
import auth from "@websanova/vue-auth/demos/nuxt/middleware/auth";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        // redirect: () => {
        //     console.log(localStorage.getItem('laravel-jwt-auth'));
        //     if (localStorage.getItem('laravel-jwt-auth') != null) {
        //         return '/todolist'
        //     }
        // },
        beforeEnter: (to, from, next) => {

            console.log();
            return '/'
            // if (!auth.loggedIn()) {
            //     next({
            //         path: '/login',
            //         query: { redirect: to.fullPath }
            //     })
            // } else {
            //     next()
            // }
        },
        meta: {
            auth: undefined
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        },
    },
    {
        path: '/todolist',
        name: 'todolist',
        component: ToDoList,
        meta: {
            auth: true
        }
    },
];

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
});

export default router;
