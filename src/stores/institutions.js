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
    async fetchInstitutions() {
      console.log('Fetching institutions');
      try {
        const data = await api.get(INSTITUTION_BASE_URL, resources);console.log(data);
        this.institutions = data; // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching institutions:', error);
        throw error;
      }
    }
  }
});
