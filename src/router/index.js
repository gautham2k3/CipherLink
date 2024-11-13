import {createRouter,createWebHistory} from 'vue-router'

import Register from '../views/Register.vue';
import Home from '../views/Home.vue';

const routes = [
    {
        path:'/',
        name:'Register',
        component:Register
    },
    {
        path:'/home',
        name:'Home',
        component:Home
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router;

