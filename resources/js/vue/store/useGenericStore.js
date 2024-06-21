// src/stores/GenericStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useGenericStore = defineStore('generic', {
  state: () => ({
    data: [],
    isLoading: false,
    pagination: {
      current_page: 1,
      last_page: 1,
    },
    modelType: '',
  }),
  actions: {
    setData(data, pagination) {
      this.data = data;
      this.pagination = pagination;
    },
    setModelType(modelType) {
      this.modelType = modelType;
    },
    async fetchData(page = 1, search = '') {
      if (!this.modelType) throw new Error("Model type is not set");
      this.isLoading = true;
      try {
        const response = await axios.get(`http://eventmanager.test/api/${this.modelType}/paginate`, {
          params: { page, search }
        });
        this.setData(response.data.data, {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
        });
      } catch (error) {
        console.error(`Error al cargar ${this.modelType}:`, error);
      } finally {
        this.isLoading = false;
      }
    },
    async eliminarItem(id) {
      if (!this.modelType) throw new Error("Model type is not set");
      try {
        await axios.delete(`http://eventmanager.test/api/${this.modelType}/${id}`);
        this.data = this.data.filter(item => item.id !== id);
      } catch (error) {
        console.error(`Error al eliminar ${this.modelType}:`, error);
      }
    },
    async actualizarItem(id, datos) {
      if (!this.modelType) throw new Error("Model type is not set");
      try {
        const response = await axios.put(`http://eventmanager.test/api/${this.modelType}/${id}`, datos);
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
          this.data[index] = response.data;
        }
      } catch (error) {
        console.error(`Error al actualizar ${this.modelType}:`, error);
      }
    },
    async agregarItem(datos) {
        if (!this.modelType) throw new Error("Model type is not set");
        try {
          console.log("Datos enviados:", datos); // Añadir este log para verificar los datos
          const response = await axios.post(`http://eventmanager.test/api/${this.modelType}`, datos);
          this.data.push(response.data);
        } catch (error) {
          console.error(`Error al agregar ${this.modelType}:`, error);
        }
    }
  },
  persist: true,
});
