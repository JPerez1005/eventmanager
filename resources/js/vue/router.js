import { createRouter,createWebHashHistory } from "vue-router";
import RegistroOrganizador from './components/RegistroOrganizador.vue';
import ListaOrganizador from './components/ListaOrganizador.vue';
const routes = [
    {
        name: 'home',
        path: '/',
        redirect: '/vue'  // Redirigir la raíz a la ruta '/vue'
    },
    {
        path: '/organizador/:id?',
        name: 'RegistroOrganizador',
        component: RegistroOrganizador,
    },
    {
        name: 'ListaOrganizador',
        path: '/lista_organizador',
        component: ListaOrganizador  // Redirigir la raíz a la ruta '/vue'
    },
];

const router=createRouter({
    history: createWebHashHistory(),
    routes:routes
});

export default router;
