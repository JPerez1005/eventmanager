# instalar vue router

```bash
npm install vue-router@next
```

con el siguiente codigo se importan las rutas

```javascript
import { createRouter,createWebHashHistory } from "vue-router";
import Libros from './components/LibroComponent.vue';
import TablaLibros from './components/TableLibroComponent.vue';

const routes = [
    {
        name: 'home',
        path: '/',
        redirect: '/vue'  // Redirigir la raíz a la ruta '/vue'
    },
    {
        name: 'libros',
        path: '/libro',
        component: Libros
    },
    {
        name: 'tabla_libros',
        path: '/tabla_libro',
        component: TablaLibros
    },
];

const router=createRouter({
    history: createWebHashHistory(),
    routes:routes
});

export default router;
```
cabe aclarar que hay que especificar la ruta en el app.vue

```php
<template>
    <router-link :to="{name:'presentacion'}" class="inicio">Inicio</router-link>
    <router-view></router-view>
</template>
<script>

export default {
    name:'App',
    components:{
    }

}
</script>
```