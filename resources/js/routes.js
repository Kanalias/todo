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

// router.afterEach((to, from, next) => {
//     if(to.path === "/"){
//         // const token = localStorage.getItem(config.tokenDefaultName);
//         console.log(this.$auth  !== undefined);
//         if(this.$auth)
//             next({path: "/todolist", component: ToDoList});
//     } else {
//         next()
//     }
// });

export default router;
