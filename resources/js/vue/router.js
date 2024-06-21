import { createRouter,createWebHashHistory } from "vue-router";
import RegistroOrganizador from './components/RegistroOrganizador.vue';
import ListaOrganizador from './components/ListaOrganizador.vue';
import TablaOrganizador from './components/tablaOrganizador.vue';
import RegistrarOrganizador from './components/Registrar.vue';
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
    {
        name: 'TablaOrganizador',
        path: '/tabla_organizador',
        component: TablaOrganizador  // Redirigir la raíz a la ruta '/vue'
    },
    {
        path: '/registrar/:id?',
        name: 'RegistrarOrganizador',
        component: RegistrarOrganizador,
    },
];

const router=createRouter({
    history: createWebHashHistory(),
    routes:routes
});

export default router;
