// src/stores/StoreOrganizador.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrganizadorStore = defineStore('organizador', {
  state: () => ({
    organizadores: [],
    isLoading: false,
    pagination: {
      current_page: 1,
      last_page: 1,
    },
  }),
  actions: {
    setOrganizadores(organizadores, pagination) {
      this.organizadores = organizadores;
      this.pagination = pagination;
    },
    agregarOrganizador(organizador) {
      this.organizadores.push(organizador);
    },
    async fetchOrganizadores(page = 1, search = '') {
      this.isLoading = true;
      try {
        const response = await axios.get(`http://eventmanager.test/api/organizador/paginate`, {
          params: { page, search }
        });
        this.setOrganizadores(response.data.data, {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
        });
      } catch (error) {
        console.error("Error al cargar los organizadores:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async eliminarOrganizador(id) {
      try {
        await axios.delete(`http://eventmanager.test/api/organizador/${id}`);
        this.organizadores = this.organizadores.filter(org => org.id !== id);
      } catch (error) {
        console.error("Error al eliminar el organizador:", error);
      }
    },
    async actualizarOrganizador(id, datos) {
      try {
        const response = await axios.put(`http://eventmanager.test/api/organizador/${id}`, datos);
        const index = this.organizadores.findIndex(org => org.id === id);
        if (index !== -1) {
          this.organizadores[index] = response.data;
        }
      } catch (error) {
        console.error("Error al actualizar el organizador:", error);
      }
    },
  },
  persist: true,
});
