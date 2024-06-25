import { defineStore } from 'pinia';
import * as api from '@/api/api.js';

const INSTITUTION_BASE_URL = 'http://127.0.0.1:3000';
const resources = `institutions`;

export const useInstitutionsStore = defineStore('institution', {
  state: () => ({
    institutions: [],
    allInstitutions: []
  }),
  getters: {
    getInstitutions: (state) => state.institutions,
    getAll: (state) => state.allInstitutions
  },
  actions: {
    async fetchInstitutions(page=0, limit=4) {
      console.log('Fetching institutions');
      try {
        const data = await api.get(INSTITUTION_BASE_URL, `${resources}?limit=${limit}&page=${page}`); //console.log(data);
        this.institutions = data; //console.log(this.institutions) // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching institutions:', error);
        throw error;
      }
    },
    async fetchAllInstitutions() {
      console.log('Fetching institutions');
      try {
        const data = await api.get(INSTITUTION_BASE_URL, `${resources}?limit=${999999}&page=${0}`); //console.log(data);
        this.allInstitutions = data.data; //console.log(this.institutions) // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching every institution:', error);
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
