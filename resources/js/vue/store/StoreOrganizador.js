// src/stores/StoreOrganizador.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrganizadorStore = defineStore('organizador', {
  state: () => ({
    organizadores: [],
    isLoading: false,
  }),
  actions: {
    setOrganizadores(organizadores) {
      this.organizadores = organizadores;
    },
    agregarOrganizador(organizador) {
      this.organizadores.push(organizador);
    },
    async fetchOrganizadores() {
      this.isLoading = true;
      try {
        const response = await axios.get('http://eventmanager.test/api/organizador/paginate?page=1');
        this.setOrganizadores(response.data.data);
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
