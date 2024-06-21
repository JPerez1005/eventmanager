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
      <button type="button" @click="cancelar" class="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
      <router-link :to="{ name: 'ListaOrganizador' }" class="text-sm font-semibold leading-6 text-gray-900">Ver Lista</router-link>
      <button @click="enviar" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
    </div>
  </template>
  
  <script>
  import { useGenericStore } from '../store/useGenericStore.js';
  import { useRouter, useRoute } from 'vue-router';
  import { ref, onMounted, watch } from 'vue';
  
  export default {
    setup() {
      const store = useGenericStore();
      const router = useRouter();
      const route = useRoute();
  
      // Set the model type to 'organizador'
      store.setModelType('organizador');
  
      const form = ref({
        nombre: '',
      });
  
      const editMode = ref(route.params.id !== undefined);
  
      // Watch the route for changes and reset form if not in edit mode
      watch(() => route.params.id, (newId) => {
        if (newId === undefined) {
          form.value.nombre = '';
          editMode.value = false;
        } else {
          editMode.value = true;
          const organizador = store.data.find(org => org.id === parseInt(newId));
          if (organizador) {
            form.value.nombre = organizador.nombre;
          }
        }
      });
  
      // Load the existing organizer if in edit mode
      onMounted(() => {
        if (editMode.value) {
          const organizador = store.data.find(org => org.id === parseInt(route.params.id));
          if (organizador) {
            form.value.nombre = organizador.nombre;
          }
        }
      });
  
      const enviar = async () => {
        try {
          if (editMode.value) {
            await store.actualizarItem(route.params.id, form.value);
            alert("Organizador actualizado con éxito");
          } else {
            await store.agregarItem(form.value);
            alert("Organizador registrado");
          }
          router.push({ name: 'ListaOrganizador' });
        } catch (error) {
          console.error("Error registrando el organizador:", error);
        }
      };
  
      const cancelar = () => {
        router.push({ name: 'ListaOrganizador' });
      };
  
      return {
        form,
        enviar,
        cancelar,
        editMode,
      };
    },
  };
  </script>
  