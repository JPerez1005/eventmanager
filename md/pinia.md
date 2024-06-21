# instalacion de pinia

|dependencias de tailwind|
|-|
|<pre><code class="bash">npm install pinia
</code></pre>|
|<pre><code class="bash">npm install pinia-plugin-persistedstate
</code></pre>|

# estructura de codigo en pinia

colocar pinia en main.js y usarlo

```javascript
import { createPinia } from 'pinia';
app.use(router).use(pinia);
```


ahora se crea una carpeta de store y coloca cada uno de los componentes necesarios

```javascript
// src/stores/libroStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLibroStore = defineStore('libro', {
  state: () => ({
    libros: [],
    isLoading: false,
  }),
  actions: {
    setLibros(libros) {
      this.libros = libros;
    },
    agregarLibro(libro) {
      this.libros.push(libro);
    },
    async fetchLibros() {
      this.isLoading = true;
      try {
        const response = await axios.get('http://bibliomanager.test/api/libro/paginate?page=1');
        console.log(response.data);  // Verificar la estructura de la respuesta
        this.setLibros(response.data.data);  // Ajustamos para acceder a `data` de la respuesta.
      } catch (error) {
        console.error("Error al cargar los libros:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  persist: true, // Agrega esta línea para habilitar la persistencia
});

```

de esta manera de se ven los datos:

```php
<template>
    <section class="third">
      <div class="outer">
        <div class="inner">
          <div class="bg">
            <h2 class="section-heading">
              <div class="table-container" style="--data-limit: 9">
                <div class="table" id="table-0" data-limit="9">
                  <div class="table-row table-heading">
                    <div class="table-col">#</div>
                    <div class="table-col">titulo</div>
                    <div class="table-col">stock</div>
                  </div>
                  <div
                    class="table-row"
                    data-copy="103"
                    v-for="libro in libros"
                    :key="libro.id"
                    data-limit="9"
                  >
                    <div class="table-col">
                      <span class="auto-increment">{{ libro.id }}</span>
                    </div>
                    <div class="table-col">
                      <span class="auto-firstname">{{ libro.titulo }}</span>
                    </div>
                    <div class="table-col">
                      <span class="auto-firstname">{{ libro.stock }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </h2>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { useLibroStore } from '../store/LibroStore.js';
  import { onMounted, computed } from 'vue';
  
  export default {
    setup() {
      const libroStore = useLibroStore();
  
      onMounted(() => {
        libroStore.fetchLibros(); // Cargar libros cuando el componente se monta
      });
  
      const libros = computed(() => libroStore.libros);
      const isLoading = computed(() => libroStore.isLoading);
  
      return {
        libros,
        isLoading,
      };
    },
  };
  </script>
```

de esta manera se mandan los datos:
```php
<template>
  <section class="third">
      <div class="outer">
        <div class="inner">
          <div class="bg">
            <h2 class="section-heading">
              <div class="container">
                  <div class="card">
                      <a class="titulo mb-10">Registrar Autor</a>
                          <div class="inputBox">
                              <input v-model="form.titulo" type="text" required>
                              <span>Titulo</span>
                          </div>
                          <div class="inputBox">
                              <input v-model="form.stock" type="number" required>
                              <span>Stock</span>
                          </div>
                          <div class="inputBox">
                              <select v-model="form.autor_id" required>
                                  <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{autor.nombre}}</option>
                              </select>
                              <span>Autor</span>
                          </div>
                          <button class="enter" @click="enviar">Registrar</button>
                  </div>
              </div>
            </h2>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import { useLibroStore } from '../store/LibroStore.js'; // Asegúrate de que esta ruta sea correcta
import { useRouter } from 'vue-router';

export default {
setup() {
  const libroStore = useLibroStore();
  const router = useRouter();

  return {
    libroStore,
    router
  };
},
async mounted() {
  this.getAutor();
},
data() {
  return {
      libro: '',
      form: {
        titulo: '',
        stock: '',
        autor_id: '',
      },
      autores: []
  };
},
methods: {
  async getAutor() {
    try {
        const response = await this.$axios.get('api/autor/all');
        this.autores = response.data;
    } catch (error) {
        console.error("Error fetching autores:", error);
    }
  },
  async enviar() {
    try {
      const response = await this.$axios.post('/api/libro', this.form);
      alert("Libro registrado");

      // Utiliza el store de libro para agregar el nuevo libro
      this.libroStore.agregarLibro(response.data);

      // Redirige a la página de libros
      this.router.push({ name: 'tabla_libros' });
    } catch (error) {
      console.error("Error registrando el libro:", error);
    }
  }
},
}
</script>

```
