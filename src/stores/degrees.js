import { defineStore } from 'pinia';
import * as api from '@/api/api.js';

const DEGREES_BASE_URL = 'http://127.0.0.1:3000';
const resources = `degrees`;

export const useDegreesStore = defineStore('degrees', {
    state: () => ({
      degrees: [],
      allDegrees: []
    }),
    getters: {
      getDegrees: (state) => state.degrees,
      getAll: (state) => state.allDegrees
    },
    actions: {
      async fetchDegrees() {
        console.log('Fetching degrees');
        try {
          const data = await api.get(DEGREES_BASE_URL, resources);console.log(data);
          this.degrees = data; // Armazena os dados no estado
        } catch (error) {
          console.error('Error fetching degrees:', error);
          throw error;
        }
      },
      async fetchAllDegrees() {
        console.log('Fetching every Degree');
        try {
          const data = await api.get(DEGREES_BASE_URL, `${resources}?limit=${999999}&page=${0}`); //console.log(data);
          this.allDegrees = data.data; //console.log(this.institutions) // Armazena os dados no estado
        } catch (error) {
          console.error('Error fetching all degrees:', error);
          throw error;
        }
      },
    }
  }
);