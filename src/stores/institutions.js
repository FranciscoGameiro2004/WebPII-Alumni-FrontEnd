import { defineStore } from 'pinia';
import * as api from '@/api/api.js';

const INSTITUTION_BASE_URL = 'http://127.0.0.1:3000';
const resources = `institutions`;

export const useInstitutionsStore = defineStore('institution', {
  state: () => ({
    institutions: []
  }),
  getters: {
    getInstitutions: (state) => state.institutions
  },
  actions: {
    async fetchInstitutions(page=0, limit=5) {
      console.log('Fetching institutions');
      try {
        const data = await api.get(INSTITUTION_BASE_URL, `${resources}?limit=${limit}&page=${page}`); console.log(data);
        this.institutions = data; console.log(this.institutions) // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching institutions:', error);
        throw error;
      }
    },
    async updateInstitution(id, data) {
      console.log('Updating institutions');
      try {
        const data = await api.put(INSTITUTION_BASE_URL, `institutions/${id}`, data); console.log(data);
      } catch (error) {
        console.error('Error fetching institutions:', error);
        throw error;
      }
    }
  }
});
