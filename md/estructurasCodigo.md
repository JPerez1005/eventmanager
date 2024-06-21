<div align="center" width="100">
  <img src="https://capsule-render.vercel.app/api?color=0:1408d0,50:0860d0,100:08c4d0&height=250&section=header&text=Julian%20Perez%20(FullStack)&fontSize=30&type=waving&fontColor=fefefe&&animation=fadeIn"
  alt="header"/>
</div>

<img align='right' src='https://media.giphy.com/media/bcKmIWkUMCjVm/giphy.gif' width='200"'>

<details align="left">
<summary> <b> <samp> Configuracion de Rute Web.php </samp></b></summary>

en la carpeta routes de web colocar lo siguiente

```javascript
Route::get('/vue', function () {
    return view('vue');
});
```

</details>

<details align="left">
<summary> <b> <samp> creacion de vue.blade.php </samp></b></summary>

ahora creamos ese archivo en vue con el nombre de vue.blade.php

```bash
    touch resources/views/vue.blade.php
```

Y colocamos lo siguiente dentro de ese archivo dentro de body:

```html
    <body>
        <div id="app"></div>
        
        
        @vite(['resources/js/vue/main.js'])
    </body>
```
</details>
<details align="left">
<summary> <b> <samp> configuración de router.js </samp></b></summary>
colocar lo siguiente en router.js

```javascript
import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
    {
        name: 'home',
        path: '/',
        redirect: '/vue'  // Redirigir la raíz a la ruta '/vue'
    },
];

const router=createRouter({
    history: createWebHashHistory(),
    routes:routes
});

export default router;

```
</details>
<details align="left">
<summary> <b> <samp> configuración de main.js </samp></b></summary>
así debe de ser main.js

```javascript
import { createApp } from "vue";
import App  from './App.vue';
import axios from "axios";
import router from './router.js';

import '../../css/vue.css';

const app=createApp(App);
app.use(router);

app.config.globalProperties.$axios = axios;
window.axios=axios;

app.mount("#app");
```

</details>

<div align="center" width="100">
  <img src="https://capsule-render.vercel.app/api?color=0:1408d0,50:0860d0,100:08c4d0&height=100&section=footer&fontSize=30&type=waving&fontColor=fefefe"
  alt="footer" />
</div>