<template>
    <!-- component -->
    <router-link :to="{ name: 'RegistroOrganizador' }" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Registrar
    </router-link>
    <div class="flex mt-11 min-h-screen items-start justify-center">
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr class="bg-blue-gray-100 text-gray-700">
              <th class="py-3 px-4 text-left">Id</th>
              <th class="py-3 px-4 text-left">Nombre</th>
              <th class="py-3 px-4 text-left">Editar</th>
              <th class="py-3 px-4 text-left">Eliminar</th>
            </tr>
          </thead>
          <tbody class="text-blue-gray-900">
            <tr v-for="organizador in organizadores" :key="organizador.id" class="border-b border-blue-gray-200">
              <td class="py-3 px-4">{{ organizador.id }}</td>
              <td class="py-3 px-4">{{ organizador.nombre }}</td>
              <td class="py-3 px-4">
                <router-link :to="{ name: 'RegistroOrganizador', params: { id: organizador.id } }" class="font-medium text-blue-600 hover:text-blue-800">Editar</router-link>
              </td>
              <td class="py-3 px-4">
                <a href="#" @click.prevent="eliminar(organizador.id)" class="font-medium text-blue-600 hover:text-blue-800">Eliminar</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="w-full pt-5 px-4 mb-8 mx-auto "></div>
      </div>
    </div>
</template>
  
<script>
    import { useOrganizadorStore } from '../store/StoreOrganizador.js';
    import { onMounted, computed } from 'vue';

    export default {
        setup() {
            const organizadorStore = useOrganizadorStore();

            onMounted(() => {
            organizadorStore.fetchOrganizadores();
            });

            const organizadores = computed(() => organizadorStore.organizadores);
            const isLoading = computed(() => organizadorStore.isLoading);

            const eliminar = async (id) => {
            if (confirm("¿Estás seguro de que deseas eliminar este organizador?")) {
                await organizadorStore.eliminarOrganizador(id);
                alert("Organizador eliminado con éxito");
            }
            };

            return {
            organizadores,
            isLoading,
            eliminar,
            };
        },
    };
</script>
  