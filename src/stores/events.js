import { defineStore } from 'pinia';
import * as api from '@/api/api.js';

const EVENTS_BASE_URL = 'http://127.0.0.1:3000';
const resources = `events`;

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    allEvents: [],
    event: {},
    participants: []
  }),
  getters: {
    getEvents: (state) => state.events,
    getAll: (state) => state.allEvents,
    getFoundEvent: (state) => state.event,
    getParticipants: (state) => state.participants
  },
  actions: {
    async fetchEvents(limit, page) {
      console.log('Fetching events');
      try {
        const data = await api.get(EVENTS_BASE_URL, `${resources}?limit=${limit}&page=${page}`);console.log(data);
        this.events = data; // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
    },
    async fetchAllEvents() {
      console.log('Fetching every event');
      try {
        const data = await api.get(EVENTS_BASE_URL, `${resources}?limit=${999999}&page=${0}`); //console.log(data);
        this.allEvents = data.data; //console.log(this.publications) // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching every event:', error);
        throw error;
      }
    },
    async fetchEvent(id) {
        console.log('Fetching event');
        try {
          const data = await api.get(EVENTS_BASE_URL, `${resources}/${id}`); //console.log(data);
          this.event = data; //console.log(this.publications) // Armazena os dados no estado
        } catch (error) {
          console.error('Error fetching a event:', error);
          throw error;
        }
      },
      async fetchParticipants(id) {
        console.log('Fetching event');
        try {
          const data = await api.get(EVENTS_BASE_URL, `${resources}/${id}/participants`); //console.log(data);
          this.participants = data.participants; //console.log(this.publications) // Armazena os dados no estado
        } catch (error) {
          console.error('Error fetching a event:', error);
          throw error;
        }
      },
  }
});