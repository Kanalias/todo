import VueRouter from 'vue-router';

import Home from "@/js/pages/Home";
import Login from "@/js/pages/Login";
import Register from "@/js/pages/Register";
import ToDoList from "@/js/pages/user/ToDoList";


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        // beforeEach: (to, from, next) =>
        // {
        //     if (localStorage.getItem('laravel-jwt-auth') == null) {
        //         // console.log('todolist')
        //         return next({name: 'home'})
        //     } else {
        //         // console.log('todolist')
        //         return next({name: 'todolist'})
        //     }
        // },
        // },
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
            auth: true,
            requiresAuth: true
        }
    },
];

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
});

// router.beforeEach((to, from, next) => {
//    // if(to.matched.some(record => record.meta.guest)) {
//         if(localStorage.getItem('laravel-jwt-auth') == null){
//             // console.log('todolist')
//             next({ name: 'home'})
//         }
//         else{
//             // console.log('todolist')
//             next({ name: 'todolist'})
//         }
//     // }else {
//     //     next()
//     // }
// });

export default router;
