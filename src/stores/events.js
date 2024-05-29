import { defineStore } from 'pinia';
import * as api from '@/api/api.js';

const EVENTS_BASE_URL = 'http://127.0.0.1:3000';
const resources = `events`;

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: []
  }),
  getters: {
    getEvents: (state) => state.events
  },
  actions: {
    async fetchEvents() {
      console.log('Fetching events');
      try {
        const data = await api.get(EVENTS_BASE_URL, resources);console.log(data);
        this.events = data; // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
    }
  }
});