<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <div class="my-12 mx-auto space-y-12 w-96">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ editMode ? 'Editar Organizador' : 'Registrar Organizador' }}</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">El organizador es aquel que crea los eventos.</p>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
            <div class="mt-2">
              <input v-model="form.nombre" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto w-96 mt-6 flex items-center justify-center gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
      <router-link :to="{ name: 'ListaOrganizador' }" class="text-sm font-semibold leading-6 text-gray-900">Ver Lista</router-link>
      <button @click="enviar" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
    </div>
</template>
  
<script>
  import { useOrganizadorStore } from '../store/StoreOrganizador.js';
  import { useRouter, useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default {
    setup() {
      const organizadorStore = useOrganizadorStore();
      const router = useRouter();
      const route = useRoute();
  
      const form = {
        nombre: '',
      };
  
      const editMode = route.params.id !== undefined;
  
      if (editMode) {
        const organizador = organizadorStore.organizadores.find(org => org.id === parseInt(route.params.id));
        if (organizador) {
          form.nombre = organizador.nombre;
        }
      }
  
      const enviar = async () => {
        try {
          if (editMode) {
            await organizadorStore.actualizarOrganizador(route.params.id, form);
            alert("Organizador actualizado con éxito");
          } else {
            const response = await axios.post('/api/organizador', form);
            alert("Organizador registrado");
            organizadorStore.agregarOrganizador(response.data);
          }
          router.push({ name: 'ListaOrganizador' });
        } catch (error) {
          console.error("Error registrando el organizador:", error);
        }
      };
  
      return {
        form,
        enviar,
        editMode,
      };
    },
  };
</script>
  